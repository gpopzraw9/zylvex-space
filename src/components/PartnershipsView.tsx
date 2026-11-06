import React from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { Handshake, Award, Building2, Globe2, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const PartnershipsView: React.FC = () => {
  const partnerTracks = [
    {
      title: 'Hardware OEM Sensor Alliances',
      type: 'Technical Interoperability',
      evidenceStatus: 'PROPOSED' as const,
      description: 'Pre-calibrated sensor integration drivers for solid-state LiDAR, stereo-depth cameras, and industrial 3D laser scanners.',
      targetPartners: ['Ouster / Hesai LiDAR', 'Intel RealSense', 'Leica Geosystems'],
      commercialModel: 'Hardware bundle referral & certified partner badge'
    },
    {
      title: 'Industrial Systems Integrators',
      type: 'Co-Selling & Deployment',
      evidenceStatus: 'PROPOSED' as const,
      description: 'Tier-1 automation integrators deploying Zylvex factory digital twin pipelines within large-scale smart manufacturing facilities.',
      targetPartners: ['Siemens Industrial Edge Ecosystem', 'Rockwell Automation Encompass', 'Schneider EcoStruxure'],
      commercialModel: 'Subcontracting & 15–20% software license revenue share'
    },
    {
      title: 'Academic & Higher Education Research',
      type: 'Institutional Programmes',
      evidenceStatus: 'PROPOSED' as const,
      description: 'Joint research laboratories on computational geometry, WebGPU algorithms, and student spatial intelligence cohorts.',
      targetPartners: ['Imperial College London', 'ETH Zürich', 'Technical University of Munich (TUM)'],
      commercialModel: 'Pipeline 3 institutional framework agreements'
    }
  ];

  const fundingPipelines = [
    { title: 'Innovate UK Smart Grants', focus: 'High-performance WebGPU computational geometry pipelines', status: 'Pre-submission Architectural Review', amount: 'Up to £250,000' },
    { title: 'High Value Manufacturing (HVM) Catapult', focus: 'Industrial digital twin factory floor telemetry validation', status: 'Scoping Joint Demonstration', amount: 'Voucher & Lab Compute Facility Access' },
    { title: 'EU Horizon Europe Cluster 4 (Industry & Digital)', focus: 'Next-generation sovereign 3D interoperability & OpenUSD', status: 'Consortium Exploration', amount: 'Collaborative Framework' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Ecosystem Alliances</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">OEM Interoperability & Funding Pipelines</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Strategic Partnerships & Non-Dilutive Funding Strategy
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Hardware OEM integrations, industrial system integrator co-sell networks, and non-dilutive R&D grant frameworks.
          </p>
        </div>

        <EvidenceBadge status="PROPOSED" />
      </div>

      {/* Partner Tracks */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white">Proposed Strategic Partner Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partnerTracks.map((pt, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{pt.type}</span>
                  <EvidenceBadge status={pt.evidenceStatus} size="xs" />
                </div>
                <h4 className="text-sm font-bold text-white">{pt.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{pt.description}</p>
                
                <div className="pt-2 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-semibold block mb-0.5">Target Partners:</span>
                  {pt.targetPartners.join(' • ')}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
                Model: {pt.commercialModel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Dilutive Grant Pipeline */}
      <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Award className="w-4 h-4 text-cyan-400" />
          <span>Non-Dilutive R&D Grant & Institutional Innovation Pipeline</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {fundingPipelines.map((fp, i) => (
            <div key={i} className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <span className="text-cyan-400 font-bold block">{fp.title}</span>
              <span className="text-slate-200 font-semibold">{fp.amount}</span>
              <p className="text-slate-400 text-[11px]">{fp.focus}</p>
              <div className="text-[10px] font-mono text-emerald-400 pt-1">
                Status: {fp.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
