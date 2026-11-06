import React from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { 
  Building2, 
  ShieldCheck, 
  GitBranch, 
  Globe2, 
  HelpCircle, 
  AlertTriangle,
  ArrowRight,
  Lock,
  CheckCircle,
  FileCheck2,
  DollarSign,
  Cpu,
  Layers,
  Users,
  Coins
} from 'lucide-react';
import { ProductInitiativeId } from '../types/operations';

interface ExecutiveOverviewProps {
  onNavigate: (tabId: string) => void;
  selectedInitiativeId: ProductInitiativeId;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({ 
  onNavigate,
  selectedInitiativeId
}) => {
  const topMetrics = [
    {
      label: 'Recognized Revenue',
      value: '£0.00',
      evidence: 'VERIFIED' as const,
      subtext: 'Pre-commercial ledger reality',
      accent: 'emerald'
    },
    {
      label: 'Proposed Sales Pipeline',
      value: '£160,000',
      evidence: 'PROPOSED' as const,
      subtext: '4 candidate enterprise opportunities',
      accent: 'cyan'
    },
    {
      label: 'Qualified Inbound Leads',
      value: '4 Leads',
      evidence: 'PROPOSED' as const,
      subtext: 'High-intent technical evaluations',
      accent: 'cyan'
    },
    {
      label: 'Active Strategic Initiatives',
      value: '5 Brands',
      evidence: 'VERIFIED' as const,
      subtext: 'ZYLVEX SPACE flagship + HarmoniaXR R&D',
      accent: 'emerald'
    },
    {
      label: 'Engineering Tolerance Gate',
      value: '< 0.1 mm',
      evidence: 'PROPOSED' as const,
      subtext: 'Target specification (Harness pending)',
      accent: 'cyan'
    },
    {
      label: 'Unresolved Founder Blockers',
      value: '5 Questions',
      evidence: 'PROPOSED' as const,
      subtext: 'Decisions required for live staging',
      accent: 'amber'
    }
  ];

  const quickNavDomains = [
    {
      id: 'bi',
      title: 'Business Intelligence',
      desc: 'Commercial conversion ratios, regional opportunity mapping, and deal velocity.',
      icon: DollarSign,
      status: 'Proposed Models'
    },
    {
      id: 'sales',
      title: 'Sales & CRM Deals',
      desc: 'Nexora-style deal stage board and HubSpot 4-pipeline architecture.',
      icon: GitBranch,
      status: '4 Pipelines'
    },
    {
      id: 'engineering',
      title: 'Engineering Operations',
      desc: 'Spatial measurement tolerances, WebGPU stress tests, and geometry algorithms.',
      icon: Cpu,
      status: '<0.1mm Calibrated'
    },
    {
      id: 'portfolio',
      title: 'Product Portfolio',
      desc: 'Roadmaps and boundaries for ZYLVEX SPACE, HarmoniaXR, ZylForge, and ZylCode.',
      icon: Layers,
      status: '5 Initiatives'
    },
    {
      id: 'governance',
      title: 'Governance & Security',
      desc: 'Phase 0 corporate identity, CAC checks, Composio audit, and OAuth scopes.',
      icon: ShieldCheck,
      status: 'Read-Only Enforced'
    },
    {
      id: 'founder',
      title: 'Founder Command Centre',
      desc: 'Decision logging queue, evidence upload tracking, and risk mitigation matrix.',
      icon: HelpCircle,
      status: 'Action Required'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Command Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">Central Command Console</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">Zylvex Corporate Operating System</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
              Executive Corporate Intelligence & Operations Overview
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Real-time executive oversight across revenue intelligence, spatial engineering operations, strategic product initiatives, and strict read-only governance controls.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start md:items-end">
            <span className="text-xs text-slate-400 font-mono">Corporate Entity</span>
            <span className="text-sm font-semibold text-white">Zylvex Technologies Ltd</span>
            <span className="text-xs text-cyan-400 italic font-mono">"Your World, Digitally Measured."</span>
          </div>
        </div>

        {/* Top Operational Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {topMetrics.map((metric, i) => (
            <div key={i} className="p-3 rounded bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 truncate">{metric.label}</span>
                <EvidenceBadge status={metric.evidence} size="xs" showIcon={false} />
              </div>
              <div className="text-lg font-bold text-white tracking-tight mt-0.5">
                {metric.value}
              </div>
              <p className="text-[10px] text-slate-400 truncate">
                {metric.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Operating Domains Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Enterprise Operating Domains
          </h2>
          <span className="text-xs text-slate-400">Select any domain to inspect live operational data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickNavDomains.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className="group p-5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="w-8 h-8 rounded bg-slate-800/80 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {card.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-3 group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-end">
                  <div className="flex items-center text-xs text-slate-400 group-hover:text-cyan-400 font-medium">
                    <span>Inspect Domain</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Posture & Non-Negotiable Containment Card */}
      <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-slate-300">
            <strong className="text-emerald-300">Authoritative Read-Only Baseline:</strong> All operational telemetry, HubSpot schemas, and Composio security policies remain locked in discovery and audit mode. Zero external mutations are executed without explicit founder sign-off.
          </div>
        </div>
        <div className="shrink-0">
          <EvidenceBadge status="VERIFIED" />
        </div>
      </div>
    </div>
  );
};
