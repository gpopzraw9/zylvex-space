import React, { useState } from 'react';
import { UNRESOLVED_FOUNDER_QUESTIONS, IMPLEMENTATION_RISKS } from '../data/operationsData';
import { 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowUpRight,
  Send,
  Check
} from 'lucide-react';

export const FounderDecisionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'QUESTIONS' | 'RISKS'>('QUESTIONS');
  const [founderResponses, setFounderResponses] = useState<Record<string, string>>({});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  const handleInputChange = (id: string, text: string) => {
    setFounderResponses(prev => ({ ...prev, [id]: text }));
  };

  const handleSaveDecision = (id: string) => {
    setSavedStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Executive Governance</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Founder Decisions & Risk Mitigation</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Unresolved Founder Questions & Implementation Risk Matrix
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Critical decision gates requiring direct founder input to advance from read-only architectural specification to operational staging.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-300">
            5 Critical Decision Gates
          </div>
          <div className="px-3 py-1.5 rounded bg-red-950/40 border border-red-800/60 text-xs font-mono text-red-300">
            4 Core Risks Managed
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('QUESTIONS')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'QUESTIONS'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Unresolved Questions for Founder (5)
        </button>
        <button
          onClick={() => setActiveTab('RISKS')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'RISKS'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Implementation Risk Matrix (4)
        </button>
      </div>

      {/* Questions View */}
      {activeTab === 'QUESTIONS' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded bg-amber-950/20 border border-amber-800/50 text-xs text-slate-300 flex items-start space-x-2.5">
            <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">Execution Requirement:</strong> The engineering organization stops at every security and information gap. Below are the 5 explicit decisions requested from the founder to proceed beyond read-only discovery.
            </div>
          </div>

          <div className="space-y-4">
            {UNRESOLVED_FOUNDER_QUESTIONS.map((q) => {
              const isBlocker = q.status === 'CRITICAL_BLOCKER';
              const hasSaved = savedStatus[q.id];

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-lg bg-slate-900/60 border ${
                    isBlocker ? 'border-amber-900/60' : 'border-slate-800'
                  } space-y-3`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{q.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400">{q.phase}</span>
                      <span className="text-slate-600">•</span>
                      <h4 className="text-sm font-bold text-white">{q.topic}</h4>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border self-start sm:self-auto ${
                      isBlocker
                        ? 'text-red-300 bg-red-950/60 border-red-800'
                        : 'text-amber-300 bg-amber-950/60 border-amber-800'
                    }`}>
                      {q.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-slate-100">
                    {q.question}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
                      <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">
                        Context & Regulatory Background
                      </span>
                      <p className="text-slate-300 leading-snug">{q.context}</p>
                    </div>

                    <div className="p-2.5 rounded bg-slate-950/70 border border-slate-800/80">
                      <span className="text-[10px] uppercase font-mono text-red-400 block mb-0.5">
                        Impact if Unresolved
                      </span>
                      <p className="text-slate-300 leading-snug">{q.impactIfUnresolved}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-emerald-950/10 border border-emerald-900/40 text-xs">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-0.5 font-semibold">
                      Architect's Recommendation:
                    </span>
                    <p className="text-slate-200">{q.suggestedRecommendation}</p>
                  </div>

                  {/* Interactive Founder Decision Input */}
                  <div className="pt-2">
                    <label className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                      Founder Directive / Evidence Note Entry:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter founder decision or document reference (e.g. 'Approved: RC 1948201 doc in drive')..."
                        value={founderResponses[q.id] || ''}
                        onChange={(e) => handleInputChange(q.id, e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        onClick={() => handleSaveDecision(q.id)}
                        className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center space-x-1 shrink-0"
                      >
                        {hasSaved ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Logged</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-slate-400" />
                            <span>Log Decision</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Risk Matrix View */}
      {activeTab === 'RISKS' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Active Risk Governance:</strong> Structured evaluation of corporate identity, API integration boundaries, commercial bandwidth, and CRM data cleanliness.
            </div>
          </div>

          <div className="space-y-3">
            {IMPLEMENTATION_RISKS.map((risk) => {
              const isCrit = risk.severity === 'CRITICAL';
              const isHigh = risk.severity === 'HIGH';

              return (
                <div
                  key={risk.id}
                  className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-400">{risk.id}</span>
                      <span className="text-slate-600">•</span>
                      <h4 className="text-sm font-bold text-white">{risk.title}</h4>
                      <span className="text-[10px] font-mono text-slate-400">({risk.category})</span>
                    </div>

                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span className={`px-2 py-0.5 rounded border ${
                        isCrit
                          ? 'text-red-300 bg-red-950/60 border-red-800'
                          : isHigh
                          ? 'text-amber-300 bg-amber-950/60 border-amber-800'
                          : 'text-blue-300 bg-blue-950/60 border-blue-800'
                      }`}>
                        Severity: {risk.severity}
                      </span>
                      <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        Prob: {risk.probability}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300">
                    <strong className="text-slate-400 block mb-0.5 uppercase font-mono text-[10px]">
                      Potential Operational Impact:
                    </strong>
                    {risk.impactStatement}
                  </div>

                  <div className="p-3 rounded bg-slate-950/90 border border-slate-800 text-xs">
                    <strong className="text-emerald-400 block mb-0.5 uppercase font-mono text-[10px]">
                      Enforced Mitigation Protocol:
                    </strong>
                    <p className="text-slate-200 leading-relaxed">{risk.mitigationProtocol}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
