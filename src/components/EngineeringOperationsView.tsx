import React, { useState } from 'react';
import { ENGINEERING_BENCHMARKS } from '../data/operationsData';
import { EvidenceBadge } from './EvidenceBadge';
import { SpatialEngine3D } from './SpatialEngine3D';
import { 
  Cpu, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Activity, 
  Layers, 
  Terminal, 
  Sliders,
  Box,
  Ruler
} from 'lucide-react';

export const EngineeringOperationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VIEWPORT' | 'BENCHMARKS' | 'PROVENANCE'>('VIEWPORT');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Engineering Operations</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Spatial Computing & Computational Geometry</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Spatial Engine Telemetry & Accuracy Benchmarks
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Live WebGL/Three.js spatial calibration viewport, mathematical measurement tolerances, and geometric error bounds verifying the *"Your World, Digitally Measured"* technical standard.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded border border-cyan-800/60 flex items-center space-x-1.5">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive 3D Engine Active</span>
          </span>
          <EvidenceBadge status="VERIFIED" />
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('VIEWPORT')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
            activeTab === 'VIEWPORT'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Live 3D Spatial Calibration Viewport</span>
        </button>

        <button
          onClick={() => setActiveTab('BENCHMARKS')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
            activeTab === 'BENCHMARKS'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Engineering Benchmark Matrix ({ENGINEERING_BENCHMARKS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PROVENANCE')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
            activeTab === 'PROVENANCE'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Spatial Provenance Standard</span>
        </button>
      </div>

      {/* Tab 1: Live 3D Spatial Calibration Viewport */}
      {activeTab === 'VIEWPORT' && (
        <div className="space-y-4">
          <SpatialEngine3D />

          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Live Three.js Render Pipeline:</strong> ACESFilmic tone mapping, PBR Studio RoomEnvironment, 8-part procedural composite model, real-time FPS telemetry, and sub-millimeter Euclidean distance calculation.
              </span>
            </div>
            <EvidenceBadge status="VERIFIED" size="xs" />
          </div>
        </div>
      )}

      {/* Tab 2: Benchmarks Grid */}
      {activeTab === 'BENCHMARKS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Empirical Engineering Test Matrix</h3>
            <span className="text-[11px] text-slate-400 font-mono">Formal Verification Status</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ENGINEERING_BENCHMARKS.map((bench) => {
              const isPassed = bench.status === 'PASSED';

              return (
                <div
                  key={bench.id}
                  className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <span className="font-mono text-xs font-bold text-cyan-400">{bench.id}</span>
                      <h4 className="text-sm font-bold text-white">{bench.metric}</h4>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <EvidenceBadge status={bench.evidenceClassification} size="xs" />
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isPassed
                          ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800'
                          : 'text-amber-300 bg-amber-950/60 border-amber-800'
                      }`}>
                        {bench.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                        Target Tolerance
                      </span>
                      <span className="text-slate-200 font-mono">{bench.targetTolerance}</span>
                    </div>

                    <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                        Test Status / Finding
                      </span>
                      <span className={isPassed ? 'text-emerald-300 font-mono font-medium' : 'text-slate-400 italic'}>
                        {bench.verifiedResult}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
                    <span className="font-mono text-slate-500">Test Harness:</span> {bench.testEnvironment}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Spatial Provenance Standard */}
      {activeTab === 'PROVENANCE' && (
        <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Spatial Measurement Provenance Standard (Permanent Directive Requirement 6)</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In strict compliance with Permanent Engineering Instruction 6, spatial measurements are authoritative application data. AI-generated suggestions are never treated as verified geometry. Every measurement commits the following immutable metadata:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-xs">
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-mono font-bold block">1. Calibrated Value & Unit</span>
              <p className="text-slate-400 text-[11px]">Euclidean distance, angle, elevation, and volume formatted in standard Metric SI with dimensional unit tags.</p>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-mono font-bold block">2. Sensor Source & Method</span>
              <p className="text-slate-400 text-[11px]">Source device telemetry (e.g. LiDAR laser sensor, stereo-depth optics, manual datum anchor point).</p>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-mono font-bold block">3. Accuracy & Confidence</span>
              <p className="text-slate-400 text-[11px]">Empirical tolerance bounds, sensor noise margin, and calibration certificate reference.</p>
            </div>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 font-mono font-bold block">4. Cryptographic Revision Hash</span>
              <p className="text-slate-400 text-[11px]">Immutable SHA-256 calculation checksum preventing silent geometry tampering or revision overwrites.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
