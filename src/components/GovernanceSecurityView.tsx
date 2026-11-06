import React, { useState } from 'react';
import { Phase0IdentityView } from './Phase0IdentityView';
import { Phase1ComposioView } from './Phase1ComposioView';
import { OAuthScopeMatrixView } from './OAuthScopeMatrixView';
import { EvidenceBadge } from './EvidenceBadge';
import { ShieldAlert, Building2, KeyRound, Ban, Lock, CheckCircle2 } from 'lucide-react';

export const GovernanceSecurityView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'IDENTITY' | 'COMPOSIO' | 'OAUTH'>('IDENTITY');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-red-400">Governance & Security</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Corporate Identity & Read-Only Policy Controls</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Corporate Governance, Identity Verification & Security Boundary
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Statutory CAC verification, Composio integration risk containment, dangerous tool quarantine, and granular read-only OAuth matrices.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>STRICT READ-ONLY ENFORCED</span>
          </div>
          <EvidenceBadge status="VERIFIED" />
        </div>
      </div>

      {/* Governance Subtabs */}
      <div className="flex space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('IDENTITY')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
            activeSubTab === 'IDENTITY'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Phase 0: Corporate Identity (7 Checks)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('COMPOSIO')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
            activeSubTab === 'COMPOSIO'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Phase 1: Composio Audit & Quarantine</span>
        </button>

        <button
          onClick={() => setActiveSubTab('OAUTH')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center space-x-1.5 ${
            activeSubTab === 'OAUTH'
              ? 'bg-slate-800 text-cyan-400 border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Exact OAuth Scope Whitelists</span>
        </button>
      </div>

      {/* Viewport */}
      <div>
        {activeSubTab === 'IDENTITY' && <Phase0IdentityView />}
        {activeSubTab === 'COMPOSIO' && <Phase1ComposioView />}
        {activeSubTab === 'OAUTH' && <OAuthScopeMatrixView />}
      </div>
    </div>
  );
};
