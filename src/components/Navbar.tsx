import React from 'react';
import { ShieldCheck, Lock, AlertCircle, FileText, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenReport }) => {
  const tabs = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'phase0', label: 'Phase 0: Corporate Identity' },
    { id: 'phase1', label: 'Phase 1: Composio & Security' },
    { id: 'oauth', label: 'OAuth Scopes' },
    { id: 'phase2', label: 'Phase 2: HubSpot CRM' },
    { id: 'phase3', label: 'Phase 3: Revenue Intelligence' },
    { id: 'founder', label: 'Founder Action & Risks' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Corporate Authority */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://www.zylvex.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center shrink-0"
              title="Visit Official Zylvex Technologies Website (www.zylvex.tech)"
            >
              <img 
                src="/assets/aistudio/Zylvex-logo-xr_f40932fa.png" 
                alt="Zylvex Technologies Logo" 
                className="w-10 h-10 rounded-lg object-cover border border-cyan-500/40 shadow-lg shadow-cyan-950/50 group-hover:border-cyan-400 group-hover:scale-105 transition-all"
              />
            </a>
            <div>
              <div className="flex items-center space-x-2">
                <a 
                  href="https://www.zylvex.tech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold tracking-tight text-white text-base hover:text-cyan-300 transition-colors"
                >
                  ZYLVEX TECHNOLOGIES
                </a>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono border border-slate-700">
                  LTD
                </span>
                <a
                  href="https://www.zylvex.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-cyan-400/80 hover:text-cyan-300 hidden md:inline-flex items-center space-x-0.5"
                >
                  <span>zylvex.tech</span>
                </a>
              </div>
              <div className="text-xs text-slate-400 flex items-center space-x-2">
                <span className="text-cyan-400 font-medium">ZYLVEX SPACE</span>
                <span className="text-slate-600">•</span>
                <span className="italic text-slate-300">Your World, Digitally Measured.</span>
              </div>
            </div>
          </div>

          {/* Security Status & Direct Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span className="font-semibold tracking-wide">STRICT READ-ONLY ENFORCED</span>
            </div>

            <button
              onClick={onOpenReport}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 text-xs font-medium transition-colors"
              title="View & Export Full Implementation Report"
            >
              <FileText className="w-3.5 h-3.5 text-slate-300" />
              <span>Full Report</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 pt-1 border-t border-slate-800/60 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
