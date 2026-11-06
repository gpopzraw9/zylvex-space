import React, { useState } from 'react';
import { COMPOSIO_CONNECTIONS, DANGEROUS_TOOLS_QUARANTINE } from '../data/operationsData';
import { 
  ShieldAlert, 
  Ban, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink,
  Lock,
  Layers,
  Flame
} from 'lucide-react';

export const Phase1ComposioView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'CONNECTIONS' | 'QUARANTINE' | 'LIMITATIONS'>('CONNECTIONS');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-red-400">Phase 1 Gate</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Composio & Integration Security Audit</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Composio Connection Audit & Dangerous Tools Quarantine
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Inspecting previously initiated connections, isolating write risks, and enforcing strict read-only boundary controls. No new connections will be initiated without founder confirmation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-red-950/50 border border-red-800/80 text-xs font-mono text-red-300">
            6 Quarantined for Downgrade
          </div>
          <div className="px-3 py-1.5 rounded bg-amber-950/50 border border-amber-800/80 text-xs font-mono text-amber-300">
            2 Revocations Recommended
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('CONNECTIONS')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'CONNECTIONS'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          8 Initiated Connections Audit
        </button>
        <button
          onClick={() => setActiveSubTab('QUARANTINE')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'QUARANTINE'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Dangerous Tools Quarantine (7 Blocked)
        </button>
        <button
          onClick={() => setActiveSubTab('LIMITATIONS')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeSubTab === 'LIMITATIONS'
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Provider Read-Only Limitations
        </button>
      </div>

      {/* Subtab 1: 8 Connections Audit */}
      {activeSubTab === 'CONNECTIONS' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Active Audit Protocol:</strong> All 8 connections initiated in previous sessions have been analyzed for write capability exposure. All active write actions are blocked at the proxy layer. Connections requesting bundled write privileges without read-only separation are scheduled for immediate revocation.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {COMPOSIO_CONNECTIONS.map((conn) => {
              const isRevoke = conn.recommendedAction === 'REVOKE_IMMEDIATELY';

              return (
                <div
                  key={conn.id}
                  className={`p-4 rounded-lg bg-slate-900/60 border ${
                    isRevoke ? 'border-red-900/80 bg-red-950/10' : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-slate-400">{conn.id}</span>
                        <h3 className="text-base font-semibold text-white">{conn.appName}</h3>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        Initiated: {new Date(conn.initiatedAt).toLocaleDateString()} • Intent: {conn.originalIntent}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isRevoke 
                        ? 'text-red-300 bg-red-950/60 border-red-800' 
                        : 'text-amber-300 bg-amber-950/60 border-amber-800'
                    }`}>
                      {conn.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                    <span className="text-slate-400 uppercase font-mono text-[10px] block mb-1">
                      Security Analysis & Limitation
                    </span>
                    {conn.limitationDetails}
                  </div>

                  <div className="mt-3">
                    <span className="text-slate-400 uppercase font-mono text-[10px] block mb-1">
                      Detected Dangerous Write Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {conn.detectedWriteCapabilities.map((cap, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-red-950/40 border border-red-800/60 text-red-300 text-[10px] font-mono flex items-center space-x-1"
                        >
                          <Ban className="w-2.5 h-2.5 mr-1" />
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Read-Only Mode Supported: {conn.readOnlySupported ? 'Yes (Via Scopes)' : 'No (Bundled Provider)'}
                    </span>
                    <span className={`text-xs font-semibold font-mono ${isRevoke ? 'text-red-400' : 'text-amber-400'}`}>
                      {conn.recommendedAction.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Subtab 2: Dangerous Tools Quarantine */}
      {activeSubTab === 'QUARANTINE' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded bg-red-950/20 border border-red-900/60 text-xs text-slate-300 flex items-start space-x-3">
            <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-300">Quarantine Gate Enforced:</strong> The following tools possess external write, modify, delete, dispatch, or monetary transaction rights. All invocation routes have been severed at the gateway. Attempts to call these tools fail immediately with a policy violation error.
            </div>
          </div>

          <div className="space-y-3">
            {DANGEROUS_TOOLS_QUARANTINE.map((tool) => (
              <div
                key={tool.id}
                className="p-4 rounded-lg bg-slate-900/70 border border-red-900/40 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-red-400 font-bold">{tool.id}</span>
                    <span className="text-slate-600">•</span>
                    <code className="text-sm font-bold text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {tool.toolName}
                    </code>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.provider}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">Destructive Capability:</span> {tool.destructiveCapability}
                  </div>
                  <div className="text-xs text-red-300/90 font-mono">
                    <span className="text-slate-400 font-sans">Policy Violation Reason:</span> {tool.quarantineReason}
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <span className="px-2.5 py-1 rounded bg-red-950 border border-red-700 text-red-300 text-xs font-mono font-semibold flex items-center space-x-1">
                    <Ban className="w-3.5 h-3.5 mr-1" />
                    BLOCKED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Provider Limitations */}
      {activeSubTab === 'LIMITATIONS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                Slack API Scopes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Standard OAuth apps on Slack request broad bot tokens that include <code className="text-slate-200 font-mono">chat:write</code>. Without an enterprise manifest defining custom granularity, read-only chat viewing is not isolated.
              </p>
              <div className="text-xs text-red-400 font-mono pt-1">
                Remedy: Revoke connection immediately.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                LinkedIn Community API
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                LinkedIn does not provide an isolated read-only scope for company updates within 3P integration directories. Standard authorization grants publication access to the official company profile.
              </p>
              <div className="text-xs text-red-400 font-mono pt-1">
                Remedy: Revoke connection immediately.
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center">
                <span className="w-2 h-2 rounded-full bg-amber-400 mr-2"></span>
                GitHub Classic OAuth
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                GitHub's classic <code className="text-slate-200 font-mono">repo</code> scope bundles full commit and PR creation with read access. True read-only isolation requires GitHub Apps or Fine-Grained Personal Access Tokens (PAT v2).
              </p>
              <div className="text-xs text-amber-400 font-mono pt-1">
                Remedy: Enforce Fine-Grained PAT or GitHub App.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
