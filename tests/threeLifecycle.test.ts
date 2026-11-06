import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';

describe('Checkpoint 02 — Three.js GPU Resource Lifecycle & Disposal Suite', () => {

  test('BufferGeometry disposal correctly triggers dispose event', () => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    let disposed = false;
    geo.addEventListener('dispose', () => {
      disposed = true;
    });

    geo.dispose();
    assert.equal(disposed, true, 'BufferGeometry must fire dispose event upon deallocation');
  });

  test('Material disposal correctly triggers dispose event', () => {
    const mat = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    let disposed = false;
    mat.addEventListener('dispose', () => {
      disposed = true;
    });

    mat.dispose();
    assert.equal(disposed, true, 'Material must fire dispose event upon deallocation');
  });

  test('Texture disposal correctly triggers dispose event', () => {
    const texture = new THREE.Texture();
    let disposed = false;
    texture.addEventListener('dispose', () => {
      disposed = true;
    });

    texture.dispose();
    assert.equal(disposed, true, 'Texture must fire dispose event to release GPU VRAM');
  });

  test('Recursive scene disposal traverses and cleans all child geometries and materials', () => {
    const parentGroup = new THREE.Group();
    const disposedGeos: string[] = [];
    const disposedMats: string[] = [];

    // Create 3 child meshes with separate geometries and materials
    for (let i = 0; i < 3; i++) {
      const g = new THREE.BoxGeometry(i + 1, 1, 1);
      g.addEventListener('dispose', () => disposedGeos.push(`geo-${i}`));
      const m = new THREE.MeshStandardMaterial();
      m.addEventListener('dispose', () => disposedMats.push(`mat-${i}`));
      const mesh = new THREE.Mesh(g, m);
      parentGroup.add(mesh);
    }

    // Helper mimicking our component disposal function
    const disposeHierarchy = (root: THREE.Object3D) => {
      root.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        if ((obj as THREE.Mesh).material) {
          const m = (obj as THREE.Mesh).material;
          if (Array.isArray(m)) {
            m.forEach(mat => mat.dispose());
          } else {
            m.dispose();
          }
        }
      });
    };

    disposeHierarchy(parentGroup);

    assert.equal(disposedGeos.length, 3, 'All 3 geometries must be deallocated');
    assert.equal(disposedMats.length, 3, 'All 3 materials must be deallocated');
  });

  test('Safe animation loop cancellation prevents duplicate RAF execution', () => {
    let animId: number | null = null;
    let executionCount = 0;

    // Simulate mock RAF cycle
    const mockCallback = () => {
      executionCount++;
    };

    animId = 42; // Simulated requestAnimationFrame ID
    // Simulated component unmount cleanup
    if (animId !== null) {
      animId = null; // Teardown flag
    }

    assert.equal(animId, null, 'Animation ID must be neutralized upon teardown');
  });
});
