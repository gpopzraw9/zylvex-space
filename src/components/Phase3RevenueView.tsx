import React, { useState } from 'react';
import { REVENUE_INTELLIGENCE_DOMAINS } from '../data/operationsData';
import { RevenueIntelligenceTarget } from '../types/operations';
import { 
  Globe2, 
  Code2, 
  Cpu, 
  Factory, 
  UserCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Briefcase,
  Layers,
  Sparkles,
  Ban
} from 'lucide-react';

export const Phase3RevenueView: React.FC = () => {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState<number>(0);

  const selectedDomain = REVENUE_INTELLIGENCE_DOMAINS[selectedDomainIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Phase 3 Gate</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Global Revenue Intelligence</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Global Enterprise Research Strategy
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Target industry analysis, buyer profiles, and procurement pathways for high-margin spatial computing and software contracts. <strong>Strict policy: Research and architecture discovery only — do not contact prospects.</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-emerald-950/50 border border-emerald-800/80 text-xs font-mono text-emerald-300 flex items-center space-x-1.5">
            <Ban className="w-3.5 h-3.5 mr-0.5 text-red-400" />
            <span>Zero Outbound Outreach Authorized</span>
          </div>
        </div>
      </div>

      {/* Domain Cards Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {REVENUE_INTELLIGENCE_DOMAINS.map((domain, idx) => {
          const isSelected = idx === selectedDomainIndex;
          const icons = [Code2, Cpu, Factory];
          const IconComponent = icons[idx];

          return (
            <div
              key={domain.serviceDomain}
              onClick={() => setSelectedDomainIndex(idx)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-800 border-emerald-500 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded ${isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">{domain.serviceDomain}</h4>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-snug">
                {domain.subCapabilities[0]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Domain Deep Dive */}
      <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">{selectedDomain.serviceDomain}</h3>
            <span className="text-xs text-slate-400">
              Commercial Research Specification & Market Segmentation
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/60">
            Initial Revenue Focus
          </span>
        </div>

        {/* Capabilities & Target Industries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
            <span className="text-xs uppercase font-mono text-emerald-400 font-semibold block">
              Core Technical Capabilities Offered:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedDomain.subCapabilities.map((cap, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
            <span className="text-xs uppercase font-mono text-slate-400 font-semibold block">
              Target Industries & Verticals:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedDomain.targetIndustries.map((ind, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-slate-500 font-bold">•</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Geographic Focus */}
        <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
          <span className="text-xs uppercase font-mono text-slate-400 font-semibold block flex items-center">
            <Globe2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
            Priority Geographic Markets:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {selectedDomain.targetRegions.map((reg, i) => (
              <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800">
                {reg}
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Personas */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Target Buyer Profiles & Technical Validation Needs</span>
          </h4>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {selectedDomain.buyerPersonas.map((bp, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="border-b border-slate-800/80 pb-2">
                  <h5 className="text-sm font-bold text-white">{bp.roleTitle}</h5>
                  <span className="text-xs text-slate-400 font-mono">Department: {bp.department}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-red-400 block mb-1">
                    Core Operational Pain Points:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {bp.corePainPoints.map((pain, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-1.5">
                        <span className="text-red-400 text-xs">•</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                    Technical Proofs Required to Close:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {bp.technicalValidationNeeds.map((need, nIdx) => (
                      <li key={nIdx} className="flex items-start space-x-1.5">
                        <span className="text-emerald-400 text-xs">✓</span>
                        <span>{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Procurement Channels & Hard Qualification Gate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-xs uppercase font-mono text-slate-400 font-semibold block flex items-center">
              <Briefcase className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
              Enterprise Procurement Channels:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedDomain.procurementChannels.map((chan, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-slate-500 font-bold">•</span>
                  <span>{chan}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <span className="text-xs uppercase font-mono text-emerald-400 font-semibold block flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              Minimum Qualification Threshold:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedDomain.qualificationGate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
