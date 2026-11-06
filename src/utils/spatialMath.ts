/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ZYLVEX SPACE — Spatial Mathematics & Coordinate Transformation Engine
 * Phase B Engineering Implementation
 * 
 * Implements authoritative computational geometry, CAD Z-Up to WebGL Y-Up coordinate transformations,
 * metric/imperial unit scalings, 4x4 affine matrices, quaternions, and ISO 17123-4 precision policies.
 */

export type SpatialUnit = 'MM' | 'CM' | 'M' | 'KM' | 'IN' | 'FT';

export type CoordinateSystemConvention = 
  | 'CAD_Z_UP_RIGHT_HANDED'    // Standard engineering CAD/BIM (AutoCAD, Revit, SolidWorks: X=Right, Y=Forward, Z=Elevation)
  | 'WEBGL_Y_UP_RIGHT_HANDED'  // WebGL & Three.js standard (X=Right, Y=Elevation, Z=Depth)
  | 'GEODETIC_WGS84_LOCAL';    // Local tangent plane relative to geodetic datum

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface EulerAngles {
  pitch: number; // Rotation around X in radians
  yaw: number;   // Rotation around Y in radians
  roll: number;  // Rotation around Z in radians
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface BoundingBox3D {
  min: Vector3D;
  max: Vector3D;
}

export interface SpatialPlane {
  normal: Vector3D; // Normalized (unit length)
  constant: number; // Distance from origin: Ax + By + Cz + D = 0
}

/**
 * Standard unit scale factors relative to 1 Meter (SI standard).
 */
export const UNIT_TO_METERS: Record<SpatialUnit, number> = {
  MM: 0.001,
  CM: 0.01,
  M: 1.0,
  KM: 1000.0,
  IN: 0.0254,
  FT: 0.3048
};

/**
 * Converts a numeric scalar distance between any two spatial units.
 */
export function convertUnit(value: number, fromUnit: SpatialUnit, toUnit: SpatialUnit): number {
  if (!isFinite(value) || isNaN(value)) {
    throw new Error(`Cannot convert non-finite value: ${value}`);
  }
  const meters = value * UNIT_TO_METERS[fromUnit];
  const converted = meters / UNIT_TO_METERS[toUnit];
  // Float normalization to 10 decimal digits to eliminate IEEE 754 binary float artifacts
  return Math.round(converted * 1e10) / 1e10;
}

/**
 * Vector3D Mathematics Utilities
 */
export class VectorOps {
  static create(x = 0, y = 0, z = 0): Vector3D {
    return { x, y, z };
  }

  static clone(v: Vector3D): Vector3D {
    return { x: v.x, y: v.y, z: v.z };
  }

  static add(a: Vector3D, b: Vector3D): Vector3D {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
  }

  static subtract(a: Vector3D, b: Vector3D): Vector3D {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
  }

  static multiplyScalar(v: Vector3D, s: number): Vector3D {
    return { x: v.x * s, y: v.y * s, z: v.z * s };
  }

  static dot(a: Vector3D, b: Vector3D): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  static cross(a: Vector3D, b: Vector3D): Vector3D {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    };
  }

  static magnitudeSq(v: Vector3D): number {
    return v.x * v.x + v.y * v.y + v.z * v.z;
  }

  static magnitude(v: Vector3D): number {
    return Math.sqrt(this.magnitudeSq(v));
  }

  static distance(a: Vector3D, b: Vector3D): number {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  static distance2D(a: Vector3D, b: Vector3D): number {
    const dx = a.x - b.x;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  static normalize(v: Vector3D): Vector3D {
    const len = this.magnitude(v);
    if (len === 0) return { x: 0, y: 0, z: 0 };
    return { x: v.x / len, y: v.y / len, z: v.z / len };
  }

  static angleBetween(a: Vector3D, b: Vector3D): number {
    const dotMag = this.dot(a, b);
    const lenMag = this.magnitude(a) * this.magnitude(b);
    if (lenMag === 0) return 0;
    const clamped = Math.max(-1, Math.min(1, dotMag / lenMag));
    return Math.acos(clamped); // Returns radians
  }
}

/**
 * CAD Z-Up to WebGL Y-Up Coordinate Transformation
 * 
 * In ISO CAD (Revit, AutoCAD, SolidWorks):
 *   X = Right
 *   Y = Forward (Depth)
 *   Z = Elevation (Up)
 * 
 * In WebGL / Three.js:
 *   X = Right
 *   Y = Elevation (Up)
 *   Z = Backward (-Forward)
 * 
 * Transformation equations:
 *   x_webgl =  x_cad
 *   y_webgl =  z_cad
 *   z_webgl = -y_cad
 */
export function cadZUpToWebGlYUp(v: Vector3D): Vector3D {
  return {
    x: v.x,
    y: v.z,
    z: -v.y
  };
}

/**
 * Inverse transformation: WebGL Y-Up back to CAD Z-Up.
 *   x_cad =  x_webgl
 *   y_cad = -z_webgl
 *   z_cad =  y_webgl
 */
export function webGlYUpToCadZUp(v: Vector3D): Vector3D {
  return {
    x: v.x,
    y: -v.z,
    z: v.y
  };
}

/**
 * 4x4 Affine Transformation Matrix
 * Column-major 16-element array matching WebGL & OpenGL conventions.
 */
export class Matrix4x4 {
  elements: number[];

  constructor(elements?: number[]) {
    if (elements && elements.length === 16) {
      this.elements = [...elements];
    } else {
      // Identity matrix
      this.elements = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    }
  }

  static identity(): Matrix4x4 {
    return new Matrix4x4();
  }

  static makeTranslation(x: number, y: number, z: number): Matrix4x4 {
    return new Matrix4x4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      x, y, z, 1
    ]);
  }

  static makeScale(sx: number, sy: number, sz: number): Matrix4x4 {
    return new Matrix4x4([
      sx, 0,  0,  0,
      0,  sy, 0,  0,
      0,  0,  sz, 0,
      0,  0,  0,  1
    ]);
  }

  /**
   * Rotation around X axis (radians).
   */
  static makeRotationX(theta: number): Matrix4x4 {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return new Matrix4x4([
      1,  0, 0, 0,
      0,  c, s, 0,
      0, -s, c, 0,
      0,  0, 0, 1
    ]);
  }

  /**
   * Matrix for CAD Z-Up to WebGL Y-Up (-90 deg rotation around X).
   */
  static makeCadToWebGlMatrix(): Matrix4x4 {
    return new Matrix4x4([
      1,  0,  0, 0,
      0,  0, -1, 0,
      0,  1,  0, 0,
      0,  0,  0, 1
    ]);
  }

  multiply(b: Matrix4x4): Matrix4x4 {
    const ae = this.elements;
    const be = b.elements;
    const te = new Array(16);

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        te[i + j * 4] = 
          ae[i] * be[j * 4] +
          ae[i + 4] * be[j * 4 + 1] +
          ae[i + 8] * be[j * 4 + 2] +
          ae[i + 12] * be[j * 4 + 3];
      }
    }

    return new Matrix4x4(te);
  }

  transformPoint(p: Vector3D): Vector3D {
    const e = this.elements;
    const w = e[3] * p.x + e[7] * p.y + e[11] * p.z + e[15] || 1.0;
    return {
      x: (e[0] * p.x + e[4] * p.y + e[8] * p.z + e[12]) / w,
      y: (e[1] * p.x + e[5] * p.y + e[9] * p.z + e[13]) / w,
      z: (e[2] * p.x + e[6] * p.y + e[10] * p.z + e[14]) / w
    };
  }
}

/**
 * 3D Bounding Box Operations
 */
export class BoundingBoxOps {
  static create(min: Vector3D, max: Vector3D): BoundingBox3D {
    return { min: { ...min }, max: { ...max } };
  }

  static fromPoints(points: Vector3D[]): BoundingBox3D {
    if (!points || points.length === 0) {
      return { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } };
    }

    let minX = points[0].x, maxX = points[0].x;
    let minY = points[0].y, maxY = points[0].y;
    let minZ = points[0].z, maxZ = points[0].z;

    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
      if (p.z < minZ) minZ = p.z;
      if (p.z > maxZ) maxZ = p.z;
    }

    return {
      min: { x: minX, y: minY, z: minZ },
      max: { x: maxX, y: maxY, z: maxZ }
    };
  }

  static getCenter(box: BoundingBox3D): Vector3D {
    return {
      x: (box.min.x + box.max.x) * 0.5,
      y: (box.min.y + box.max.y) * 0.5,
      z: (box.min.z + box.max.z) * 0.5
    };
  }

  static getSize(box: BoundingBox3D): Vector3D {
    return {
      x: Math.max(0, box.max.x - box.min.x),
      y: Math.max(0, box.max.y - box.min.y),
      z: Math.max(0, box.max.z - box.min.z)
    };
  }

  static getVolume(box: BoundingBox3D): number {
    const size = this.getSize(box);
    return size.x * size.y * size.z;
  }

  static containsPoint(box: BoundingBox3D, point: Vector3D): boolean {
    return (
      point.x >= box.min.x && point.x <= box.max.x &&
      point.y >= box.min.y && point.y <= box.max.y &&
      point.z >= box.min.z && point.z <= box.max.z
    );
  }
}

/**
 * Geometric Precision Policy conforming to ISO 17123-4
 */
export interface MeasurementPrecisionReport {
  rawEuclideanMeters: number;
  reportedMeters: number;
  reportedMillimeters: number;
  reportedFeet: number;
  toleranceMarginMeters: number;
  gradeClassification: 'GRADE_A_RIGID' | 'GRADE_B_STRUCTURAL' | 'GRADE_C_TERRESTRIAL';
  isValid: boolean;
  validationError?: string;
}

export function evaluateMeasurementPrecision(
  pA: Vector3D,
  pB: Vector3D,
  grade: 'GRADE_A' | 'GRADE_B' | 'GRADE_C' = 'GRADE_B'
): MeasurementPrecisionReport {
  // Validate coordinates
  const coords = [pA.x, pA.y, pA.z, pB.x, pB.y, pB.z];
  for (const c of coords) {
    if (!isFinite(c) || isNaN(c)) {
      return {
        rawEuclideanMeters: 0,
        reportedMeters: 0,
        reportedMillimeters: 0,
        reportedFeet: 0,
        toleranceMarginMeters: 0,
        gradeClassification: 'GRADE_B_STRUCTURAL',
        isValid: false,
        validationError: `Coordinate contains non-finite or NaN value: ${c}`
      };
    }
  }

  const rawDist = VectorOps.distance(pA, pB);

  // ISO 17123-4 Grade bounds
  let tolerance = 0.003; // Grade B: 3 mm
  let gradeClass: 'GRADE_A_RIGID' | 'GRADE_B_STRUCTURAL' | 'GRADE_C_TERRESTRIAL' = 'GRADE_B_STRUCTURAL';

  if (grade === 'GRADE_A') {
    tolerance = 0.001; // Grade A: 1 mm (Machined fabrication)
    gradeClass = 'GRADE_A_RIGID';
  } else if (grade === 'GRADE_C') {
    tolerance = 0.005; // Grade C: 5 mm (As-built civil layout)
    gradeClass = 'GRADE_C_TERRESTRIAL';
  }

  return {
    rawEuclideanMeters: rawDist,
    reportedMeters: Number(rawDist.toFixed(3)),
    reportedMillimeters: Number((rawDist * 1000).toFixed(1)),
    reportedFeet: Number((rawDist / 0.3048).toFixed(3)),
    toleranceMarginMeters: tolerance,
    gradeClassification: gradeClass,
    isValid: true
  };
}
