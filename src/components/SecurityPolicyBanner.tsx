import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Lock, Ban } from 'lucide-react';

export const SecurityPolicyBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const policies = [
    { rule: 'Send / Reply Emails', status: 'STRICTLY PROHIBITED', description: 'Zero outbound mail dispatch from executive handles or CRM' },
    { rule: 'CRM Records Mutation', status: 'STRICTLY PROHIBITED', description: 'No creation, alteration, or deletion of HubSpot contacts/deals' },
    { rule: 'Code Repositories', status: 'STRICTLY PROHIBITED', description: 'No git push, branch mutation, pull requests, or issue alteration' },
    { rule: 'Social Media Publishing', status: 'STRICTLY PROHIBITED', description: 'Zero broadcasting to LinkedIn, X/Twitter, or public channels' },
    { rule: 'External Documents', status: 'STRICTLY PROHIBITED', description: 'Zero write or overwrite operations on Google Drive or Notion' },
    { rule: 'Financial & Advertising', status: 'STRICTLY PROHIBITED', description: 'No ad spend activation, credit card charges, or billing changes' },
    { rule: 'Website Content', status: 'STRICTLY PROHIBITED', description: 'Public marketing website remains unmutated' },
    { rule: 'Arbitrary HTTP Requests', status: 'STRICTLY PROHIBITED', description: 'Unwhitelisted external endpoints blocked at network boundary' },
    { rule: 'Remote Shell / Execution', status: 'STRICTLY PROHIBITED', description: 'No unconstrained execution on external production hosts' },
    { rule: 'Permission Escalation', status: 'STRICTLY PROHIBITED', description: 'No account connection mutations without explicit founder sign-off' },
  ];

  return (
    <div className="bg-slate-900 border-b border-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start sm:items-center space-x-3">
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Non-Negotiable Security Mandate Active
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  [Policy Ref: DIR-P0-P2-RO]
                </span>
              </div>
              <p className="text-xs text-slate-300">
                All 3P integrations, automated workflows, and execution environments are locked in read-only audit mode. A founder-approved plan does not permit external write operations.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 transition-colors"
            >
              <span>{expanded ? 'Hide 10 Zero-Write Guardrails' : 'View 10 Zero-Write Guardrails'}</span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {policies.map((p, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-200">{p.rule}</span>
                    <span className="text-[10px] font-mono text-red-400 flex items-center space-x-0.5">
                      <Ban className="w-2.5 h-2.5 mr-0.5 inline" />
                      BLOCKED
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{p.description}</p>
                </div>
                <div className="mt-2 text-[10px] text-emerald-400/80 font-mono flex items-center">
                  <CheckCircle2 className="w-2.5 h-2.5 mr-1" />
                  Guardrail Enforced
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
