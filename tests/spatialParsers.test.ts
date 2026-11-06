import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  parsePcdAscii, 
  parseStlAscii, 
  parseObjAscii, 
  SAMPLE_PCD_DATASET, 
  SAMPLE_STL_DATASET 
} from '../src/utils/spatialParsers';

describe('Phase C — Spatial Data Infrastructure & File Parsers Suite', () => {

  describe('PCD (Point Cloud Data) ASCII Parser', () => {
    it('correctly parses authoritative sample PCD dataset', () => {
      const parsed = parsePcdAscii(SAMPLE_PCD_DATASET);
      assert.equal(parsed.format, 'PCD_ASCII');
      assert.equal(parsed.pointCount, 6);
      assert.equal(parsed.positions.length, 18); // 6 points * 3 coords
      assert.ok(parsed.colors !== undefined);
      assert.equal(parsed.colors?.length, 18);

      // Check first point: -2.5, 0.2, -1.5
      assert.ok(Math.abs(parsed.positions[0] - (-2.5)) < 1e-6);
      assert.ok(Math.abs(parsed.positions[1] - 0.2) < 1e-6);
      assert.ok(Math.abs(parsed.positions[2] - (-1.5)) < 1e-6);

      // Check bounding box
      assert.ok(Math.abs(parsed.boundingBox.min.x - (-2.5)) < 1e-6);
      assert.ok(Math.abs(parsed.boundingBox.max.x - 4.0) < 1e-6);
      assert.ok(Math.abs(parsed.boundingBox.min.y - 0.2) < 1e-6);
      assert.ok(Math.abs(parsed.boundingBox.max.y - 4.8) < 1e-6);
      assert.ok(Math.abs(parsed.boundingBox.min.z - (-1.5)) < 1e-6);
      assert.ok(Math.abs(parsed.boundingBox.max.z - 3.5) < 1e-6);
    });

    it('rejects PCD with missing required fields or missing DATA header', () => {
      const invalidPcd = `VERSION .7\nFIELDS x y\nPOINTS 2\nDATA ascii\n1 2\n3 4`;
      assert.throws(() => parsePcdAscii(invalidPcd), /Header must contain x, y, and z fields/);

      const noDataPcd = `VERSION .7\nFIELDS x y z\nPOINTS 1\n1 2 3`;
      assert.throws(() => parsePcdAscii(noDataPcd), /Missing DATA ascii header/);
    });
  });

  describe('STL (Stereolithography) ASCII Parser', () => {
    it('correctly parses authoritative sample STL dataset', () => {
      const parsed = parseStlAscii(SAMPLE_STL_DATASET);
      assert.equal(parsed.format, 'STL_ASCII');
      assert.equal(parsed.metadata.name, 'ZylvexFoundationPier');
      assert.equal(parsed.triangleCount, 2);
      assert.equal(parsed.vertexCount, 6);
      assert.equal(parsed.positions.length, 18);
      assert.equal(parsed.normals.length, 18);

      // Check bounding box: [0, 2] on X and Y, 0 on Z
      assert.equal(parsed.boundingBox.min.x, 0);
      assert.equal(parsed.boundingBox.max.x, 2);
      assert.equal(parsed.boundingBox.min.y, 0);
      assert.equal(parsed.boundingBox.max.y, 2);
      assert.equal(parsed.boundingBox.min.z, 0);
      assert.equal(parsed.boundingBox.max.z, 0);
    });

    it('handles empty or malformed STL gracefully', () => {
      assert.throws(() => parseStlAscii(''), /STL content must be a non-empty string/);
      const emptySolid = parseStlAscii('solid empty\nendsolid empty');
      assert.equal(emptySolid.triangleCount, 0);
      assert.equal(emptySolid.vertexCount, 0);
    });
  });

  describe('Wavefront OBJ Parser', () => {
    it('parses geometric vertices and triangulates quad faces', () => {
      const objData = `
        # Quad plane
        v 0 0 0
        v 5 0 0
        v 5 5 0
        v 0 5 0
        f 1 2 3 4
      `;
      const parsed = parseObjAscii(objData);
      assert.equal(parsed.format, 'OBJ');
      // 1 quad triangulates into 2 triangles = 6 vertices
      assert.equal(parsed.triangleCount, 2);
      assert.equal(parsed.vertexCount, 6);
      assert.equal(parsed.positions.length, 18);

      // Check bounding box
      assert.equal(parsed.boundingBox.min.x, 0);
      assert.equal(parsed.boundingBox.max.x, 5);
      assert.equal(parsed.boundingBox.min.y, 0);
      assert.equal(parsed.boundingBox.max.y, 5);
    });

    it('computes flat surface normals automatically when OBJ lacks vn tokens', () => {
      const objData = `
        v 0 0 0
        v 1 0 0
        v 0 1 0
        f 1 2 3
      `;
      const parsed = parseObjAscii(objData);
      assert.equal(parsed.triangleCount, 1);
      assert.equal(parsed.normals.length, 9);
      // Triangle in XY plane has normal [0, 0, 1]
      assert.equal(parsed.normals[0], 0);
      assert.equal(parsed.normals[1], 0);
      assert.equal(parsed.normals[2], 1);
    });
  });

});
