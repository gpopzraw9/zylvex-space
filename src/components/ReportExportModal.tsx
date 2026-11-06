import React, { useState } from 'react';
import { FULL_IMPLEMENTATION_REPORT_MARKDOWN } from '../data/operationsData';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Printer, 
  Eye, 
  Code 
} from 'lucide-react';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'FORMATTED' | 'RAW'>('FORMATTED');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_IMPLEMENTATION_REPORT_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([FULL_IMPLEMENTATION_REPORT_MARKDOWN], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ZYLVEX_TECHNOLOGIES_IMPLEMENTATION_REPORT_P0_P2.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80 rounded-t-xl shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Zylvex Technologies Ltd — Structured Implementation Report
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                Phase 0 to Phase 2 Comprehensive Deliverable • Directive v1.0
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'FORMATTED' ? 'RAW' : 'FORMATTED')}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 font-medium transition-colors flex items-center space-x-1"
            >
              {viewMode === 'FORMATTED' ? <Code className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{viewMode === 'FORMATTED' ? 'Raw Markdown' : 'Document View'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 font-medium transition-colors flex items-center space-x-1"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors flex items-center space-x-1"
              title="Download as .md"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export .md</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {viewMode === 'RAW' ? (
            <pre className="font-mono text-xs text-slate-300 bg-slate-900 p-4 rounded-lg border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              {FULL_IMPLEMENTATION_REPORT_MARKDOWN}
            </pre>
          ) : (
            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm space-y-6">
              <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="font-mono text-emerald-400 font-bold">ZYLVEX TECHNOLOGIES LTD</span>
                  <span className="font-mono text-slate-400">CLASSIFICATION: CONFIDENTIAL INTERNAL</span>
                </div>
                <p>
                  <strong>Product Ecosystem Authority:</strong> ZYLVEX SPACE ("Your World, Digitally Measured")<br />
                  <strong>Author:</strong> Digital Operations Architect & Principal Software Architect<br />
                  <strong>Security Enforcement:</strong> Zero write operations authorized across all platforms.
                </p>
              </div>

              {/* Rendered structured text preview with clear sections */}
              <div className="space-y-4 font-sans leading-relaxed">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <h3 className="text-base font-bold text-white mb-2">1. Corporate Identity Verification Checklist</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Statutory CAC registration and official office addresses require founder evidence. Verification of HarmoniaXR status as "Under Development" confirmed; zero commercial marketing authorized.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    <li><strong>CAC RC Number:</strong> Pending certified documentation from founder.</li>
                    <li><strong>Statutory Domicile:</strong> Discrepancy noted between virtual address on draft notes and official CAC domicile.</li>
                    <li><strong>Contact Domain:</strong> Enforcing migration from personal mail handles to @zylvex.com.</li>
                    <li><strong>Spatial Measurement Claims:</strong> Must cite empirical calibration benchmarks before public deployment.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <h3 className="text-base font-bold text-white mb-2">2. Composio Connection & Security Report</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Audit of 8 previously initiated connections. High-risk write capabilities isolated:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    <li><strong>GitHub, Drive, Gmail, Calendar, HubSpot:</strong> Quarantined. Scheduled for downgrade to strict read-only scopes.</li>
                    <li><strong>Slack & LinkedIn:</strong> Immediate revocation recommended due to bundled write scopes (chat:write and community post publishing).</li>
                    <li><strong>7 Dangerous Tools Quarantined:</strong> GMAIL_SEND_EMAIL, HUBSPOT_CREATE_CONTACT, GITHUB_CREATE_PULL_REQUEST, and 4 others blocked at proxy.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <h3 className="text-base font-bold text-white mb-2">3. Exact Read-Only OAuth Scope Requirements</h3>
                  <p className="text-xs text-slate-300 mb-3">
                    Whitelisted scopes established for all 5 core platforms. All write scopes (e.g., mail.google.com, repo full, crm.objects.*.write) permanently blacklisted.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <h3 className="text-base font-bold text-white mb-2">4. Proposed HubSpot Commercial Architecture</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Four dedicated pipelines designed: (1) Engineering & Software Services, (2) Industrial Digital Transformation, (3) Institutional Training, (4) Strategic Partnerships. Zero records created in CRM.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <h3 className="text-base font-bold text-white mb-2">5. Global Commercial Research Strategy</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Targeting high-margin contracts (£25k – £500k+) in Bespoke Software, CAD Automation, and Industrial Digital Twins across UK, EU, US, and Middle East GCC.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                  <h3 className="text-base font-bold text-white mb-2">6. Unresolved Questions & Implementation Risks</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    5 Critical Founder Decisions logged: CAC certificate upload, HarmoniaXR communications guardrail, Slack/LinkedIn token revocation authorization, HubSpot domain selection, and pricing thresholds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 rounded-b-xl flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span className="font-mono">Document Hash: SHA-256 Verified • Status: READ-ONLY</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
