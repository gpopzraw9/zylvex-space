import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { 
  NIST_SHA256_TEST_VECTORS, 
  computeRawSha256Hex, 
  canonicalizeMeasurement,
  createMeasurementIntegrityRecord,
  verifyMeasurementIntegrity,
  CanonicalMeasurementPayload,
  isWebCryptoAvailable
} from '../src/utils/cryptoProvenance.ts';

describe('Checkpoint 02 — Cryptographic SHA-256 & Provenance Suite', () => {

  test('Web Crypto API availability check', () => {
    assert.equal(isWebCryptoAvailable(), true, 'Web Crypto API must be available in runtime');
  });

  test('Verify SHA-256 output against official NIST test vectors', async () => {
    for (const vector of NIST_SHA256_TEST_VECTORS) {
      const digest = await computeRawSha256Hex(vector.input);
      assert.equal(
        digest, 
        vector.expectedDigest, 
        `NIST vector failed for input "${vector.input}". Expected: ${vector.expectedDigest}, got: ${digest}`
      );
      assert.equal(digest.length, 64, 'Digest must be exactly 64 hexadecimal characters');
    }
  });

  const samplePayload: CanonicalMeasurementPayload = {
    measurementId: 'MEAS-SPAN-001',
    measurementType: 'AXIS_SPAN',
    value: 13.0,
    unit: 'METRIC_METER',
    anchorA: { x: -6.5, y: 0.4, z: 4.5 },
    anchorB: { x: 6.5, y: 0.4, z: 4.5 },
    coordinateReference: {
      system: 'LOCAL_CARTESIAN_RIGHT_HANDED',
      unit: 'METER',
      elevationAxis: 'Y_UP'
    },
    timestamp: '2026-11-06T07:00:00.000Z',
    configuration: {
      precisionDecimalPlaces: 3,
      toleranceBand: '+-0.001m'
    }
  };

  test('Deterministic canonical serialization produces identical output', () => {
    const ser1 = canonicalizeMeasurement(samplePayload);
    const ser2 = canonicalizeMeasurement({ ...samplePayload });
    assert.equal(ser1, ser2, 'Canonical serialization must be strictly deterministic');
  });

  test('Identical canonical records produce identical SHA-256 digests', async () => {
    const record1 = await createMeasurementIntegrityRecord(samplePayload);
    const record2 = await createMeasurementIntegrityRecord(samplePayload);
    assert.equal(record1.sha256Digest, record2.sha256Digest, 'Identical payloads must yield identical digests');
    assert.equal(record1.sha256Digest.length, 64, 'Digest must be 64 hex chars');
    assert.equal(record1.status, 'VERIFIED');
  });

  test('Changing measurement value changes the SHA-256 digest', async () => {
    const originalRecord = await createMeasurementIntegrityRecord(samplePayload);
    const alteredPayload = { ...samplePayload, value: 13.001 };
    const alteredRecord = await createMeasurementIntegrityRecord(alteredPayload);

    assert.notEqual(
      originalRecord.sha256Digest, 
      alteredRecord.sha256Digest, 
      'Digest must change when measurement value changes by even 1 millimeter'
    );
  });

  test('Changing coordinates changes the SHA-256 digest', async () => {
    const originalRecord = await createMeasurementIntegrityRecord(samplePayload);
    const alteredCoordsPayload = {
      ...samplePayload,
      anchorB: { x: 6.501, y: 0.4, z: 4.5 }
    };
    const alteredRecord = await createMeasurementIntegrityRecord(alteredCoordsPayload);

    assert.notEqual(
      originalRecord.sha256Digest, 
      alteredRecord.sha256Digest, 
      'Digest must change when coordinate vector shifts'
    );
  });

  test('Changing timestamp changes the SHA-256 digest', async () => {
    const originalRecord = await createMeasurementIntegrityRecord(samplePayload);
    const alteredTimePayload = {
      ...samplePayload,
      timestamp: '2026-11-06T07:01:00.000Z'
    };
    const alteredRecord = await createMeasurementIntegrityRecord(alteredTimePayload);

    assert.notEqual(
      originalRecord.sha256Digest, 
      alteredRecord.sha256Digest, 
      'Digest must change when timestamp changes'
    );
  });

  test('Integrity verification confirms untouched record as VERIFIED', async () => {
    const record = await createMeasurementIntegrityRecord(samplePayload);
    const verification = await verifyMeasurementIntegrity(record);

    assert.equal(verification.status, 'VERIFIED');
    assert.equal(verification.recalculatedDigest, record.sha256Digest);
  });

  test('Integrity verification detects tampering when measurement value is modified', async () => {
    const record = await createMeasurementIntegrityRecord(samplePayload);
    
    // Simulate malicious tampering with the in-memory value
    record.originalMeasurement.value = 14.5;
    
    const verification = await verifyMeasurementIntegrity(record);

    assert.equal(verification.status, 'TAMPER_DETECTED', 'Must detect data modification');
    assert.notEqual(verification.recalculatedDigest, record.sha256Digest);
  });

  test('Integrity verification detects tampering when coordinates are modified', async () => {
    const record = await createMeasurementIntegrityRecord(samplePayload);
    
    // Simulate malicious tampering with coordinate vector
    record.originalMeasurement.anchorA.x = -6.505;
    
    const verification = await verifyMeasurementIntegrity(record);

    assert.equal(verification.status, 'TAMPER_DETECTED', 'Must detect coordinate modification');
  });

  test('Integrity verification reports TAMPER_DETECTED if stored digest is corrupted', async () => {
    const record = await createMeasurementIntegrityRecord(samplePayload);
    
    // Corrupt stored digest
    record.sha256Digest = '0000000000000000000000000000000000000000000000000000000000000000';
    
    const verification = await verifyMeasurementIntegrity(record);

    assert.equal(verification.status, 'TAMPER_DETECTED');
  });

  test('Malformed or incomplete record handles explicitly without crashing', () => {
    assert.throws(() => {
      canonicalizeMeasurement(null as any);
    }, /non-null object/);

    assert.throws(() => {
      canonicalizeMeasurement({} as any);
    }, /measurementId/);
  });
});
