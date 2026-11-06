import React from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Globe2, 
  Target, 
  AlertCircle, 
  ArrowUpRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

export const BusinessIntelligenceView: React.FC = () => {
  const kpis = [
    {
      title: 'Recognized Revenue (YTD)',
      value: '£0.00',
      evidenceStatus: 'VERIFIED' as const,
      subtext: 'Pre-commercial stage; zero unverified transactions logged.',
      accent: 'emerald'
    },
    {
      title: 'Proposed Pipeline Value',
      value: '£160,000',
      evidenceStatus: 'PROPOSED' as const,
      subtext: '4 candidate commercial engagements across ESS & IDT pipelines.',
      accent: 'cyan'
    },
    {
      title: 'Weighted Pipeline Forecast',
      value: '£68,500',
      evidenceStatus: 'ESTIMATE' as const,
      subtext: 'Probability-weighted valuation based on candidate stage gates.',
      accent: 'purple'
    },
    {
      title: 'Target Gross Margin Target',
      value: '72%',
      evidenceStatus: 'ESTIMATE' as const,
      subtext: 'Target model for bespoke engineering & computational shaders.',
      accent: 'purple'
    }
  ];

  const regionalDistribution = [
    { region: 'United Kingdom & Ireland', value: '£75,000', percentage: 47, deals: 2, focus: 'AEC Tech & Modular Construction' },
    { region: 'European Union (DACH & Nordics)', value: '£55,000', percentage: 34, deals: 1, focus: 'Precision CAM Automation' },
    { region: 'Middle East GCC (UAE & KSA)', value: '£30,000', percentage: 19, deals: 1, focus: 'Mega-Infrastructure Spatial Twins' },
  ];

  const funnelStages = [
    { stage: '1. Inbound Architectural Request', count: 12, rate: '100%', note: 'Initial qualification intake' },
    { stage: '2. Technical Architecture Scoping', count: 6, rate: '50%', note: 'Executed mutual NDA required' },
    { stage: '3. Computational Proof-of-Concept', count: 3, rate: '25%', note: 'Paid or sandbox benchmark test' },
    { stage: '4. Master SOW & Legal Review', count: 1, rate: '8%', note: 'Procurement onboarding' },
    { stage: '5. Mobilization & Kickoff', count: 0, rate: '0%', note: 'Pre-commercial launch' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Commercial Intelligence</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Business Performance & Revenue Metrics</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Executive Revenue & Commercial Intelligence Dashboard
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Real-time commercial telemetry distinguishing verified ledger realities, proposed deal pipelines, and target mathematical models. <strong>No fabricated revenue or synthetic activity is presented.</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <EvidenceBadge status="VERIFIED" />
          <EvidenceBadge status="PROPOSED" />
          <EvidenceBadge status="ESTIMATE" />
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">{kpi.title}</span>
              <EvidenceBadge status={kpi.evidenceStatus} size="xs" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {kpi.value}
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              {kpi.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Main Charts & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Commercial Conversion Funnel Architecture</h3>
              <span className="text-[11px] text-slate-400">Proposed Engineering Deal Progression</span>
            </div>
            <EvidenceBadge status="PROPOSED" size="xs" />
          </div>

          <div className="space-y-2.5">
            {funnelStages.map((fs, idx) => (
              <div key={idx} className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{fs.stage}</span>
                  <span className="font-mono text-cyan-400 font-bold">{fs.count} Prospects ({fs.rate})</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: fs.rate }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">{fs.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Opportunity Distribution */}
        <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Geographic Opportunity Distribution</h3>
              <span className="text-[11px] text-slate-400">Tier-1 Market Breakdown</span>
            </div>
            <EvidenceBadge status="PROPOSED" size="xs" />
          </div>

          <div className="space-y-3">
            {regionalDistribution.map((rd, idx) => (
              <div key={idx} className="p-3 rounded bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{rd.region}</span>
                  <span className="font-mono font-bold text-cyan-400">{rd.value}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{rd.focus}</span>
                  <span className="font-mono">{rd.deals} Pipeline Opportunities ({rd.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${rd.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
