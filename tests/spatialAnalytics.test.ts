import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  createEngineeringInspectionReport,
  detectClearanceViolations,
  detectStatisticalOutliers,
  evaluateCoplanarity
} from '../src/utils/spatialAnalytics';
import { Vector3D } from '../src/utils/spatialMath';

const samplePoints: Vector3D[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 1, y: 1, z: 0 },
  { x: 0.5, y: 0.5, z: 0.001 }
];

describe('Phase F — Spatial Intelligence & Analytics', () => {
  it('detects all points inside a prohibited clearance volume and reports overlapping zones', () => {
    const violations = detectClearanceViolations(
      [{ x: 0.5, y: 0.5, z: 0.5 }, { x: 2, y: 2, z: 2 }],
      [
        { id: 'keep-out-a', bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: 1, y: 1, z: 1 } } },
        { id: 'keep-out-b', bounds: { min: { x: 0.5, y: 0, z: 0 }, max: { x: 2, y: 1, z: 1 } } }
      ]
    );
    assert.deepEqual(violations, [{ pointIndex: 0, point: { x: 0.5, y: 0.5, z: 0.5 }, zoneIds: ['keep-out-a', 'keep-out-b'] }]);
  });

  it('rejects invalid clearance volumes and non-finite point coordinates', () => {
    assert.throws(() => detectClearanceViolations([{ x: NaN, y: 0, z: 0 }], []), /finite/);
    assert.throws(() => detectClearanceViolations([], [{ id: 'bad', bounds: {
      min: { x: 2, y: 0, z: 0 }, max: { x: 1, y: 1, z: 1 }
    } }]), /min coordinates/);
  });

  it('evaluates perpendicular deviations from a normalized reference plane', () => {
    const report = evaluateCoplanarity(samplePoints, { normal: { x: 0, y: 0, z: 4 }, point: { x: 0, y: 0, z: 0 } }, 0.002);
    assert.equal(report.isCoplanar, true);
    assert.equal(report.maxAbsoluteDeviation, 0.001);
    assert.ok(Math.abs(report.rmsDeviation - Math.sqrt(0.000001 / 5)) < 1e-12);
  });

  it('flags a surface point outside the specified coplanarity tolerance', () => {
    const report = evaluateCoplanarity(
      [...samplePoints, { x: 0.4, y: 0.6, z: 0.02 }],
      { normal: { x: 0, y: 0, z: 1 }, point: { x: 0, y: 0, z: 0 } },
      0.005
    );
    assert.equal(report.isCoplanar, false);
    assert.equal(report.maxAbsoluteDeviation, 0.02);
  });

  it('finds an isolated statistical outlier while preserving the dense cluster', () => {
    const points = [
      { x: 0, y: 0, z: 0 }, { x: 0.1, y: 0, z: 0 }, { x: 0, y: 0.1, z: 0 },
      { x: 0.1, y: 0.1, z: 0 }, { x: 0.05, y: 0.05, z: 0 }, { x: 20, y: 20, z: 20 }
    ];
    const result = detectStatisticalOutliers(points, 2, 1);
    assert.deepEqual(result.outlierIndices, [5]);
    assert.deepEqual(result.inlierIndices, [0, 1, 2, 3, 4]);
  });

  it('validates outlier parameters and small input sets', () => {
    assert.throws(() => detectStatisticalOutliers([{ x: 0, y: 0, z: 0 }]), /At least two/);
    assert.throws(() => detectStatisticalOutliers(samplePoints, 5), /neighbors must be/);
    assert.throws(() => detectStatisticalOutliers(samplePoints, 2, -1), /standardDeviationMultiplier/);
  });

  it('creates a SHA-256 datum-bound report with stable output for identical input', async () => {
    const input = {
      datasetDigest: 'a'.repeat(64),
      generatedAt: '2026-11-06T12:00:00.000Z',
      clearanceViolations: [{ pointIndex: 1, point: { x: 1, y: 2, z: 3 }, zoneIds: ['zone-1'] }]
    };
    const first = await createEngineeringInspectionReport(input);
    const second = await createEngineeringInspectionReport(input);
    assert.equal(first.reportDigest, second.reportDigest);
    assert.equal(first.findings.clearanceViolationCount, 1);
    assert.equal(first.datasetDigest, 'a'.repeat(64));
    assert.match(first.reportDigest, /^[a-f\d]{64}$/);
    assert.throws(() => createEngineeringInspectionReport({ ...input, datasetDigest: 'not-a-digest' }), /64-character SHA-256/);
  });
});
