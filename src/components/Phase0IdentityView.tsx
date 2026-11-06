import React, { useState } from 'react';
import { VERIFICATION_CHECKLIST } from '../data/operationsData';
import { VerificationItem } from '../types/operations';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileCheck, 
  Upload, 
  ShieldAlert,
  Search,
  ExternalLink
} from 'lucide-react';

export const Phase0IdentityView: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'DISCREPANCY' | 'PENDING_EVIDENCE' | 'VERIFIED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = VERIFICATION_CHECKLIST.filter((item) => {
    const matchesFilter = filter === 'ALL' || item.status === filter;
    const matchesSearch = 
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.claimedValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requiredEvidence.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const discrepancyCount = VERIFICATION_CHECKLIST.filter(i => i.status === 'DISCREPANCY').length;
  const pendingCount = VERIFICATION_CHECKLIST.filter(i => i.status === 'PENDING_EVIDENCE').length;
  const verifiedCount = VERIFICATION_CHECKLIST.filter(i => i.status === 'VERIFIED').length;

  return (
    <div className="space-y-6">
      {/* Header & Policy Safeguard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Phase 0 Gate</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Corporate Identity & Public Disclosure</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Corporate Verification Checklist & Discrepancy Log
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Identity claims must be verified with certified statutory filings before external publication. No changes have been made to website information.
          </p>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded bg-amber-950/40 border border-amber-800/60 text-xs font-mono text-amber-300">
            {discrepancyCount} Discrepancies
          </div>
          <div className="px-3 py-1.5 rounded bg-blue-950/40 border border-blue-800/60 text-xs font-mono text-blue-300">
            {pendingCount} Pending Evidence
          </div>
          <div className="px-3 py-1.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs font-mono text-emerald-300">
            {verifiedCount} Verified
          </div>
        </div>
      </div>

      {/* Discrepancy Callout Warning */}
      <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/50 flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
            Statutory & Infrastructure Discrepancies Identified
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            1. <strong>Statutory Domicile:</strong> Virtual correspondence address used in draft documentation differs from statutory legal office required by CAC. <br />
            2. <strong>Contact Identity:</strong> Preliminary contact points utilized personal handles rather than authenticated enterprise domain (<code className="font-mono text-slate-200">@zylvex.com</code>) with verified DNS/DMARC policies.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5">
          {(['ALL', 'DISCREPANCY', 'PENDING_EVIDENCE', 'VERIFIED'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === mode
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {mode === 'ALL' && 'All Checkpoints (7)'}
              {mode === 'DISCREPANCY' && `Discrepancies (${discrepancyCount})`}
              {mode === 'PENDING_EVIDENCE' && `Pending Evidence (${pendingCount})`}
              {mode === 'VERIFIED' && `Verified (${verifiedCount})`}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filter checkpoints or evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-8 pr-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Verification Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isDiscrepancy = item.status === 'DISCREPANCY';
          const isPending = item.status === 'PENDING_EVIDENCE';
          const isVerified = item.status === 'VERIFIED';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg bg-slate-900/60 border transition-all ${
                isDiscrepancy 
                  ? 'border-amber-900/60 bg-amber-950/10' 
                  : isPending 
                  ? 'border-blue-900/40' 
                  : 'border-emerald-950/60'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-400">{item.id}</span>
                    <span className="text-slate-600">•</span>
                    <h3 className="text-sm font-semibold text-white">{item.item}</h3>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDiscrepancy
                        ? 'text-amber-300 bg-amber-950/60 border-amber-800/80'
                        : isPending
                        ? 'text-blue-300 bg-blue-950/60 border-blue-800/80'
                        : 'text-emerald-300 bg-emerald-950/60 border-emerald-800/80'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Claimed / Draft Value</span>
                      <span className="text-slate-200 font-medium">{item.claimedValue}</span>
                    </div>

                    <div className="p-2 rounded bg-slate-950/60 border border-slate-800/80">
                      <span className="text-slate-400 text-[10px] uppercase font-mono block">Verified Official Value</span>
                      <span className={item.verifiedValue ? 'text-emerald-300 font-medium' : 'text-slate-500 italic'}>
                        {item.verifiedValue || 'Unverified — Awaiting documentation'}
                      </span>
                    </div>
                  </div>

                  {item.discrepancyNote && (
                    <div className="text-xs p-2.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300 mt-2">
                      <strong className="text-amber-400 font-mono text-[11px] block mb-0.5">Audit Assessment:</strong>
                      {item.discrepancyNote}
                    </div>
                  )}
                </div>

                {/* Evidence & Founder Action Requirement */}
                <div className="lg:w-80 space-y-2 shrink-0 pt-2 lg:pt-0">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                    <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center mb-1">
                      <FileCheck className="w-3 h-3 mr-1 text-slate-400" />
                      Required Supporting Evidence
                    </div>
                    <div className="text-xs text-slate-300 leading-snug">
                      {item.requiredEvidence}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                    <div className="text-[10px] uppercase font-mono text-amber-400 flex items-center mb-1">
                      <Clock className="w-3 h-3 mr-1 text-amber-400" />
                      Action Required from Founder
                    </div>
                    <div className="text-xs text-slate-300 leading-snug">
                      {item.founderActionRequired}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Website Protection Guarantee */}
      <div className="p-3.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Website content integrity preserved: Zero external updates published pending Phase 0 verification sign-off.</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500">POLICY LOCKED</span>
      </div>
    </div>
  );
};
