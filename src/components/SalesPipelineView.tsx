import React, { useState } from 'react';
import { 
  HUBSPOT_PIPELINES, 
  PROPOSED_DEALS_SHOWCASE, 
  PROPOSED_LEADS_SHOWCASE,
  HUBSPOT_OBJECT_SCHEMAS 
} from '../data/operationsData';
import { EvidenceBadge } from './EvidenceBadge';
import { 
  GitBranch, 
  Users, 
  Building2, 
  Target, 
  Layers, 
  Lock, 
  Clock, 
  Percent, 
  Search,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const SalesPipelineView: React.FC = () => {
  const [activePipelineCode, setActivePipelineCode] = useState<'ESS' | 'IDT' | 'ITP' | 'STP'>('ESS');
  const [subView, setSubView] = useState<'BOARD' | 'LEADS' | 'SCHEMAS'>('BOARD');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedPipeline = HUBSPOT_PIPELINES.find(p => p.code === activePipelineCode) || HUBSPOT_PIPELINES[0];

  const filteredDeals = PROPOSED_DEALS_SHOWCASE.filter(deal => {
    const matchesPipeline = deal.pipelineCode === activePipelineCode;
    const matchesSearch = 
      deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPipeline && matchesSearch;
  });

  const totalProposedValue = PROPOSED_DEALS_SHOWCASE.reduce((acc, d) => acc + d.proposedValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Sales & CRM</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">HubSpot Commercial Pipeline & Lead Management</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Commercial Deal Pipeline & Lead Triage Console
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Proposed multi-pipeline CRM architecture inspired by high-velocity enterprise deal boards. <strong>Strict read-only blueprint mode — zero live records created in HubSpot.</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            Total Proposed Pipeline: £{totalProposedValue.toLocaleString()}
          </div>
          <EvidenceBadge status="PROPOSED" />
        </div>
      </div>

      {/* Sub-view Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex space-x-2">
          <button
            onClick={() => setSubView('BOARD')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subView === 'BOARD'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Deal Stage Board (4 Pipelines)
          </button>
          <button
            onClick={() => setSubView('LEADS')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subView === 'LEADS'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Inbound Lead Triage ({PROPOSED_LEADS_SHOWCASE.length})
          </button>
          <button
            onClick={() => setSubView('SCHEMAS')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              subView === 'SCHEMAS'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HubSpot Schema & Spatial Properties
          </button>
        </div>

        {subView === 'BOARD' && (
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
            {HUBSPOT_PIPELINES.map((p) => (
              <button
                key={p.code}
                onClick={() => setActivePipelineCode(p.code as any)}
                className={`px-2.5 py-1 text-xs font-mono rounded-md whitespace-nowrap transition-colors ${
                  activePipelineCode === p.code
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p.code}: {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Subview 1: Deal Stage Board */}
      {subView === 'BOARD' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white text-sm">{selectedPipeline.name}</span>
              <span className="text-slate-400 ml-2">({selectedPipeline.proposedDealBand})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 font-mono text-[11px]">SLA Target: 48h initial review</span>
            </div>
          </div>

          {/* Kanban / Stage Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2">
            {selectedPipeline.stages.map((stage) => {
              const stageDeals = filteredDeals.filter(d => d.currentStageId === stage.stageId);

              return (
                <div
                  key={stage.stageId}
                  className="rounded-lg bg-slate-950/70 border border-slate-800/80 flex flex-col min-w-[210px] p-3 space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block line-clamp-1">{stage.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400">{stage.probability}% Probability</span>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">
                      {stageDeals.length}
                    </span>
                  </div>

                  {/* Deals in this stage */}
                  <div className="space-y-2 flex-1">
                    {stageDeals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 block">{deal.organization}</span>
                          <h4 className="text-xs font-bold text-white line-clamp-2 mt-0.5">{deal.title}</h4>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px] font-mono">
                          <span className="text-emerald-400 font-bold">
                            {deal.proposedValue > 0 ? `£${deal.proposedValue.toLocaleString()}` : 'Co-Sell'}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            {deal.qualificationStatus}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400 truncate">
                          Lead: {deal.technicalLead}
                        </div>
                      </div>
                    ))}

                    {stageDeals.length === 0 && (
                      <div className="p-4 rounded border border-dashed border-slate-800/60 text-center text-[11px] text-slate-500 italic">
                        No active candidate deals
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>SLA: {stage.expectedDurationDays}d</span>
                    <EvidenceBadge status={stage.evidenceClassification} size="xs" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subview 2: Inbound Leads */}
      {subView === 'LEADS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Inbound Lead Triage Queue</h3>
                <span className="text-[11px] text-slate-400">High-intent architectural inquiries awaiting initial review</span>
              </div>
              <EvidenceBadge status="PROPOSED" size="xs" />
            </div>

            <div className="space-y-2.5">
              {PROPOSED_LEADS_SHOWCASE.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{lead.contactName}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-300 font-medium">{lead.organization}</span>
                      <span className="text-[10px] font-mono text-slate-400">({lead.country})</span>
                    </div>
                    <div className="text-slate-400 text-[11px] flex items-center space-x-2">
                      <span>Source: {lead.source}</span>
                      <span>•</span>
                      <span className="font-mono text-cyan-400">{lead.domain}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      lead.intentLevel === 'HIGH_INTENT'
                        ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800'
                        : 'text-cyan-300 bg-cyan-950/60 border-cyan-800'
                    }`}>
                      {lead.intentLevel.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subview 3: HubSpot Schema Definitions */}
      {subView === 'SCHEMAS' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {HUBSPOT_OBJECT_SCHEMAS.map((schema) => (
            <div key={schema.objectType} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Object Schema: {schema.objectType}</h3>
                </div>
                <EvidenceBadge status={schema.evidenceClassification} size="xs" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                  Custom Spatial Properties Proposed:
                </span>
                <div className="space-y-1.5">
                  {schema.customProperties.map((cp, idx) => (
                    <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between">
                        <code className="text-cyan-300 font-mono font-bold text-[11px]">{cp.name}</code>
                        {cp.mandatoryForStages && (
                          <span className="text-[9px] font-mono text-amber-300 bg-amber-950/60 px-1 py-0.2 rounded border border-amber-800">
                            Required in {cp.mandatoryForStages.join(', ')}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300 mt-1">{cp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
