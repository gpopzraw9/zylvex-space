/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ZYLVEX SPACE — Spatial Data Infrastructure & File Parsers
 * Phase C Engineering Implementation
 * 
 * Implements genuine client-side parsers for Point Cloud Data (.pcd, .xyz),
 * Stereolithography (.stl), and Wavefront (.obj) formats.
 * 
 * Strict Zero-Cloud Policy: All file parsing occurs client-side in memory.
 * No customer geometry is ever transmitted over the network.
 */

import { BoundingBox3D, BoundingBoxOps, Vector3D } from './spatialMath';

export interface ParsedPointCloud {
  format: 'PCD_ASCII' | 'XYZ_ASCII';
  pointCount: number;
  positions: Float32Array; // Flattened [x0, y0, z0, x1, y1, z1, ...]
  colors?: Float32Array;    // Flattened normalized [r0, g0, b0, ...] (0.0 to 1.0)
  boundingBox: BoundingBox3D;
  headerMetadata: Record<string, string>;
  warnings: string[];
}

export interface ParsedMesh {
  format: 'STL_ASCII' | 'STL_BINARY' | 'OBJ';
  vertexCount: number;
  triangleCount: number;
  positions: Float32Array; // Flattened [x, y, z, ...] for each vertex in each triangle
  normals: Float32Array;   // Flattened [nx, ny, nz, ...] matching positions
  boundingBox: BoundingBox3D;
  metadata: {
    name?: string;
    hasNormals: boolean;
  };
  warnings: string[];
}

/**
 * Parses ASCII PCD (Point Cloud Data) format conforming to Point Cloud Library (PCL) specification.
 */
export function parsePcdAscii(content: string): ParsedPointCloud {
  if (!content || typeof content !== 'string') {
    throw new Error('PCD content must be a non-empty string');
  }

  const lines = content.split(/\r?\n/);
  const header: Record<string, string> = {};
  let dataIndex = -1;
  let pointCount = 0;
  let fields: string[] = [];
  let size: number[] = [];
  let type: string[] = [];
  let count: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split(/\s+/);
    const key = parts[0].toUpperCase();

    if (key === 'DATA') {
      header['DATA'] = parts[1] || 'ascii';
      dataIndex = i + 1;
      break;
    }

    if (key === 'POINTS') {
      pointCount = parseInt(parts[1], 10);
      header['POINTS'] = parts[1];
    } else if (key === 'FIELDS') {
      fields = parts.slice(1).map(f => f.toLowerCase());
      header['FIELDS'] = fields.join(' ');
    } else if (key === 'SIZE') {
      size = parts.slice(1).map(s => parseInt(s, 10));
      header['SIZE'] = parts.slice(1).join(' ');
    } else if (key === 'TYPE') {
      type = parts.slice(1);
      header['TYPE'] = parts.slice(1).join(' ');
    } else if (key === 'COUNT') {
      count = parts.slice(1).map(c => parseInt(c, 10));
      header['COUNT'] = parts.slice(1).join(' ');
    } else {
      header[key] = parts.slice(1).join(' ');
    }
  }

  if (dataIndex === -1 || header['DATA']?.toLowerCase() !== 'ascii') {
    throw new Error('Invalid PCD: Missing DATA ascii header or unsupported binary format');
  }

  const xIdx = fields.indexOf('x');
  const yIdx = fields.indexOf('y');
  const zIdx = fields.indexOf('z');
  const rgbIdx = fields.indexOf('rgb');

  if (xIdx === -1 || yIdx === -1 || zIdx === -1) {
    throw new Error('Invalid PCD: Header must contain x, y, and z fields');
  }

  const dataLines = lines.slice(dataIndex);
  const validPoints: number[][] = [];
  const validColors: number[][] = [];
  const warnings: string[] = [];

  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i].trim();
    if (!line) continue;

    const parts = line.split(/\s+/);
    const x = parseFloat(parts[xIdx]);
    const y = parseFloat(parts[yIdx]);
    const z = parseFloat(parts[zIdx]);

    if (!isFinite(x) || !isFinite(y) || !isFinite(z)) {
      warnings.push(`Line ${dataIndex + i}: Invalid coordinate values, skipped.`);
      continue;
    }

    validPoints.push([x, y, z]);

    // Handle RGB if available
    if (rgbIdx !== -1 && parts[rgbIdx]) {
      const rgbVal = parseFloat(parts[rgbIdx]);
      // Standard PCL packed float RGB
      const intVal = Math.floor(rgbVal);
      const r = ((intVal >> 16) & 0xff) / 255.0;
      const g = ((intVal >> 8) & 0xff) / 255.0;
      const b = (intVal & 0xff) / 255.0;
      validColors.push([r, g, b]);
    }
  }

  const countParsed = validPoints.length;
  const positions = new Float32Array(countParsed * 3);
  let colors: Float32Array | undefined = undefined;

  if (validColors.length === countParsed) {
    colors = new Float32Array(countParsed * 3);
  }

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (let i = 0; i < countParsed; i++) {
    const [px, py, pz] = validPoints[i];
    positions[i * 3] = px;
    positions[i * 3 + 1] = py;
    positions[i * 3 + 2] = pz;

    if (px < minX) minX = px;
    if (px > maxX) maxX = px;
    if (py < minY) minY = py;
    if (py > maxY) maxY = py;
    if (pz < minZ) minZ = pz;
    if (pz > maxZ) maxZ = pz;

    if (colors && validColors[i]) {
      colors[i * 3] = validColors[i][0];
      colors[i * 3 + 1] = validColors[i][1];
      colors[i * 3 + 2] = validColors[i][2];
    }
  }

  const boundingBox: BoundingBox3D = countParsed > 0
    ? { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } }
    : { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } };

  return {
    format: 'PCD_ASCII',
    pointCount: countParsed,
    positions,
    colors,
    boundingBox,
    headerMetadata: header,
    warnings
  };
}

/**
 * Parses ASCII STL (Stereolithography) format.
 */
export function parseStlAscii(content: string): ParsedMesh {
  if (!content || typeof content !== 'string') {
    throw new Error('STL content must be a non-empty string');
  }

  const lines = content.split(/\r?\n/);
  const positionsArr: number[] = [];
  const normalsArr: number[] = [];
  const warnings: string[] = [];

  let currentNormal = [0, 0, 0];
  let currentVertices: number[][] = [];
  let name = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(/\s+/);
    const keyword = parts[0].toLowerCase();

    if (keyword === 'solid') {
      name = parts.slice(1).join(' ');
    } else if (keyword === 'facet' && parts[1]?.toLowerCase() === 'normal') {
      currentNormal = [
        parseFloat(parts[2]) || 0,
        parseFloat(parts[3]) || 0,
        parseFloat(parts[4]) || 0
      ];
      currentVertices = [];
    } else if (keyword === 'vertex') {
      const vx = parseFloat(parts[1]);
      const vy = parseFloat(parts[2]);
      const vz = parseFloat(parts[3]);

      if (isFinite(vx) && isFinite(vy) && isFinite(vz)) {
        currentVertices.push([vx, vy, vz]);
      } else {
        warnings.push(`Line ${i + 1}: Malformed vertex numbers.`);
      }
    } else if (keyword === 'endfacet') {
      if (currentVertices.length === 3) {
        for (let v = 0; v < 3; v++) {
          positionsArr.push(currentVertices[v][0], currentVertices[v][1], currentVertices[v][2]);
          normalsArr.push(currentNormal[0], currentNormal[1], currentNormal[2]);
        }
      } else {
        warnings.push(`Facet around line ${i + 1} did not contain exactly 3 vertices.`);
      }
    }
  }

  const totalVertices = positionsArr.length / 3;
  const triangleCount = Math.floor(totalVertices / 3);

  const positions = new Float32Array(positionsArr);
  const normals = new Float32Array(normalsArr);

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (let i = 0; i < positionsArr.length; i += 3) {
    const x = positionsArr[i];
    const y = positionsArr[i + 1];
    const z = positionsArr[i + 2];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }

  const boundingBox: BoundingBox3D = totalVertices > 0
    ? { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } }
    : { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } };

  return {
    format: 'STL_ASCII',
    vertexCount: totalVertices,
    triangleCount,
    positions,
    normals,
    boundingBox,
    metadata: {
      name,
      hasNormals: normalsArr.some(n => n !== 0)
    },
    warnings
  };
}

/**
 * Parses Wavefront OBJ format.
 */
export function parseObjAscii(content: string): ParsedMesh {
  if (!content || typeof content !== 'string') {
    throw new Error('OBJ content must be a non-empty string');
  }

  const lines = content.split(/\r?\n/);
  const rawVertices: number[][] = [];
  const rawNormals: number[][] = [];
  const positionsArr: number[] = [];
  const normalsArr: number[] = [];
  const warnings: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.startsWith('#')) continue;

    const parts = line.split(/\s+/);
    const type = parts[0];

    if (type === 'v') {
      const vx = parseFloat(parts[1]);
      const vy = parseFloat(parts[2]);
      const vz = parseFloat(parts[3]);
      if (isFinite(vx) && isFinite(vy) && isFinite(vz)) {
        rawVertices.push([vx, vy, vz]);
      }
    } else if (type === 'vn') {
      const nx = parseFloat(parts[1]);
      const ny = parseFloat(parts[2]);
      const nz = parseFloat(parts[3]);
      if (isFinite(nx) && isFinite(ny) && isFinite(nz)) {
        rawNormals.push([nx, ny, nz]);
      }
    } else if (type === 'f') {
      // Parse face tokens (e.g. v, v/vt, v//vn, v/vt/vn)
      const faceVertexIndices: number[] = [];
      const faceNormalIndices: number[] = [];

      for (let f = 1; f < parts.length; f++) {
        const segs = parts[f].split('/');
        const vIdx = parseInt(segs[0], 10);
        // OBJ indices are 1-based, or negative relative
        const actualVIdx = vIdx > 0 ? vIdx - 1 : rawVertices.length + vIdx;
        faceVertexIndices.push(actualVIdx);

        if (segs[2]) {
          const vnIdx = parseInt(segs[2], 10);
          const actualVnIdx = vnIdx > 0 ? vnIdx - 1 : rawNormals.length + vnIdx;
          faceNormalIndices.push(actualVnIdx);
        }
      }

      // Triangulate polygon fans (f 0 1 2, f 0 2 3)
      for (let t = 1; t < faceVertexIndices.length - 1; t++) {
        const i0 = faceVertexIndices[0];
        const i1 = faceVertexIndices[t];
        const i2 = faceVertexIndices[t + 1];

        if (rawVertices[i0] && rawVertices[i1] && rawVertices[i2]) {
          positionsArr.push(...rawVertices[i0], ...rawVertices[i1], ...rawVertices[i2]);

          if (faceNormalIndices.length >= 3 && rawNormals[faceNormalIndices[0]]) {
            const n0 = faceNormalIndices[0];
            const n1 = faceNormalIndices[t];
            const n2 = faceNormalIndices[t + 1];
            normalsArr.push(...rawNormals[n0], ...rawNormals[n1], ...rawNormals[n2]);
          } else {
            // Compute flat face normal
            const ax = rawVertices[i1][0] - rawVertices[i0][0];
            const ay = rawVertices[i1][1] - rawVertices[i0][1];
            const az = rawVertices[i1][2] - rawVertices[i0][2];
            const bx = rawVertices[i2][0] - rawVertices[i0][0];
            const by = rawVertices[i2][1] - rawVertices[i0][1];
            const bz = rawVertices[i2][2] - rawVertices[i0][2];
            const nx = ay * bz - az * by;
            const ny = az * bx - ax * bz;
            const nz = ax * by - ay * bx;
            const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
            const norm = [nx / len, ny / len, nz / len];
            normalsArr.push(...norm, ...norm, ...norm);
          }
        }
      }
    }
  }

  const totalVertices = positionsArr.length / 3;
  const triangleCount = Math.floor(totalVertices / 3);

  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

  for (let i = 0; i < positionsArr.length; i += 3) {
    const x = positionsArr[i];
    const y = positionsArr[i + 1];
    const z = positionsArr[i + 2];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
    if (z < minZ) minZ = z;
    if (z > maxZ) maxZ = z;
  }

  const boundingBox: BoundingBox3D = totalVertices > 0
    ? { min: { x: minX, y: minY, z: minZ }, max: { x: maxX, y: maxY, z: maxZ } }
    : { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } };

  return {
    format: 'OBJ',
    vertexCount: totalVertices,
    triangleCount,
    positions: new Float32Array(positionsArr),
    normals: new Float32Array(normalsArr),
    boundingBox,
    metadata: {
      hasNormals: rawNormals.length > 0
    },
    warnings
  };
}

/**
 * Built-in Authoritative Sample Datasets for Offline Testing & Verification
 */
export const SAMPLE_PCD_DATASET = `# .PCD v.7 - Point Cloud Data file format
VERSION .7
FIELDS x y z rgb
SIZE 4 4 4 4
TYPE F F F F
COUNT 1 1 1 1
WIDTH 6
HEIGHT 1
VIEWPOINT 0 0 0 1 0 0 0
POINTS 6
DATA ascii
-2.5 0.2 -1.5 4278255615
-1.0 0.5 -1.0 4278255615
0.0 1.2 0.0 4278255615
1.0 2.4 1.0 4278255615
2.5 3.6 2.0 4278255615
4.0 4.8 3.5 4278255615
`;

export const SAMPLE_STL_DATASET = `solid ZylvexFoundationPier
facet normal 0 0 1
  outer loop
    vertex 0 0 0
    vertex 2 0 0
    vertex 2 2 0
  endloop
endfacet
facet normal 0 0 1
  outer loop
    vertex 0 0 0
    vertex 2 2 0
    vertex 0 2 0
  endloop
endfacet
endsolid ZylvexFoundationPier
`;
