import React from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  AlertCircle, 
  Building2 
} from 'lucide-react';

export const FinancialIntelligenceView: React.FC = () => {
  const financialCards = [
    {
      title: 'Current Realized Revenue',
      value: '£0.00',
      evidenceStatus: 'VERIFIED' as const,
      note: 'Pre-commercial launch stage; zero synthetic billing recorded.'
    },
    {
      title: 'Proposed Contract Band (ESS)',
      value: '£25k – £250k+',
      evidenceStatus: 'PROPOSED' as const,
      note: 'Subject to founder ratification; protects core engineering bandwidth.'
    },
    {
      title: 'Multi-Currency Clearing',
      value: 'GBP / EUR / USD',
      evidenceStatus: 'PROPOSED' as const,
      note: 'Target multi-currency account structure for international procurement.'
    },
    {
      title: 'ZSC Unit Target Valuation',
      value: '1 ZSC = £1.00',
      evidenceStatus: 'PROPOSED' as const,
      note: 'Proposed pegged consumption credit for cloud geometry processing.'
    }
  ];

  const rateCards = [
    { role: 'Principal Computational Architect', rate: '£1,200 / day', focus: 'Geometry engines, spatial calculation pipelines, system architecture' },
    { role: 'Senior Graphics & WebGPU Shader Engineer', rate: '£950 / day', focus: 'High-performance WebGL/WebGPU shaders, mesh optimization' },
    { role: 'Spatial CAD & BIM Systems Engineer', rate: '£850 / day', focus: 'IFC/STEP/DXF bidirectional conversion & pipeline integration' },
    { role: 'Full-Stack Spatial Infrastructure Engineer', rate: '£750 / day', focus: 'Real-time WebSocket telemetry, spatial database schemas' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Financial Governance</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Commercial Pricing & Treasury Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Financial Intelligence & Commercial Rate Models
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Financial controls separating verified balance sheet entries from proposed engineering rate cards, multi-currency frameworks, and Zylvex Space Credits (ZSC) utility models.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <EvidenceBadge status="VERIFIED" />
          <EvidenceBadge status="PROPOSED" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialCards.map((fc, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">{fc.title}</span>
              <EvidenceBadge status={fc.evidenceStatus} size="xs" />
            </div>
            <div className="text-xl font-bold text-white tracking-tight">
              {fc.value}
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              {fc.note}
            </p>
          </div>
        ))}
      </div>

      {/* Rate Card & ZSC Utility Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proposed Engineering Services Rate Card */}
        <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Proposed Engineering Service Rate Card</h3>
              <span className="text-[11px] text-slate-400">Bespoke Spatial Computing & Graphics SOWs</span>
            </div>
            <EvidenceBadge status="PROPOSED" size="xs" />
          </div>

          <div className="space-y-2.5">
            {rateCards.map((rc, idx) => (
              <div key={idx} className="p-3 rounded bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{rc.role}</span>
                  <span className="font-mono text-cyan-400 font-bold">{rc.rate}</span>
                </div>
                <p className="text-[10px] text-slate-400">{rc.focus}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Scoping Policy:</strong> Fixed-price milestones (Scoping Sprint: £7,500; PoC Sandbox: £15,000–£35,000) are proposed before entering full Master Services Agreements.
          </div>
        </div>

        {/* Zylvex Space Credits (ZSC) Tokenomics Blueprint */}
        <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Coins className="w-4 h-4 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Zylvex Space Credits (ZSC) Blueprint</h3>
                <span className="text-[11px] text-slate-400">Platform Compute & Marketplace Utility Token</span>
              </div>
            </div>
            <EvidenceBadge status="PROPOSED" size="xs" />
          </div>

          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
            <p className="text-slate-300 leading-relaxed">
              Zylvex Space Credits (ZSC) serve as the internal digital accounting unit for headless cloud geometric operations, creator asset transactions, and spatial model storage:
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Heavy Mesh Decimation (1M+ Polygons)</span>
                <span className="font-mono text-cyan-400 font-bold">15 ZSC / Job</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Automated CAD 2D to 3D Synthesis</span>
                <span className="font-mono text-cyan-400 font-bold">25 ZSC / Plan</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-300">Creator 3D Asset Marketplace Licensing</span>
                <span className="font-mono text-cyan-400 font-bold">Variable ZSC (10–500)</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400">
              *All ZSC consumption rates are candidate architecture models and do not involve cryptocurrency, speculative assets, or unapproved financial transactions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
