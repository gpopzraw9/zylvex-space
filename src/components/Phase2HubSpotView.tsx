import React, { useState } from 'react';
import { HUBSPOT_PIPELINES, HUBSPOT_OBJECT_SCHEMAS } from '../data/operationsData';
import { CRMPipeline, PipelineStage } from '../types/operations';
import { 
  GitBranch, 
  Layers, 
  Users, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Target,
  Percent,
  Lock
} from 'lucide-react';

export const Phase2HubSpotView: React.FC = () => {
  const [activePipelineId, setActivePipelineId] = useState<string>(HUBSPOT_PIPELINES[0].id);
  const [activeSubTab, setActiveSubTab] = useState<'PIPELINES' | 'SCHEMAS' | 'TAXONOMY' | 'QUALIFICATION'>('PIPELINES');

  const selectedPipeline = HUBSPOT_PIPELINES.find(p => p.id === activePipelineId) || HUBSPOT_PIPELINES[0];

  const leadSources = [
    { source: 'Inbound Technical Whitepapers & Spatial Benchmarks', channel: 'Organic Web / Research Portal', qualityTier: 'High Intent' },
    { source: 'GitHub Open-Source Spatial Shaders & glTF Repositories', channel: 'Developer Community', qualityTier: 'High Intent' },
    { source: 'CAD / BIM / AEC Technology Symposiums (Hannover Messe, AU)', channel: 'Events & Conferences', qualityTier: 'Tier 1 Executive' },
    { source: 'Enterprise RFP & Government Frameworks (G-Cloud UK)', channel: 'Public Procurement', qualityTier: 'Tier 1 Enterprise' },
    { source: 'Hardware OEM Interoperability Partner Referrals', channel: 'Partner Co-Sell', qualityTier: 'Qualified Channel' },
    { source: 'Executive Briefings & Direct Inbound Contact Requests', channel: 'Direct Inbound', qualityTier: 'Executive Tier' }
  ];

  const geographicMarkets = [
    { tier: 'Tier 1: Primary Markets', regions: 'United Kingdom, European Union (Germany, France, Nordics), North America (US/Canada), Middle East GCC (UAE, Saudi Arabia)', currency: 'GBP (£), EUR (€), USD ($)', strategy: 'Direct enterprise sales, bespoke engineering services, high-value digital twins.' },
    { tier: 'Tier 2: Selected Regional Hubs', regions: 'Singapore, Japan, South Korea, Selected African Industrial Centers (Nigeria, South Africa, Kenya)', currency: 'USD ($) / Regional Invoicing', strategy: 'Institutional training programs, manufacturing automation partnerships.' },
    { tier: 'Tier 3: Emerging & Creator Markets', regions: 'Latin America, Southeast Asia, Global Remote Developers', currency: 'Zylvex Space Credits (ZSC) / Digital Subscriptions', strategy: 'Self-service ZYLVEX SPACE marketplace, digital twin creator assets (post-launch).' }
  ];

  const industryClassifications = [
    { code: 'IND-01', name: 'Architecture, Engineering & Construction (AEC)', focus: 'BIM interoperability, 2D floor plans to 3D models, site measurement' },
    { code: 'IND-02', name: 'Industrial Manufacturing & Assembly', focus: 'Factory digital twins, robotic tooling clearances, automated CAD to CNC' },
    { code: 'IND-03', name: 'Energy, Utilities & Infrastructure', focus: 'Substation spatial mapping, offshore plant telemetry, hazard geofencing' },
    { code: 'IND-04', name: 'Aerospace, Defense & Simulation', focus: 'High-performance WebGPU simulation engines, sovereign air-gapped models' },
    { code: 'IND-05', name: 'Higher Education & Institutional Research', focus: 'Computational geometry curricula, spatial computing research labs' }
  ];

  const meddicCriteria = [
    { letter: 'M', title: 'Metrics', description: 'Quantifiable business gain (e.g., 60% reduction in CAD quote drafting time, zero plant downtime, 60fps WebGPU rendering of 1M+ triangle assemblies).' },
    { letter: 'E', title: 'Economic Buyer', description: 'C-suite or VP with autonomous P&L authority (CTO, VP Manufacturing, Plant General Manager, University Dean).' },
    { letter: 'D', title: 'Decision Criteria', description: 'Strict technical benchmarks: WebGL/WebGPU compatibility, geometric error tolerance (<0.1mm), SOC2/ISO27001 data isolation.' },
    { letter: 'D', title: 'Decision Process', description: 'Documented evaluation stages: Architecture audit -> Benchmark PoC -> Legal MSA/SOW redlines -> Procurement vendor setup.' },
    { letter: 'I', title: 'Identify Pain', description: 'Severe operational bottleneck: slow legacy CAD pipelines, fragmented 2D drawings, inability to render heavy spatial models in browser.' },
    { letter: 'C', title: 'Champion', description: 'Internal Technical Lead or Principal Architect who advocates for Zylvex technology and provides access to economic buyer.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Phase 2 Gate</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">HubSpot Commercial Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Commercial CRM Pipeline Architecture & Data Schema
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Proposed HubSpot configuration with four dedicated pipelines, custom spatial telemetry properties, and MEDDIC qualification rubrics. <strong>Strict zero-record creation policy maintained.</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-emerald-950/50 border border-emerald-800/80 text-xs font-mono text-emerald-300 flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero Records Created (Blueprint Mode)</span>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSubTab('PIPELINES')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeSubTab === 'PIPELINES'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          4 Commercial Pipelines ({HUBSPOT_PIPELINES.length})
        </button>
        <button
          onClick={() => setActiveSubTab('SCHEMAS')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeSubTab === 'SCHEMAS'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Object Schemas & Custom Properties
        </button>
        <button
          onClick={() => setActiveSubTab('TAXONOMY')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeSubTab === 'TAXONOMY'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Lead Sources & Markets
        </button>
        <button
          onClick={() => setActiveSubTab('QUALIFICATION')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeSubTab === 'QUALIFICATION'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          MEDDIC Qualification Rubric
        </button>
      </div>

      {/* Subtab 1: Pipelines */}
      {activeSubTab === 'PIPELINES' && (
        <div className="space-y-5">
          {/* Pipeline Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {HUBSPOT_PIPELINES.map((pipeline) => {
              const isSelected = pipeline.id === activePipelineId;
              return (
                <div
                  key={pipeline.id}
                  onClick={() => setActivePipelineId(pipeline.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-400">{pipeline.code}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{pipeline.proposedDealBand}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mt-1">{pipeline.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                    {pipeline.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Selected Pipeline Stages */}
          <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div>
                <h3 className="text-base font-bold text-white">
                  Pipeline: {selectedPipeline.name} ({selectedPipeline.code})
                </h3>
                <span className="text-xs text-slate-400">
                  {selectedPipeline.proposedDealBand} • {selectedPipeline.stages.length} Structured Stages
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                HubSpot ID: hs_pipeline_{selectedPipeline.code.toLowerCase()}
              </span>
            </div>

            {/* Stage Progression Flow */}
            <div className="space-y-3">
              {selectedPipeline.stages.map((stage, idx) => (
                <div
                  key={stage.stageId}
                  className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-white">{stage.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">({stage.stageId})</span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-mono">
                      <span className="text-emerald-400 flex items-center">
                        <Percent className="w-3 h-3 mr-0.5" />
                        Prob: {stage.probability}%
                      </span>
                      <span className="text-slate-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {stage.expectedDurationDays > 0 ? `${stage.expectedDurationDays} days` : 'Immediate'}
                      </span>
                      <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        SLA: {stage.slaTarget}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {stage.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 pt-2 text-xs">
                    <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                        Entry Requirements:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                        {stage.entryRequirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900/60 border border-emerald-950/60">
                      <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">
                        Required Exit Gate Criteria:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
                        {stage.exitGateCriteria.map((crit, i) => (
                          <li key={i}>{crit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Object Schemas */}
      {activeSubTab === 'SCHEMAS' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {HUBSPOT_OBJECT_SCHEMAS.map((schema) => (
              <div key={schema.objectType} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Object: {schema.objectType}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Standard + Custom Spatial Properties
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                    Standard HubSpot Properties Mapped:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {schema.standardProperties.map((prop, i) => (
                      <span key={i} className="text-[10px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-slate-300 border border-slate-800">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  <span className="text-[10px] uppercase font-mono text-emerald-400 block">
                    Custom Spatial & Engineering Properties Defined:
                  </span>
                  {schema.customProperties.map((cp, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800/80 text-xs space-y-0.5">
                      <div className="flex items-center justify-between">
                        <code className="text-emerald-300 font-mono font-bold text-[11px]">{cp.name}</code>
                        {cp.mandatoryForStages && (
                          <span className="text-[9px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-800">
                            Required in {cp.mandatoryForStages.join(', ')}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Type: {cp.type}</div>
                      <p className="text-[11px] text-slate-300 leading-snug">{cp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Taxonomy */}
      {activeSubTab === 'TAXONOMY' && (
        <div className="space-y-6">
          {/* Lead Sources */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Standardized Lead Source Architecture</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {leadSources.map((ls, i) => (
                <div key={i} className="p-3 rounded bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400">{ls.qualityTier}</span>
                    <span className="text-[10px] text-slate-400">{ls.channel}</span>
                  </div>
                  <h5 className="font-semibold text-white">{ls.source}</h5>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic Markets */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              <span>Geographic Market Strategy & Currency Routing</span>
            </h3>
            <div className="space-y-3">
              {geographicMarkets.map((gm, i) => (
                <div key={i} className="p-3 rounded bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-white">{gm.tier}</h5>
                    <span className="font-mono text-emerald-400 text-[11px]">{gm.currency}</span>
                  </div>
                  <p className="text-slate-300 text-xs"><strong>Target Regions:</strong> {gm.regions}</p>
                  <p className="text-slate-400 text-[11px]"><strong>Commercial Focus:</strong> {gm.strategy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Classifications */}
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Target Industry Classifications</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {industryClassifications.map((ic) => (
                <div key={ic.code} className="p-3 rounded bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                  <div className="font-mono text-[10px] text-slate-400">{ic.code}</div>
                  <h5 className="font-semibold text-white">{ic.name}</h5>
                  <p className="text-slate-400 text-[11px]">{ic.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: MEDDIC Qualification */}
      {activeSubTab === 'QUALIFICATION' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">
              MEDDIC Qualification Rubric for Spatial & Engineering Deals
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every prospective client in Pipeline 1 (Engineering Services ≥ £25k) and Pipeline 2 (Industrial Digital Transformation ≥ £50k) must satisfy all 6 MEDDIC gates prior to stage advancement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {meddicCriteria.map((m) => (
                <div key={m.letter + m.title} className="p-3.5 rounded bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs">
                      {m.letter}
                    </span>
                    <h4 className="text-sm font-semibold text-white">{m.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
