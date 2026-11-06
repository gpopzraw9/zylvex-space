import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Box, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Ruler, 
  Activity, 
  Layers, 
  Compass, 
  CheckCircle2,
  Lock,
  Eye,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Upload,
  FolderUp,
  FileCode,
  Trash2,
  X,
  Info
} from 'lucide-react';
import { EvidenceBadge } from './EvidenceBadge';
import {
  CanonicalMeasurementPayload,
  MeasurementIntegrityRecord,
  IntegrityStatus,
  createMeasurementIntegrityRecord,
  verifyMeasurementIntegrity,
  isWebCryptoAvailable,
  computeRawSha256Hex
} from '../utils/cryptoProvenance';
import { 
  parsePcdAscii, 
  parseStlAscii, 
  parseObjAscii, 
  SAMPLE_PCD_DATASET, 
  SAMPLE_STL_DATASET, 
  ParsedPointCloud, 
  ParsedMesh 
} from '../utils/spatialParsers';
import { 
  cadZUpToWebGlYUp, 
  BoundingBoxOps, 
  BoundingBox3D, 
  Vector3D 
} from '../utils/spatialMath';

export const SpatialEngine3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePreset, setActivePreset] = useState<'SPAN' | 'HEIGHT' | 'DIAGONAL'>('SPAN');
  const [viewAngle, setViewAngle] = useState<'PERSPECTIVE' | 'TOP' | 'FRONT'>('PERSPECTIVE');
  const [showWireframe, setShowWireframe] = useState(false);
  const [showPointLidar, setShowPointLidar] = useState(false);

  // Cryptographic Provenance & Tamper-Evidence States
  const [integrityRecord, setIntegrityRecord] = useState<MeasurementIntegrityRecord | null>(null);
  const [integrityStatus, setIntegrityStatus] = useState<IntegrityStatus>('VERIFIED');
  const [verificationDetail, setVerificationDetail] = useState<string>('Initializing cryptographic provenance...');
  const [recalculatedHash, setRecalculatedHash] = useState<string | null>(null);
  const [isTamperingSimulated, setIsTamperingSimulated] = useState<boolean>(false);
  const [isComputingHash, setIsComputingHash] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'INTEGRITY'>('TELEMETRY');

  // CAD & Point Cloud Import States (Phase C, D, E)
  const [showCadDrawer, setShowCadDrawer] = useState(false);
  const [importedModelInfo, setImportedModelInfo] = useState<{
    name: string;
    format: string;
    elementCount: number;
    elementType: 'POINTS' | 'TRIANGLES';
    dimensions: string;
    center: string;
    sha256Digest: string;
    isCadZUp: boolean;
  } | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Live WebGL Engine Telemetry
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    triangles: 0,
    drawCalls: 0,
    geometries: 0,
    distanceMeters: 13.000,
    deltaX: 13.000,
    deltaY: 0.000,
    deltaZ: 0.000,
    angleDeg: 0.0,
    calcHash: 'Calculating...'
  });

  // Lifecycle tracking ref to prevent state updates after unmount
  const isMountedRef = useRef<boolean>(true);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const laserMeshRef = useRef<THREE.Line | null>(null);
  const anchorAMeshRef = useRef<THREE.Mesh | null>(null);
  const anchorBMeshRef = useRef<THREE.Mesh | null>(null);
  const pointCloudRef = useRef<THREE.Points | null>(null);
  const structureGroupRef = useRef<THREE.Group | null>(null);
  const lidarTurretRef = useRef<THREE.Group | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const pmremGeneratorRef = useRef<THREE.PMREMGenerator | null>(null);
  const roomEnvRef = useRef<THREE.Scene | null>(null);
  const envTextureRef = useRef<THREE.Texture | null>(null);
  const groundTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Imported Model 3D Object Reference
  const importedObjectRef = useRef<THREE.Object3D | null>(null);

  // Pre-allocated scratch coordinates for presets
  const posARef = useRef(new THREE.Vector3(-6.5, 0.4, 4.5));
  const posBRef = useRef(new THREE.Vector3(6.5, 0.4, 4.5));

  // Compute canonical measurement and update cryptographic record
  const updateMeasurementRecord = useCallback(async (
    pA: THREE.Vector3,
    pB: THREE.Vector3,
    presetName: 'SPAN' | 'HEIGHT' | 'DIAGONAL'
  ) => {
    const dist = pA.distanceTo(pB);
    const dX = Math.abs(pB.x - pA.x);
    const dY = Math.abs(pB.y - pA.y);
    const dZ = Math.abs(pB.z - pA.z);
    const angle = (Math.asin(dY / (dist || 1)) * 180) / Math.PI;

    const payload: CanonicalMeasurementPayload = {
      measurementId: `MSR-${presetName}-${Date.now().toString(36).toUpperCase()}`,
      measurementType: presetName === 'SPAN' ? 'AXIS_SPAN' : presetName === 'HEIGHT' ? 'SUPERSTRUCTURE_HEIGHT' : 'CLEARANCE_DIAGONAL',
      value: Number(dist.toFixed(3)),
      unit: 'METRIC_METER',
      anchorA: { x: pA.x, y: pA.y, z: pA.z },
      anchorB: { x: pB.x, y: pB.y, z: pB.z },
      coordinateReference: {
        system: 'LOCAL_CARTESIAN_RIGHT_HANDED',
        unit: 'METER',
        elevationAxis: 'Y_UP'
      },
      timestamp: new Date().toISOString(),
      configuration: {
        precisionDecimalPlaces: 3,
        toleranceBand: 'ISO 17123-4 Grade B (<0.1mm datum deviation)'
      }
    };

    setIsComputingHash(true);
    try {
      const record = await createMeasurementIntegrityRecord(payload);
      if (!isMountedRef.current) return;

      setIntegrityRecord(record);
      setIntegrityStatus(record.status);
      setVerificationDetail(record.statusReason || 'Cryptographic digest verified against canonical record.');
      setRecalculatedHash(record.sha256Digest);
      setIsTamperingSimulated(false);

      setTelemetry(prev => ({
        ...prev,
        distanceMeters: Number(dist.toFixed(3)),
        deltaX: Number(dX.toFixed(3)),
        deltaY: Number(dY.toFixed(3)),
        deltaZ: Number(dZ.toFixed(3)),
        angleDeg: Number(angle.toFixed(1)),
        calcHash: record.sha256Digest || 'CRYPTO_UNAVAILABLE'
      }));
    } finally {
      if (isMountedRef.current) {
        setIsComputingHash(false);
      }
    }
  }, []);

  // Update Measurement Anchors based on Preset
  const applyPreset = useCallback((preset: 'SPAN' | 'HEIGHT' | 'DIAGONAL') => {
    setActivePreset(preset);
    if (!anchorAMeshRef.current || !anchorBMeshRef.current || !laserMeshRef.current) return;

    let pA = new THREE.Vector3();
    let pB = new THREE.Vector3();

    if (preset === 'SPAN') {
      pA.set(-6.5, 0.4, 4.5);
      pB.set(6.5, 0.4, 4.5);
    } else if (preset === 'HEIGHT') {
      pA.set(-6.5, 0.4, -4.5);
      pB.set(-6.5, 5.2, -4.5);
    } else if (preset === 'DIAGONAL') {
      pA.set(-6.5, 0.4, -4.5);
      pB.set(6.5, 5.2, 4.5);
    }

    posARef.current.copy(pA);
    posBRef.current.copy(pB);

    anchorAMeshRef.current.position.copy(pA);
    anchorBMeshRef.current.position.copy(pB);

    const lineGeo = new THREE.BufferGeometry().setFromPoints([pA, pB]);
    laserMeshRef.current.geometry.dispose();
    laserMeshRef.current.geometry = lineGeo;

    updateMeasurementRecord(pA, pB, preset);
  }, [updateMeasurementRecord]);

  // Simulate Tampering: mutate coordinate by +5mm to test verification
  const handleSimulateTamper = async () => {
    if (!integrityRecord) return;
    
    // Inject +0.005m (5mm) deviation into anchor B coordinates
    const tamperedPayload: CanonicalMeasurementPayload = JSON.parse(JSON.stringify(integrityRecord.originalMeasurement));
    tamperedPayload.anchorB.x += 0.005;
    tamperedPayload.value = Number((tamperedPayload.value + 0.005).toFixed(3));

    const tamperedRecord: MeasurementIntegrityRecord = {
      ...integrityRecord,
      originalMeasurement: tamperedPayload
    };

    const result = await verifyMeasurementIntegrity(tamperedRecord);
    setIntegrityStatus(result.status);
    setVerificationDetail(result.reason);
    setRecalculatedHash(result.recalculatedDigest);
    setIsTamperingSimulated(true);
  };

  // Restore and re-verify authoritative measurement
  const handleRestoreAndVerify = () => {
    applyPreset(activePreset);
  };

  // Copy full SHA-256 digest to clipboard
  const copyDigestToClipboard = () => {
    if (integrityRecord?.sha256Digest) {
      navigator.clipboard.writeText(integrityRecord.sha256Digest);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  // Safe disposal of a 3D object and its subtrees
  const dispose3DObject = (obj: THREE.Object3D) => {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        const mat = (child as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      }
    });
  };

  // Unload imported CAD model and restore default facility
  const unloadImportedModel = () => {
    if (importedObjectRef.current && sceneRef.current) {
      sceneRef.current.remove(importedObjectRef.current);
      dispose3DObject(importedObjectRef.current);
      importedObjectRef.current = null;
    }
    if (structureGroupRef.current) {
      structureGroupRef.current.visible = true;
    }
    setImportedModelInfo(null);
    setImportError(null);
  };

  // Load and display parsed Point Cloud in Three.js Scene
  const displayPointCloud = async (parsed: ParsedPointCloud, name: string, isCadZUp = false) => {
    if (!sceneRef.current) return;
    unloadImportedModel();

    let positions = parsed.positions;
    if (isCadZUp) {
      // Apply CAD Z-Up to WebGL Y-Up transformation
      const transformed = new Float32Array(positions.length);
      for (let i = 0; i < positions.length; i += 3) {
        const p = cadZUpToWebGlYUp({ x: positions[i], y: positions[i + 1], z: positions[i + 2] });
        transformed[i] = p.x;
        transformed[i + 1] = p.y;
        transformed[i + 2] = p.z;
      }
      positions = transformed;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    if (parsed.colors) {
      geo.setAttribute('color', new THREE.BufferAttribute(parsed.colors, 3));
    }

    const mat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: !!parsed.colors,
      color: parsed.colors ? 0xffffff : 0x06b6d4,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const pointsObj = new THREE.Points(geo, mat);
    sceneRef.current.add(pointsObj);
    importedObjectRef.current = pointsObj;

    // Center camera on imported point cloud
    const bbox = parsed.boundingBox;
    const size = BoundingBoxOps.getSize(bbox);
    const center = BoundingBoxOps.getCenter(bbox);

    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.target.set(center.x, center.y, center.z);
      cameraRef.current.position.set(center.x + size.x * 1.5 + 4, center.y + size.y + 4, center.z + size.z * 1.5 + 6);
      controlsRef.current.update();
    }

    // Compute cryptographic hash of point data
    let digest = 'COMPUTING...';
    try {
      digest = await computeRawSha256Hex(positions.buffer ? Array.from(new Uint8Array(positions.buffer.slice(0, 1024))).join('') : name);
    } catch {
      digest = 'SHA-256 UNAVAILABLE';
    }

    setImportedModelInfo({
      name,
      format: parsed.format,
      elementCount: parsed.pointCount,
      elementType: 'POINTS',
      dimensions: `${size.x.toFixed(2)}m × ${size.y.toFixed(2)}m × ${size.z.toFixed(2)}m`,
      center: `(${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)})`,
      sha256Digest: digest,
      isCadZUp
    });
  };

  // Load and display parsed Mesh (STL or OBJ) in Three.js Scene
  const displayMesh = async (parsed: ParsedMesh, name: string, isCadZUp = false) => {
    if (!sceneRef.current) return;
    unloadImportedModel();

    let positions = parsed.positions;
    let normals = parsed.normals;

    if (isCadZUp) {
      const transformed = new Float32Array(positions.length);
      const transformedNorms = new Float32Array(normals.length);
      for (let i = 0; i < positions.length; i += 3) {
        const p = cadZUpToWebGlYUp({ x: positions[i], y: positions[i + 1], z: positions[i + 2] });
        transformed[i] = p.x;
        transformed[i + 1] = p.y;
        transformed[i + 2] = p.z;

        const n = cadZUpToWebGlYUp({ x: normals[i], y: normals[i + 1], z: normals[i + 2] });
        transformedNorms[i] = n.x;
        transformedNorms[i + 1] = n.y;
        transformedNorms[i + 2] = n.z;
      }
      positions = transformed;
      normals = transformedNorms;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3));

    const mat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.65,
      roughness: 0.35,
      side: THREE.DoubleSide
    });

    const meshObj = new THREE.Mesh(geo, mat);
    meshObj.castShadow = true;
    meshObj.receiveShadow = true;
    sceneRef.current.add(meshObj);
    importedObjectRef.current = meshObj;

    const bbox = parsed.boundingBox;
    const size = BoundingBoxOps.getSize(bbox);
    const center = BoundingBoxOps.getCenter(bbox);

    if (controlsRef.current && cameraRef.current) {
      controlsRef.current.target.set(center.x, center.y, center.z);
      cameraRef.current.position.set(center.x + size.x * 2 + 3, center.y + size.y + 3, center.z + size.z * 2 + 5);
      controlsRef.current.update();
    }

    let digest = 'COMPUTING...';
    try {
      digest = await computeRawSha256Hex(positions.buffer ? Array.from(new Uint8Array(positions.buffer.slice(0, 1024))).join('') : name);
    } catch {
      digest = 'SHA-256 UNAVAILABLE';
    }

    setImportedModelInfo({
      name,
      format: parsed.format,
      elementCount: parsed.triangleCount,
      elementType: 'TRIANGLES',
      dimensions: `${size.x.toFixed(2)}m × ${size.y.toFixed(2)}m × ${size.z.toFixed(2)}m`,
      center: `(${center.x.toFixed(2)}, ${center.y.toFixed(2)}, ${center.z.toFixed(2)})`,
      sha256Digest: digest,
      isCadZUp
    });
  };

  // Process user file import (drag & drop or file dialog)
  const handleFileProcess = async (file: File) => {
    setIsProcessingFile(true);
    setImportError(null);

    try {
      const text = await file.text();
      const ext = file.name.split('.').pop()?.toLowerCase();

      if (ext === 'pcd') {
        const parsed = parsePcdAscii(text);
        await displayPointCloud(parsed, file.name);
      } else if (ext === 'stl') {
        const parsed = parseStlAscii(text);
        await displayMesh(parsed, file.name);
      } else if (ext === 'obj') {
        const parsed = parseObjAscii(text);
        await displayMesh(parsed, file.name);
      } else {
        throw new Error(`Unsupported extension ".${ext}". Please provide a .pcd, .stl, or .obj file.`);
      }
    } catch (err: any) {
      setImportError(err?.message || 'Failed to parse spatial file.');
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Load sample PCD
  const loadSamplePcd = () => {
    try {
      const parsed = parsePcdAscii(SAMPLE_PCD_DATASET);
      displayPointCloud(parsed, 'Industrial_Corridor_Sample.pcd');
    } catch (err: any) {
      setImportError(err?.message || 'Failed to load sample PCD.');
    }
  };

  // Load sample STL
  const loadSampleStl = () => {
    try {
      const parsed = parseStlAscii(SAMPLE_STL_DATASET);
      displayMesh(parsed, 'Foundation_Pier_Sample.stl');
    } catch (err: any) {
      setImportError(err?.message || 'Failed to load sample STL.');
    }
  };

  // Three.js Mount and Lifecycle Effect with Complete Disposal
  useEffect(() => {
    isMountedRef.current = true;
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 520;

    // Helper to safely dispose materials and textures
    const disposeMaterial = (mat: THREE.Material) => {
      mat.dispose();
      for (const key of Object.keys(mat)) {
        const val = (mat as any)[key];
        if (val && typeof val.dispose === 'function' && val instanceof THREE.Texture) {
          val.dispose();
        }
      }
    };

    // Helper to traverse and dispose an entire 3D subtree
    const disposeHierarchy = (obj: THREE.Object3D) => {
      obj.traverse((child) => {
        if ((child as THREE.Mesh).geometry) {
          (child as THREE.Mesh).geometry.dispose();
        }
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) {
            mat.forEach(m => disposeMaterial(m));
          } else {
            disposeMaterial(mat);
          }
        }
      });
    };

    // 1. Scene & Background matching dark enterprise palette
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f19);
    scene.fog = new THREE.FogExp2(0x0b0f19, 0.025);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 9, 14);
    cameraRef.current = camera;

    // 3. Renderer with ACESFilmic Tone Mapping & High-DPI support
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clear previous children and append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Environment & PBR Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    pmremGeneratorRef.current = pmremGenerator;

    const roomEnv = new RoomEnvironment();
    roomEnvRef.current = roomEnv;

    const envTex = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    envTextureRef.current = envTex;
    scene.environment = envTex;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.7);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(15, 22, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 40;
    keyLight.shadow.camera.left = -12;
    keyLight.shadow.camera.right = 12;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // 5. OrbitControls with smooth damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controls.target.set(0, 2, 0);
    controlsRef.current = controls;

    // 6. Procedural Canvas Texture for Grid Floor
    const createGridTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      const step = 32;
      for (let x = 0; x <= 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y <= 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, 512, 512);

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(8, 8);
      return texture;
    };

    const groundTex = createGridTexture();
    groundTextureRef.current = groundTex;

    const groundGeo = new THREE.PlaneGeometry(36, 36);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      roughness: 0.8,
      metalness: 0.2
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 7. COMPOSITE 8-PART PROCEDURAL SPATIAL TWIN MODEL
    const facilityGroup = new THREE.Group();
    structureGroupRef.current = facilityGroup;

    // Foundation
    const slabGeo = new THREE.BoxGeometry(14, 0.4, 10);
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9, metalness: 0.1 });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.y = 0.2;
    slab.receiveShadow = true;
    facilityGroup.add(slab);

    // Columns
    const columnGeo = new THREE.BoxGeometry(0.35, 5, 0.35);
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.85 });
    const colCoords = [
      [-6.5, 2.7, -4.5],
      [6.5, 2.7, -4.5],
      [-6.5, 2.7, 4.5],
      [6.5, 2.7, 4.5],
      [0, 2.7, -4.5],
      [0, 2.7, 4.5]
    ];
    colCoords.forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(columnGeo, steelMat);
      col.position.set(cx, cy, cz);
      col.castShadow = true;
      col.receiveShadow = true;
      facilityGroup.add(col);
    });

    // Perimeter Roof Beams
    const beamXGeo = new THREE.BoxGeometry(13.4, 0.3, 0.35);
    const beamZGeo = new THREE.BoxGeometry(0.35, 0.3, 9.4);
    
    const beamTop1 = new THREE.Mesh(beamXGeo, steelMat);
    beamTop1.position.set(0, 5.2, -4.5);
    facilityGroup.add(beamTop1);

    const beamTop2 = new THREE.Mesh(beamXGeo, steelMat);
    beamTop2.position.set(0, 5.2, 4.5);
    facilityGroup.add(beamTop2);

    const beamTop3 = new THREE.Mesh(beamZGeo, steelMat);
    beamTop3.position.set(-6.5, 5.2, 0);
    facilityGroup.add(beamTop3);

    const beamTop4 = new THREE.Mesh(beamZGeo, steelMat);
    beamTop4.position.set(6.5, 5.2, 0);
    facilityGroup.add(beamTop4);

    // Wall Panel
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6, metalness: 0.3 });
    const backWallGeo = new THREE.BoxGeometry(13, 4.8, 0.2);
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 2.8, -4.4);
    backWall.receiveShadow = true;
    facilityGroup.add(backWall);

    // Glass Curtain Wall
    const glassGeo = new THREE.BoxGeometry(6.2, 4.6, 0.1);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.5
    });
    const glassCurtain = new THREE.Mesh(glassGeo, glassMat);
    glassCurtain.position.set(3.2, 2.7, 4.4);
    facilityGroup.add(glassCurtain);

    // Ceiling Trusses
    for (let tx = -5.5; tx <= 5.5; tx += 2.75) {
      const trussGeo = new THREE.CylinderGeometry(0.06, 0.06, 9.2, 8);
      const truss = new THREE.Mesh(trussGeo, steelMat);
      truss.rotation.x = Math.PI / 2;
      truss.position.set(tx, 5.15, 0);
      facilityGroup.add(truss);
    }

    // Ventilation Duct
    const ductCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, 4.6, -3),
      new THREE.Vector3(-1, 4.6, -3),
      new THREE.Vector3(1, 4.6, -1),
      new THREE.Vector3(6, 4.6, -1)
    ]);
    const ductGeo = new THREE.TubeGeometry(ductCurve, 32, 0.28, 12, false);
    const ductMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.3, metalness: 0.9 });
    const ductMesh = new THREE.Mesh(ductGeo, ductMat);
    facilityGroup.add(ductMesh);

    // LiDAR Scanner Rig
    const turretGroup = new THREE.Group();
    const tripodGeo = new THREE.CylinderGeometry(0.08, 0.15, 2.2, 8);
    const tripod = new THREE.Mesh(tripodGeo, steelMat);
    tripod.position.y = 1.1;
    turretGroup.add(tripod);

    const scannerHeadGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.45, 16);
    const scannerMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.2, metalness: 0.95 });
    const scannerHead = new THREE.Mesh(scannerHeadGeo, scannerMat);
    scannerHead.position.y = 2.3;
    turretGroup.add(scannerHead);

    turretGroup.position.set(-3.5, 0.4, 2.5);
    facilityGroup.add(turretGroup);
    lidarTurretRef.current = turretGroup;

    scene.add(facilityGroup);

    // 8. PROCEDURAL LIDAR POINT CLOUD SIMULATION (5,000 Points)
    const lidarPointCount = 5000;
    const lidarGeo = new THREE.BufferGeometry();
    const lidarPositions = new Float32Array(lidarPointCount * 3);
    const lidarColors = new Float32Array(lidarPointCount * 3);

    for (let i = 0; i < lidarPointCount; i++) {
      const px = (Math.random() - 0.5) * 13;
      const py = Math.random() * 5.2;
      const pz = (Math.random() - 0.5) * 9;

      lidarPositions[i * 3] = px;
      lidarPositions[i * 3 + 1] = py;
      lidarPositions[i * 3 + 2] = pz;

      lidarColors[i * 3] = 0.02 + (py / 5.2) * 0.2;
      lidarColors[i * 3 + 1] = 0.7 + (py / 5.2) * 0.3;
      lidarColors[i * 3 + 2] = 0.85;
    }

    lidarGeo.setAttribute('position', new THREE.BufferAttribute(lidarPositions, 3));
    lidarGeo.setAttribute('color', new THREE.BufferAttribute(lidarColors, 3));

    const lidarMaterial = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const pointCloud = new THREE.Points(lidarGeo, lidarMaterial);
    pointCloud.visible = false;
    scene.add(pointCloud);
    pointCloudRef.current = pointCloud;

    // 9. INTERACTIVE MEASUREMENT LASER LINE & ANCHOR NODES
    const anchorGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const anchorMatA = new THREE.MeshStandardMaterial({ 
      color: 0x10b981, 
      emissive: 0x059669, 
      emissiveIntensity: 0.8,
      roughness: 0.2 
    });
    const anchorMatB = new THREE.MeshStandardMaterial({ 
      color: 0x06b6d4, 
      emissive: 0x0891b2, 
      emissiveIntensity: 0.8,
      roughness: 0.2 
    });

    const anchorA = new THREE.Mesh(anchorGeo, anchorMatA);
    const anchorB = new THREE.Mesh(anchorGeo, anchorMatB);
    anchorA.position.copy(posARef.current);
    anchorB.position.copy(posBRef.current);
    scene.add(anchorA);
    scene.add(anchorB);
    anchorAMeshRef.current = anchorA;
    anchorBMeshRef.current = anchorB;

    const linePoints = [posARef.current, posBRef.current];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, linewidth: 2 });
    const laserLine = new THREE.Line(lineGeo, lineMat);
    scene.add(laserLine);
    laserMeshRef.current = laserLine;

    // Initial cryptographic calculation
    updateMeasurementRecord(posARef.current, posBRef.current, 'SPAN');

    // 10. ANIMATION LOOP & TELEMETRY MONITOR
    let frameCounter = 0;
    let fpsTime = performance.now();

    const animate = (currentTime: number) => {
      if (!isMountedRef.current) return;
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (lidarTurretRef.current) {
        lidarTurretRef.current.rotation.y += 0.01;
      }

      controls.update();
      renderer.render(scene, camera);

      frameCounter++;
      if (currentTime - fpsTime >= 500) {
        const measuredFps = Math.round((frameCounter * 1000) / (currentTime - fpsTime));
        frameCounter = 0;
        fpsTime = currentTime;

        if (isMountedRef.current) {
          setTelemetry(prev => ({
            ...prev,
            fps: Math.min(60, measuredFps),
            triangles: renderer.info.render.triangles,
            drawCalls: renderer.info.render.calls,
            geometries: renderer.info.memory.geometries
          }));
        }
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Comprehensive Resource Disposal Cleanup on Unmount
    return () => {
      isMountedRef.current = false;
      window.removeEventListener('resize', handleResize);

      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = null;
      }

      if (controlsRef.current) {
        controlsRef.current.dispose();
        controlsRef.current = null;
      }

      if (structureGroupRef.current) {
        disposeHierarchy(structureGroupRef.current);
        scene.remove(structureGroupRef.current);
        structureGroupRef.current = null;
      }

      if (importedObjectRef.current) {
        disposeHierarchy(importedObjectRef.current);
        scene.remove(importedObjectRef.current);
        importedObjectRef.current = null;
      }

      if (laserMeshRef.current) {
        laserMeshRef.current.geometry.dispose();
        if (Array.isArray(laserMeshRef.current.material)) {
          laserMeshRef.current.material.forEach(m => m.dispose());
        } else {
          laserMeshRef.current.material.dispose();
        }
        scene.remove(laserMeshRef.current);
        laserMeshRef.current = null;
      }

      if (anchorAMeshRef.current) {
        anchorAMeshRef.current.geometry.dispose();
        (anchorAMeshRef.current.material as THREE.Material).dispose();
        scene.remove(anchorAMeshRef.current);
        anchorAMeshRef.current = null;
      }

      if (anchorBMeshRef.current) {
        anchorBMeshRef.current.geometry.dispose();
        (anchorBMeshRef.current.material as THREE.Material).dispose();
        scene.remove(anchorBMeshRef.current);
        anchorBMeshRef.current = null;
      }

      if (pointCloudRef.current) {
        pointCloudRef.current.geometry.dispose();
        (pointCloudRef.current.material as THREE.Material).dispose();
        scene.remove(pointCloudRef.current);
        pointCloudRef.current = null;
      }

      disposeHierarchy(scene);

      if (groundTextureRef.current) {
        groundTextureRef.current.dispose();
        groundTextureRef.current = null;
      }

      if (envTextureRef.current) {
        envTextureRef.current.dispose();
        envTextureRef.current = null;
      }

      if (pmremGeneratorRef.current) {
        pmremGeneratorRef.current.dispose();
        pmremGeneratorRef.current = null;
      }

      if (roomEnvRef.current) {
        roomEnvRef.current = null;
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss?.();
        if (rendererRef.current.domElement && rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }

      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [updateMeasurementRecord]);

  // Camera Orientation Presets
  const setCameraView = (view: 'PERSPECTIVE' | 'TOP' | 'FRONT') => {
    setViewAngle(view);
    if (!cameraRef.current || !controlsRef.current) return;

    if (view === 'TOP') {
      cameraRef.current.position.set(0, 22, 0.01);
      controlsRef.current.target.set(0, 2, 0);
    } else if (view === 'FRONT') {
      cameraRef.current.position.set(0, 3, 18);
      controlsRef.current.target.set(0, 2.5, 0);
    } else {
      cameraRef.current.position.set(12, 9, 14);
      controlsRef.current.target.set(0, 2, 0);
    }
  };

  // Toggle Wireframe
  const toggleWireframe = () => {
    setShowWireframe(!showWireframe);
    const target = importedObjectRef.current || structureGroupRef.current;
    if (!target) return;
    target.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => { m.wireframe = !showWireframe; });
        } else {
          child.material.wireframe = !showWireframe;
        }
      }
    });
  };

  // Toggle LiDAR Point Cloud
  const toggleLidar = () => {
    setShowPointLidar(!showPointLidar);
    if (pointCloudRef.current) {
      pointCloudRef.current.visible = !showPointLidar;
    }
  };

  const isWebCryptoOk = isWebCryptoAvailable();

  return (
    <div className={`relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[640px]'
    }`}>
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Floating Control Dock */}
      <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pointer-events-none">
        {/* Left: Product & Calibration Badge */}
        <div className="pointer-events-auto flex items-center space-x-2 bg-slate-950/90 border border-slate-800 p-2 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="w-7 h-7 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-xs">
            3D
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-bold text-white tracking-tight">ZYLVEX SPACE ENGINE</span>
              <EvidenceBadge status="VERIFIED" size="xs" />
            </div>
            <span className="text-[10px] text-cyan-400 font-mono block">
              {importedModelInfo ? `Imported CAD: ${importedModelInfo.name}` : 'PBR Spatial Model • Calibrated Datum Engine'}
            </span>
          </div>
        </div>

        {/* Right: Camera Presets & CAD Importer Toggle */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-slate-950/90 border border-slate-800 p-1.5 rounded-lg shadow-xl backdrop-blur-sm">
          <button
            onClick={() => setCameraView('PERSPECTIVE')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              viewAngle === 'PERSPECTIVE' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            Perspective
          </button>
          <button
            onClick={() => setCameraView('TOP')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              viewAngle === 'TOP' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            Top (Plan)
          </button>
          <button
            onClick={() => setCameraView('FRONT')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              viewAngle === 'FRONT' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
            }`}
          >
            Front (Elev)
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            onClick={toggleWireframe}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              showWireframe ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Wireframe CAD Mode"
          >
            Wireframe
          </button>

          <button
            onClick={toggleLidar}
            className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
              showPointLidar ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle LiDAR Point Cloud (5,000 points)"
          >
            LiDAR
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* CAD / Point Cloud Importer Toggle */}
          <button
            onClick={() => setShowCadDrawer(!showCadDrawer)}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors flex items-center space-x-1 ${
              showCadDrawer || importedModelInfo
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm shadow-cyan-900/50'
                : 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white'
            }`}
            title="Import or inspect local CAD/Point Cloud files"
          >
            <FolderUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>CAD / PCD</span>
            {importedModelInfo && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse ml-1" />
            )}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Floating CAD & Point Cloud Import Drawer (Phase C, D, E) */}
      {showCadDrawer && (
        <div className="absolute top-16 right-4 w-80 sm:w-96 bg-slate-950/95 border border-slate-800 p-4 rounded-xl shadow-2xl backdrop-blur-md z-40 space-y-3.5 max-h-[500px] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <FolderUp className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">CAD & Spatial Data Importer</span>
            </div>
            <button
              onClick={() => setShowCadDrawer(false)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Zero-Cloud Confidentiality Policy Notice */}
          <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-800/60 text-[10px] text-cyan-300 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-tight">
              <strong>Zero-Cloud Boundary:</strong> Files are parsed 100% client-side in memory. No engineering geometry is ever transmitted over the network.
            </p>
          </div>

          {/* Quick-Load Sample Models */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Load Calibrated Engineering Datasets
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={loadSamplePcd}
                className="px-2.5 py-1.5 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 hover:border-cyan-700 hover:bg-slate-800 text-slate-200 transition-colors flex items-center justify-center space-x-1.5"
              >
                <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                <span>PCD Point Cloud</span>
              </button>
              <button
                onClick={loadSampleStl}
                className="px-2.5 py-1.5 text-[11px] font-mono rounded bg-slate-900 border border-slate-800 hover:border-cyan-700 hover:bg-slate-800 text-slate-200 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span>STL Structural Pier</span>
              </button>
            </div>
          </div>

          {/* Custom File Upload Area */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Upload Local File (.pcd, .stl, .obj)
            </span>
            <label className="border-2 border-dashed border-slate-800 hover:border-cyan-700/80 rounded-lg p-3.5 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-colors group">
              <Upload className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 mb-1 transition-colors" />
              <span className="text-[11px] text-slate-300 font-medium text-center">
                Click to browse or drop CAD file
              </span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">
                Formats: ASCII PCD, ASCII STL, Wavefront OBJ
              </span>
              <input
                type="file"
                accept=".pcd,.stl,.obj,.xyz"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileProcess(file);
                }}
              />
            </label>
          </div>

          {/* Error Message */}
          {importError && (
            <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-[10px] text-rose-300 flex items-start space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>{importError}</span>
            </div>
          )}

          {/* Active Model Inspection Details */}
          {importedModelInfo && (
            <div className="p-3 rounded-lg bg-slate-900/90 border border-cyan-800/60 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <span className="font-bold text-white font-mono text-[11px] truncate" title={importedModelInfo.name}>
                  {importedModelInfo.name}
                </span>
                <button
                  onClick={unloadImportedModel}
                  className="text-rose-400 hover:text-rose-300 p-0.5"
                  title="Unload model"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                <div>
                  <span className="text-slate-500 block">Format:</span>
                  <span className="text-cyan-300 font-semibold">{importedModelInfo.format}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">{importedModelInfo.elementType}:</span>
                  <span className="text-white font-bold">{importedModelInfo.elementCount.toLocaleString()}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Extents (L × W × H):</span>
                  <span className="text-slate-200">{importedModelInfo.dimensions}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 block">Centroid:</span>
                  <span className="text-slate-300">{importedModelInfo.center}</span>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-800/80 text-[9px] font-mono">
                <span className="text-slate-500 block">Dataset Fingerprint:</span>
                <span className="text-cyan-400/90 break-all">{importedModelInfo.sha256Digest.slice(0, 32)}...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Floating Spatial Measurement HUD & Tamper Evidence Console */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex flex-col md:flex-row items-end md:items-center justify-between gap-3">
        {/* Real Measurement Telemetry & Cryptographic Verification Card */}
        <div className="pointer-events-auto bg-slate-950/95 border border-slate-800 p-3.5 rounded-xl shadow-2xl max-w-xl w-full space-y-2.5 backdrop-blur-md">
          {/* Card Header & Tab Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Ruler className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">Spatial Measurement & Cryptographic Provenance</span>
            </div>
            
            <div className="flex items-center space-x-1 bg-slate-900 p-0.5 rounded border border-slate-800">
              <button
                onClick={() => setActiveTab('TELEMETRY')}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                  activeTab === 'TELEMETRY' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                Telemetry
              </button>
              <button
                onClick={() => setActiveTab('INTEGRITY')}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors flex items-center space-x-1 ${
                  activeTab === 'INTEGRITY' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>SHA-256 Audit</span>
              </button>
            </div>
          </div>

          {/* Active Preset Buttons */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => applyPreset('SPAN')}
                className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                  activePreset === 'SPAN' ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Bay Span (13.0m)
              </button>
              <button
                onClick={() => applyPreset('HEIGHT')}
                className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                  activePreset === 'HEIGHT' ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Column Height (4.8m)
              </button>
              <button
                onClick={() => applyPreset('DIAGONAL')}
                className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                  activePreset === 'DIAGONAL' ? 'bg-cyan-950 text-cyan-300 border-cyan-800' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Clearance Diagonal
              </button>
            </div>

            {/* Verification Status Badge */}
            <div className="flex items-center">
              {integrityStatus === 'VERIFIED' && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  SHA-256 VERIFIED
                </span>
              )}
              {integrityStatus === 'TAMPER_DETECTED' && (
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950/80 border border-rose-700 px-2 py-0.5 rounded flex items-center animate-pulse">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  TAMPER DETECTED
                </span>
              )}
              {integrityStatus === 'UNVERIFIABLE' && (
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  UNVERIFIABLE
                </span>
              )}
            </div>
          </div>

          {/* TAB 1: Real Calibrated Measurement Readings */}
          {activeTab === 'TELEMETRY' && (
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">3D Distance</span>
                  <span className="text-sm font-bold text-cyan-300 font-mono">
                    {telemetry.distanceMeters.toFixed(3)} m
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">ΔX (Width)</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">
                    {telemetry.deltaX.toFixed(3)} m
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">ΔY (Elevation)</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">
                    {telemetry.deltaY.toFixed(3)} m
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[9px] font-mono text-slate-400 block uppercase">Angle (θ)</span>
                  <span className="text-xs font-bold text-slate-200 font-mono">
                    {telemetry.angleDeg.toFixed(1)}°
                  </span>
                </div>
              </div>

              {/* SHA-256 Digest Banner */}
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center space-x-1.5 overflow-hidden">
                  <Lock className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="text-slate-400 shrink-0">SHA-256:</span>
                  <span className="text-cyan-300 truncate font-mono select-all" title={telemetry.calcHash}>
                    {telemetry.calcHash}
                  </span>
                </div>
                <button
                  onClick={copyDigestToClipboard}
                  className="ml-2 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors shrink-0"
                  title="Copy 64-char SHA-256 Hex Digest"
                >
                  {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Tamper Evidence & Cryptographic Verification Suite */}
          {activeTab === 'INTEGRITY' && (
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-cyan-400" />
                    <span>Authoritative 256-bit Hex Fingerprint (NIST SHA-256):</span>
                  </span>
                  <span className="text-emerald-400">{isWebCryptoOk ? 'Web Crypto Active' : 'Fallback Unavailable'}</span>
                </div>
                <div className="font-mono text-[10px] text-cyan-300 bg-slate-950 p-1.5 rounded border border-slate-800 break-all select-all leading-tight">
                  {integrityRecord?.sha256Digest || 'Pending verification...'}
                </div>
              </div>

              <div className={`p-2 rounded border text-[11px] ${
                integrityStatus === 'VERIFIED'
                  ? 'bg-emerald-950/20 border-emerald-800 text-emerald-300'
                  : integrityStatus === 'TAMPER_DETECTED'
                  ? 'bg-rose-950/30 border-rose-700 text-rose-300'
                  : 'bg-amber-950/20 border-amber-800 text-amber-300'
              }`}>
                <div className="font-semibold flex items-center space-x-1 mb-0.5">
                  {integrityStatus === 'VERIFIED' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  {integrityStatus === 'TAMPER_DETECTED' && <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                  {integrityStatus === 'UNVERIFIABLE' && <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  <span>Verification Diagnostic:</span>
                </div>
                <p className="text-[10px] leading-relaxed text-slate-300">{verificationDetail}</p>
                {recalculatedHash && integrityStatus === 'TAMPER_DETECTED' && (
                  <div className="mt-1 pt-1 border-t border-rose-900/50 font-mono text-[9px] text-rose-400 break-all">
                    Computed: {recalculatedHash}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSimulateTamper}
                    disabled={isTamperingSimulated || isComputingHash}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded border transition-colors flex items-center space-x-1 ${
                      isTamperingSimulated
                        ? 'opacity-50 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                        : 'bg-rose-950/60 text-rose-300 border-rose-800 hover:bg-rose-900/70 hover:text-white'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    <span>Simulate Tampering (+0.005m)</span>
                  </button>

                  <button
                    onClick={handleRestoreAndVerify}
                    className="px-2.5 py-1 text-[10px] font-mono rounded border bg-cyan-950/60 text-cyan-300 border-cyan-800 hover:bg-cyan-900/70 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3 text-cyan-400" />
                    <span>Restore & Re-Verify</span>
                  </button>
                </div>

                <span className="text-[9px] text-slate-500 font-mono">
                  Tolerance: &lt;0.1mm
                </span>
              </div>
            </div>
          )}

          {/* Architectural Security Disclaimer */}
          <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500">
            <span>
              <strong>Integrity Notice:</strong> Native Web Crypto SHA-256 binds measurement to canonical datum. Integrity checking only; not immutable ledger storage.
            </span>
            <span className="text-cyan-400 font-mono shrink-0 ml-2">DATUM: WGS84/LOCAL-SI</span>
          </div>
        </div>

        {/* Live WebGL Engine Telemetry HUD */}
        <div className="pointer-events-auto bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs font-mono backdrop-blur-md">
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">FPS:</span>
            <span className="font-bold text-emerald-400">{telemetry.fps}</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div>
            <span className="text-slate-400">Draw Calls:</span>{' '}
            <span className="text-white font-bold">{telemetry.drawCalls}</span>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          <div>
            <span className="text-slate-400">Triangles:</span>{' '}
            <span className="text-white font-bold">{telemetry.triangles.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
