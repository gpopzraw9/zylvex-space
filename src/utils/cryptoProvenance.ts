/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ZYLVEX SPACE — Cryptographic Measurement Provenance & Tamper-Evidence Engine
 * Checkpoint 02 Remediation
 * 
 * Implements genuine Web Crypto SHA-256 hashing and deterministic canonical record verification.
 * 
 * SECURITY NOTICE:
 * A SHA-256 digest provides integrity checking by binding measurement data to a cryptographic
 * fingerprint. It does NOT provide immutable storage, non-repudiation, or regulatory-grade audit
 * protection on its own without independent key management or an immutable ledger.
 */

export type MeasurementType = 
  | 'EUCLIDEAN_DISTANCE_3D' 
  | 'AXIS_SPAN' 
  | 'SUPERSTRUCTURE_HEIGHT' 
  | 'CLEARANCE_DIAGONAL' 
  | 'CUSTOM_DATUM_SPAN';

export interface SpatialVector3D {
  x: number;
  y: number;
  z: number;
}

export interface CanonicalMeasurementPayload {
  measurementId: string;
  measurementType: MeasurementType;
  value: number; // Stored in Metric Meters
  unit: 'METRIC_METER';
  anchorA: SpatialVector3D;
  anchorB: SpatialVector3D;
  coordinateReference: {
    system: 'LOCAL_CARTESIAN_RIGHT_HANDED';
    unit: 'METER';
    elevationAxis: 'Y_UP';
  };
  timestamp: string; // ISO-8601 UTC string
  configuration: {
    precisionDecimalPlaces: number;
    toleranceBand: string;
  };
}

export type IntegrityStatus = 'VERIFIED' | 'TAMPER_DETECTED' | 'UNVERIFIABLE';

export interface MeasurementIntegrityRecord {
  recordId: string;
  originalMeasurement: CanonicalMeasurementPayload;
  serializedCanonicalPayload: string;
  sha256Digest: string; // 64 lowercase hexadecimal characters
  status: IntegrityStatus;
  verifiedAt: string;
  statusReason?: string;
}

/**
 * Standard NIST SHA-256 test vectors for verification.
 */
export const NIST_SHA256_TEST_VECTORS = [
  {
    input: '',
    expectedDigest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    input: 'abc',
    expectedDigest: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  },
  {
    input: 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
    expectedDigest: '248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1'
  }
];

/**
 * Checks whether native Web Crypto API is available in the current runtime environment.
 */
export function isWebCryptoAvailable(): boolean {
  return typeof globalThis !== 'undefined' && 
         Boolean(globalThis.crypto?.subtle && typeof globalThis.crypto.subtle.digest === 'function');
}

/**
 * Helper to format coordinate numbers to a fixed 6 decimal places.
 * Eliminates platform-dependent floating point string representation variances.
 */
function formatFloat(val: number): string {
  if (typeof val !== 'number' || isNaN(val) || !isFinite(val)) {
    throw new Error(`Invalid floating point coordinate value: ${val}`);
  }
  // Convert -0 to +0
  const normalized = Object.is(val, -0) ? 0 : val;
  return normalized.toFixed(6);
}

/**
 * Produces a deterministic, canonical JSON-style string representation of a measurement payload.
 * Field ordering is strictly fixed to prevent whitespace or key-order hash variance.
 */
export function canonicalizeMeasurement(payload: CanonicalMeasurementPayload): string {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Measurement payload must be a non-null object');
  }

  if (!payload.measurementId || typeof payload.measurementId !== 'string') {
    throw new Error('Payload must contain a valid measurementId string');
  }

  // Canonical field order definition
  const canonicalParts = [
    `"measurementId":"${payload.measurementId}"`,
    `"measurementType":"${payload.measurementType}"`,
    `"value":${formatFloat(payload.value)}`,
    `"unit":"${payload.unit}"`,
    `"anchorA":{"x":${formatFloat(payload.anchorA.x)},"y":${formatFloat(payload.anchorA.y)},"z":${formatFloat(payload.anchorA.z)}}`,
    `"anchorB":{"x":${formatFloat(payload.anchorB.x)},"y":${formatFloat(payload.anchorB.y)},"z":${formatFloat(payload.anchorB.z)}}`,
    `"coordinateReference":{"elevationAxis":"${payload.coordinateReference.elevationAxis}","system":"${payload.coordinateReference.system}","unit":"${payload.coordinateReference.unit}"}`,
    `"timestamp":"${payload.timestamp}"`,
    `"configuration":{"precisionDecimalPlaces":${payload.configuration.precisionDecimalPlaces},"toleranceBand":"${payload.configuration.toleranceBand}"}`
  ];

  return `{${canonicalParts.join(',')}}`;
}

/**
 * Computes a genuine 256-bit SHA-256 cryptographic digest of a UTF-8 string.
 * Returns exactly 64 lowercase hexadecimal characters.
 * 
 * If Web Crypto is unavailable, throws an explicit Error. Never falls back to a weak hash.
 */
export async function computeRawSha256Hex(utf8String: string): Promise<string> {
  if (!isWebCryptoAvailable()) {
    throw new Error('Web Crypto API (crypto.subtle.digest) is unavailable in this environment');
  }

  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(utf8String);
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', dataBuffer);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexDigest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  if (hexDigest.length !== 64) {
    throw new Error(`Invalid SHA-256 digest length: expected 64 characters, got ${hexDigest.length}`);
  }

  return hexDigest;
}

/**
 * Creates a complete tamper-evident measurement record bound to its genuine SHA-256 digest.
 */
export async function createMeasurementIntegrityRecord(
  payload: CanonicalMeasurementPayload
): Promise<MeasurementIntegrityRecord> {
  const serialized = canonicalizeMeasurement(payload);
  const recordId = `REC-${payload.measurementId}-${Date.now().toString(36).toUpperCase()}`;

  try {
    const digest = await computeRawSha256Hex(serialized);
    return {
      recordId,
      originalMeasurement: JSON.parse(JSON.stringify(payload)), // Deep clone
      serializedCanonicalPayload: serialized,
      sha256Digest: digest,
      status: 'VERIFIED',
      verifiedAt: new Date().toISOString(),
      statusReason: 'Cryptographic digest computed and verified against canonical record.'
    };
  } catch (err: any) {
    return {
      recordId,
      originalMeasurement: JSON.parse(JSON.stringify(payload)),
      serializedCanonicalPayload: serialized,
      sha256Digest: '',
      status: 'UNVERIFIABLE',
      verifiedAt: new Date().toISOString(),
      statusReason: `Cryptographic engine unavailable: ${err?.message || 'Unknown error'}`
    };
  }
}

/**
 * Verifies the integrity of a measurement record by recalculating the SHA-256 digest
 * from its canonical payload and comparing it with the stored digest.
 */
export async function verifyMeasurementIntegrity(
  record: MeasurementIntegrityRecord
): Promise<{
  status: IntegrityStatus;
  recalculatedDigest: string | null;
  storedDigest: string;
  reason: string;
}> {
  if (!isWebCryptoAvailable()) {
    return {
      status: 'UNVERIFIABLE',
      recalculatedDigest: null,
      storedDigest: record.sha256Digest,
      reason: 'Web Crypto API (crypto.subtle) is unavailable; verification cannot proceed.'
    };
  }

  if (!record.sha256Digest || record.sha256Digest.length !== 64) {
    return {
      status: 'TAMPER_DETECTED',
      recalculatedDigest: null,
      storedDigest: record.sha256Digest,
      reason: 'Stored record does not contain a valid 64-character SHA-256 digest.'
    };
  }

  try {
    const freshlySerialized = canonicalizeMeasurement(record.originalMeasurement);
    const freshlyComputed = await computeRawSha256Hex(freshlySerialized);

    if (freshlyComputed === record.sha256Digest) {
      return {
        status: 'VERIFIED',
        recalculatedDigest: freshlyComputed,
        storedDigest: record.sha256Digest,
        reason: 'Recalculated SHA-256 digest matches stored digest bit-for-bit.'
      };
    } else {
      return {
        status: 'TAMPER_DETECTED',
        recalculatedDigest: freshlyComputed,
        storedDigest: record.sha256Digest,
        reason: `Cryptographic digest mismatch detected. Computed: ${freshlyComputed.slice(0, 16)}... != Stored: ${record.sha256Digest.slice(0, 16)}...`
      };
    }
  } catch (err: any) {
    return {
      status: 'TAMPER_DETECTED',
      recalculatedDigest: null,
      storedDigest: record.sha256Digest,
      reason: `Integrity check failed during canonical serialization: ${err?.message || 'Data corruption'}`
    };
  }
}
