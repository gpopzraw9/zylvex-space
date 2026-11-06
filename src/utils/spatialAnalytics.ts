/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ZYLVEX SPACE — Spatial Intelligence & Inspection Analytics (Phase F)
 * Pure, deterministic geometry checks. All coordinates use the caller's declared
 * local Cartesian frame and units; this module never assumes sensor accuracy.
 */

import { computeRawSha256Hex } from './cryptoProvenance';
import { BoundingBox3D, BoundingBoxOps, Vector3D, VectorOps } from './spatialMath';

export interface ClearanceZone {
  id: string;
  bounds: BoundingBox3D;
}

export interface ClearanceViolation {
  pointIndex: number;
  point: Vector3D;
  zoneIds: string[];
}

/** Finds vertices/points contained by one or more prohibited axis-aligned volumes. */
export function detectClearanceViolations(
  points: readonly Vector3D[],
  zones: readonly ClearanceZone[]
): ClearanceViolation[] {
  validatePoints(points, 'points');
  zones.forEach(({ id, bounds }) => {
    if (!id.trim()) throw new Error('Clearance zone id must not be empty');
    validateBounds(bounds);
  });

  const violations: ClearanceViolation[] = [];
  points.forEach((point, pointIndex) => {
    const zoneIds = zones
      .filter(({ bounds }) => BoundingBoxOps.containsPoint(bounds, point))
      .map(({ id }) => id);
    if (zoneIds.length) violations.push({ pointIndex, point: { ...point }, zoneIds });
  });
  return violations;
}

export interface ReferencePlane {
  /** Any non-zero normal; it is normalized by the evaluator. */
  normal: Vector3D;
  /** A point on the reference plane. */
  point: Vector3D;
}

export interface CoplanarityReport {
  pointCount: number;
  tolerance: number;
  maxAbsoluteDeviation: number;
  rmsDeviation: number;
  deviations: number[];
  isCoplanar: boolean;
}

/** Measures signed perpendicular distances from samples to a specified plane. */
export function evaluateCoplanarity(
  points: readonly Vector3D[],
  plane: ReferencePlane,
  tolerance: number
): CoplanarityReport {
  validatePoints(points, 'points');
  validateNonNegativeFinite(tolerance, 'tolerance');
  validateVector(plane?.normal, 'plane.normal');
  validateVector(plane?.point, 'plane.point');
  const normalLength = VectorOps.magnitude(plane.normal);
  if (normalLength === 0) throw new Error('Plane normal must have non-zero length');

  const normal = VectorOps.multiplyScalar(plane.normal, 1 / normalLength);
  const deviations = points.map((point) => VectorOps.dot(VectorOps.subtract(point, plane.point), normal));
  const maxAbsoluteDeviation = deviations.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
  const rmsDeviation = deviations.length
    ? Math.sqrt(deviations.reduce((sum, value) => sum + value * value, 0) / deviations.length)
    : 0;

  return {
    pointCount: points.length,
    tolerance,
    maxAbsoluteDeviation,
    rmsDeviation,
    deviations,
    isCoplanar: maxAbsoluteDeviation <= tolerance
  };
}

export interface StatisticalOutlierReport {
  pointCount: number;
  neighbors: number;
  standardDeviationMultiplier: number;
  meanNeighborDistance: number;
  neighborDistanceStandardDeviation: number;
  threshold: number;
  inlierIndices: number[];
  outlierIndices: number[];
}

interface KdNode {
  index: number;
  axis: 0 | 1 | 2;
  left: KdNode | null;
  right: KdNode | null;
}

const coordinate = (point: Vector3D, axis: 0 | 1 | 2): number =>
  axis === 0 ? point.x : axis === 1 ? point.y : point.z;

function buildKdTree(points: readonly Vector3D[], indices: number[], depth = 0): KdNode | null {
  if (indices.length === 0) return null;
  const axis = (depth % 3) as 0 | 1 | 2;
  indices.sort((a, b) => coordinate(points[a], axis) - coordinate(points[b], axis));
  const middle = Math.floor(indices.length / 2);
  return {
    index: indices[middle],
    axis,
    left: buildKdTree(points, indices.slice(0, middle), depth + 1),
    right: buildKdTree(points, indices.slice(middle + 1), depth + 1)
  };
}

function squaredDistance(a: Vector3D, b: Vector3D): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return dx * dx + dy * dy + dz * dz;
}

function nearestNeighborDistances(
  points: readonly Vector3D[],
  root: KdNode,
  targetIndex: number,
  count: number
): number[] {
  const target = points[targetIndex];
  const nearest: number[] = [];

  const visit = (node: KdNode | null): void => {
    if (!node) return;
    const candidateDistance = squaredDistance(target, points[node.index]);
    if (node.index !== targetIndex) {
      nearest.push(candidateDistance);
      nearest.sort((a, b) => a - b);
      if (nearest.length > count) nearest.pop();
    }

    const delta = coordinate(target, node.axis) - coordinate(points[node.index], node.axis);
    const near = delta <= 0 ? node.left : node.right;
    const far = delta <= 0 ? node.right : node.left;
    visit(near);
    if (nearest.length < count || delta * delta <= nearest[nearest.length - 1]) visit(far);
  };

  visit(root);
  return nearest.map(Math.sqrt);
}

/**
 * Statistical nearest-neighbor outlier detection using a balanced 3D k-d tree.
 * Points whose mean k-neighbor distance exceeds globalMean + multiplier * SD
 * are marked as outliers. At least two points are required.
 */
export function detectStatisticalOutliers(
  points: readonly Vector3D[],
  neighbors = 8,
  standardDeviationMultiplier = 1
): StatisticalOutlierReport {
  validatePoints(points, 'points');
  if (points.length < 2) throw new Error('At least two points are required for outlier detection');
  if (!Number.isInteger(neighbors) || neighbors < 1 || neighbors >= points.length) {
    throw new Error(`neighbors must be an integer from 1 to ${points.length - 1}`);
  }
  if (!Number.isFinite(standardDeviationMultiplier) || standardDeviationMultiplier < 0) {
    throw new Error('standardDeviationMultiplier must be a finite non-negative number');
  }

  const root = buildKdTree(points, points.map((_, index) => index));
  if (!root) throw new Error('Unable to build spatial search tree');
  const meanDistances = points.map((_, index) => {
    const distances = nearestNeighborDistances(points, root, index, neighbors);
    return distances.reduce((sum, distance) => sum + distance, 0) / distances.length;
  });
  const meanNeighborDistance = meanDistances.reduce((sum, value) => sum + value, 0) / meanDistances.length;
  const variance = meanDistances.reduce((sum, value) => sum + (value - meanNeighborDistance) ** 2, 0) / meanDistances.length;
  const neighborDistanceStandardDeviation = Math.sqrt(variance);
  const threshold = meanNeighborDistance + standardDeviationMultiplier * neighborDistanceStandardDeviation;
  const inlierIndices: number[] = [];
  const outlierIndices: number[] = [];
  meanDistances.forEach((distance, index) => {
    (distance > threshold ? outlierIndices : inlierIndices).push(index);
  });

  return {
    pointCount: points.length,
    neighbors,
    standardDeviationMultiplier,
    meanNeighborDistance,
    neighborDistanceStandardDeviation,
    threshold,
    inlierIndices,
    outlierIndices
  };
}

export interface InspectionReportInput {
  /** SHA-256 digest of the exact source dataset, not a display name or partial buffer. */
  datasetDigest: string;
  clearanceViolations?: readonly ClearanceViolation[];
  coplanarity?: CoplanarityReport;
  outliers?: StatisticalOutlierReport;
  generatedAt?: string;
}

export interface EngineeringInspectionReport {
  schemaVersion: '1.0';
  reportId: string;
  generatedAt: string;
  datasetDigest: string;
  findings: {
    clearanceViolationCount: number;
    clearanceViolations: ClearanceViolation[];
    coplanarity?: CoplanarityReport;
    outliers?: StatisticalOutlierReport;
  };
  reportDigest: string;
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== undefined)
      .sort(([a], [b]) => a.localeCompare(b));
    return `{${entries.map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`).join(',')}}`;
  }
  return JSON.stringify(value) ?? 'null';
}

/** Creates a structured inspection report and binds it to its source datum and findings. */
export async function createEngineeringInspectionReport(
  input: InspectionReportInput
): Promise<EngineeringInspectionReport> {
  if (!/^[a-f\d]{64}$/i.test(input.datasetDigest)) {
    throw new Error('datasetDigest must be a 64-character SHA-256 hex digest');
  }
  const generatedAt = input.generatedAt ?? new Date().toISOString();
  if (Number.isNaN(Date.parse(generatedAt))) throw new Error('generatedAt must be a valid ISO-8601 timestamp');

  const findings = {
    clearanceViolationCount: input.clearanceViolations?.length ?? 0,
    clearanceViolations: (input.clearanceViolations ?? []).map((violation) => ({
      ...violation,
      point: { ...violation.point },
      zoneIds: [...violation.zoneIds]
    })),
    ...(input.coplanarity ? { coplanarity: input.coplanarity } : {}),
    ...(input.outliers ? { outliers: input.outliers } : {})
  };
  const payload = {
    schemaVersion: '1.0' as const,
    reportId: `INS-${Date.parse(generatedAt).toString(36).toUpperCase()}`,
    generatedAt,
    datasetDigest: input.datasetDigest.toLowerCase(),
    findings
  };
  const reportDigest = await computeRawSha256Hex(stableStringify(payload));
  return { ...payload, reportDigest };
}

function validatePoints(points: readonly Vector3D[], label: string): void {
  if (!Array.isArray(points)) throw new Error(`${label} must be an array`);
  points.forEach((point, index) => validateVector(point, `${label}[${index}]`));
}

function validateVector(value: Vector3D, label: string): void {
  if (!value || ![value.x, value.y, value.z].every(Number.isFinite)) {
    throw new Error(`${label} must contain finite x, y, and z coordinates`);
  }
}

function validateNonNegativeFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) throw new Error(`${label} must be finite and non-negative`);
}

function validateBounds(bounds: BoundingBox3D): void {
  validateVector(bounds?.min, 'bounds.min');
  validateVector(bounds?.max, 'bounds.max');
  if (bounds.min.x > bounds.max.x || bounds.min.y > bounds.max.y || bounds.min.z > bounds.max.z) {
    throw new Error('Clearance zone bounds must have min coordinates less than or equal to max coordinates');
  }
}
