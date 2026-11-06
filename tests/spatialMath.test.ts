import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  convertUnit, 
  VectorOps, 
  cadZUpToWebGlYUp, 
  webGlYUpToCadZUp, 
  Matrix4x4, 
  BoundingBoxOps, 
  evaluateMeasurementPrecision,
  Vector3D
} from '../src/utils/spatialMath';

describe('Phase B — Spatial Mathematics & Coordinate Transformation Suite', () => {

  describe('Unit Conversions', () => {
    it('correctly converts millimeters to meters', () => {
      assert.equal(convertUnit(1000, 'MM', 'M'), 1.0);
      assert.equal(convertUnit(4850, 'MM', 'M'), 4.85);
    });

    it('correctly converts meters to feet and inches', () => {
      // 1 meter = 3.28084 feet
      const ft = convertUnit(1, 'M', 'FT');
      assert.ok(Math.abs(ft - 3.28084) < 0.001);

      // 1 inch = 25.4 mm
      const mm = convertUnit(1, 'IN', 'MM');
      assert.equal(mm, 25.4);
    });

    it('performs exact roundtrip unit conversions', () => {
      const original = 14.52;
      const inMeters = convertUnit(original, 'FT', 'M');
      const roundtrip = convertUnit(inMeters, 'M', 'FT');
      assert.ok(Math.abs(roundtrip - original) < 1e-10);
    });

    it('throws on non-finite values', () => {
      assert.throws(() => convertUnit(NaN, 'M', 'MM'), /Cannot convert non-finite value/);
      assert.throws(() => convertUnit(Infinity, 'M', 'MM'), /Cannot convert non-finite value/);
    });
  });

  describe('Vector3D Operations', () => {
    it('performs vector addition and subtraction', () => {
      const a: Vector3D = { x: 1, y: 2, z: 3 };
      const b: Vector3D = { x: 4, y: 5, z: 6 };
      assert.deepEqual(VectorOps.add(a, b), { x: 5, y: 7, z: 9 });
      assert.deepEqual(VectorOps.subtract(b, a), { x: 3, y: 3, z: 3 });
    });

    it('computes 3D Euclidean distance accurately', () => {
      const a: Vector3D = { x: 0, y: 0, z: 0 };
      const b: Vector3D = { x: 3, y: 4, z: 12 };
      // 3^2 + 4^2 + 12^2 = 9 + 16 + 144 = 169 = 13^2
      assert.equal(VectorOps.distance(a, b), 13);
    });

    it('computes cross product perpendicularity', () => {
      const xUnit: Vector3D = { x: 1, y: 0, z: 0 };
      const yUnit: Vector3D = { x: 0, y: 1, z: 0 };
      const cross = VectorOps.cross(xUnit, yUnit);
      assert.deepEqual(cross, { x: 0, y: 0, z: 1 }); // Z unit
    });

    it('computes vector angle in radians', () => {
      const a: Vector3D = { x: 1, y: 0, z: 0 };
      const b: Vector3D = { x: 0, y: 1, z: 0 };
      const angle = VectorOps.angleBetween(a, b);
      assert.ok(Math.abs(angle - Math.PI / 2) < 1e-6); // 90 degrees
    });
  });

  describe('CAD Z-Up to WebGL Y-Up Coordinate Transformation', () => {
    it('transforms CAD coordinates (X=Right, Y=Forward, Z=Up) to WebGL (X=Right, Y=Up, Z=-Forward)', () => {
      const cadPoint: Vector3D = { x: 10, y: 25, z: 5 }; // 10m East, 25m North, 5m Elevation
      const webGlPoint = cadZUpToWebGlYUp(cadPoint);

      assert.equal(webGlPoint.x, 10);
      assert.equal(webGlPoint.y, 5);   // CAD Elevation becomes WebGL Y
      assert.equal(webGlPoint.z, -25); // CAD North becomes WebGL -Z
    });

    it('inverts WebGL coordinates back to CAD Z-Up with bit-for-bit precision', () => {
      const originalCad: Vector3D = { x: -14.285, y: 92.104, z: 18.5 };
      const webGl = cadZUpToWebGlYUp(originalCad);
      const restoredCad = webGlYUpToCadZUp(webGl);

      assert.deepEqual(restoredCad, originalCad);
    });

    it('Matrix4x4 transformation matches functional coordinate transform', () => {
      const p: Vector3D = { x: 5, y: 8, z: 12 };
      const mat = Matrix4x4.makeCadToWebGlMatrix();
      const matrixTransformed = mat.transformPoint(p);
      const funcTransformed = cadZUpToWebGlYUp(p);

      assert.ok(Math.abs(matrixTransformed.x - funcTransformed.x) < 1e-6);
      assert.ok(Math.abs(matrixTransformed.y - funcTransformed.y) < 1e-6);
      assert.ok(Math.abs(matrixTransformed.z - funcTransformed.z) < 1e-6);
    });
  });

  describe('BoundingBox3D Operations', () => {
    it('computes tight bounding box from point cloud', () => {
      const points: Vector3D[] = [
        { x: -5, y: 0, z: -3 },
        { x: 10, y: 15, z: 2 },
        { x: 2, y: -4, z: 8 }
      ];
      const box = BoundingBoxOps.fromPoints(points);

      assert.deepEqual(box.min, { x: -5, y: -4, z: -3 });
      assert.deepEqual(box.max, { x: 10, y: 15, z: 8 });

      const size = BoundingBoxOps.getSize(box);
      assert.deepEqual(size, { x: 15, y: 19, z: 11 });

      const center = BoundingBoxOps.getCenter(box);
      assert.deepEqual(center, { x: 2.5, y: 5.5, z: 2.5 });
    });

    it('containsPoint correctly checks containment', () => {
      const box = BoundingBoxOps.create({ x: 0, y: 0, z: 0 }, { x: 10, y: 10, z: 10 });
      assert.ok(BoundingBoxOps.containsPoint(box, { x: 5, y: 5, z: 5 }));
      assert.ok(!BoundingBoxOps.containsPoint(box, { x: 15, y: 5, z: 5 }));
    });
  });

  describe('ISO 17123-4 Precision Policy', () => {
    it('evaluates distance with explicit tolerance margin and units', () => {
      const pA: Vector3D = { x: 0, y: 0, z: 0 };
      const pB: Vector3D = { x: 10, y: 0, z: 0 };
      const report = evaluateMeasurementPrecision(pA, pB, 'GRADE_A');

      assert.equal(report.isValid, true);
      assert.equal(report.reportedMeters, 10);
      assert.equal(report.reportedMillimeters, 10000);
      assert.equal(report.toleranceMarginMeters, 0.001); // 1mm for Grade A
      assert.equal(report.gradeClassification, 'GRADE_A_RIGID');
    });

    it('rejects non-finite coordinate inputs', () => {
      const pA: Vector3D = { x: NaN, y: 0, z: 0 };
      const pB: Vector3D = { x: 10, y: 0, z: 0 };
      const report = evaluateMeasurementPrecision(pA, pB);

      assert.equal(report.isValid, false);
      assert.ok(report.validationError?.includes('NaN'));
    });
  });

});
