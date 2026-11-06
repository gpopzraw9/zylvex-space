import React, { useState } from 'react';
import { OAUTH_SCOPE_SPECIFICATIONS } from '../data/operationsData';
import { 
  KeyRound, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  AlertTriangle,
  Search,
  ShieldCheck
} from 'lucide-react';

export const OAuthScopeMatrixView: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('ALL');
  const [copiedScope, setCopiedScope] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const services = ['ALL', ...OAUTH_SCOPE_SPECIFICATIONS.map(s => s.service)];

  const filteredSpecs = OAUTH_SCOPE_SPECIFICATIONS.filter(spec => {
    const matchesService = selectedService === 'ALL' || spec.service === selectedService;
    const matchesSearch = 
      spec.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      spec.approvedReadOnlyScopes.some(s => s.scope.toLowerCase().includes(searchTerm.toLowerCase())) ||
      spec.prohibitedWriteScopes.some(s => s.scope.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesService && matchesSearch;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScope(text);
    setTimeout(() => setCopiedScope(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Security Architecture</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">OAuth 2.0 Scope Isolation</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Exact Read-Only Scope Specifications
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Authoritative whitelists and threat matrices for the five core services: GitHub, Google Drive, Gmail, Google Calendar, and HubSpot.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300">
            Whitelisted Read-Only Scopes Active
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {services.map((svc) => (
            <button
              key={svc}
              onClick={() => setSelectedService(svc)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedService === svc
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {svc}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search OAuth scopes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-60 pl-8 pr-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Service Scope Cards */}
      <div className="space-y-6">
        {filteredSpecs.map((spec) => (
          <div key={spec.service} className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{spec.service}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Provider Configuration Specification
                  </span>
                </div>
              </div>

              <a
                href={spec.officialDocumentationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center space-x-1"
              >
                <span>Official Documentation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Side-by-side scopes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Approved Read-Only Scopes */}
              <div className="p-4 rounded-lg bg-emerald-950/10 border border-emerald-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                    Approved Read-Only Scopes
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/80">
                    WHITELISTED
                  </span>
                </div>

                <div className="space-y-2">
                  {spec.approvedReadOnlyScopes.map((scopeItem, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-slate-950/80 border border-emerald-900/30 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <code className="text-xs font-mono font-bold text-emerald-300 break-all">
                          {scopeItem.scope}
                        </code>
                        <p className="text-[11px] text-slate-300 leading-snug">{scopeItem.purpose}</p>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Level: {scopeItem.accessLevel}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(scopeItem.scope)}
                        className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 shrink-0"
                        title="Copy scope string"
                      >
                        {copiedScope === scopeItem.scope ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prohibited Write Scopes */}
              <div className="p-4 rounded-lg bg-red-950/10 border border-red-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wide flex items-center">
                    <XCircle className="w-3.5 h-3.5 mr-1.5" />
                    Strictly Prohibited Write Scopes
                  </span>
                  <span className="text-[10px] font-mono text-red-300 bg-red-950/60 px-2 py-0.5 rounded border border-red-800/80">
                    ZERO TOLERANCE
                  </span>
                </div>

                <div className="space-y-2">
                  {spec.prohibitedWriteScopes.map((scopeItem, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-slate-950/80 border border-red-900/30 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <code className="text-xs font-mono font-bold text-red-400 break-all">
                            {scopeItem.scope}
                          </code>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-950 text-red-300 border border-red-800">
                            {scopeItem.securityRiskLevel}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug">{scopeItem.threatDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Provider Limitation Note */}
            {spec.providerLimitationNote && (
              <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">Implementation Caveat: </strong>
                  {spec.providerLimitationNote}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
