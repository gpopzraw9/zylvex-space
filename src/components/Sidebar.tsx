import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  GitBranch, 
  Cpu, 
  Layers, 
  Handshake, 
  Megaphone, 
  DollarSign, 
  ShieldAlert, 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  Lock,
  Box,
  FileText
} from 'lucide-react';
import { PortfolioSwitcher } from './PortfolioSwitcher';
import { ProductInitiativeId } from '../types/operations';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  selectedInitiativeId: ProductInitiativeId;
  onSelectInitiative: (id: ProductInitiativeId) => void;
  onOpenReport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  selectedInitiativeId,
  onSelectInitiative,
  onOpenReport
}) => {
  const navItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, badge: 'Live' },
    { id: 'bi', label: 'Business Intelligence', icon: BarChart3, badge: null },
    { id: 'sales', label: 'Sales & CRM', icon: GitBranch, badge: '4 Pipelines' },
    { id: 'engineering', label: 'Engineering Operations', icon: Cpu, badge: '<0.1mm' },
    { id: 'portfolio', label: 'Product Portfolio', icon: Layers, badge: '5 Brands' },
    { id: 'partnerships', label: 'Partnerships & Funding', icon: Handshake, badge: null },
    { id: 'marketing', label: 'Marketing Intelligence', icon: Megaphone, badge: null },
    { id: 'finance', label: 'Financial Intelligence', icon: DollarSign, badge: 'Pre-Rev' },
    { id: 'governance', label: 'Governance & Security', icon: ShieldAlert, badge: '10 Rules' },
    { id: 'founder', label: 'Founder Command Centre', icon: Sliders, badge: '5 Blockers' },
  ];

  return (
    <aside 
      className={`border-r border-slate-800 bg-slate-950 flex flex-col transition-all duration-300 z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3 overflow-hidden">
          <a
            href="https://www.zylvex.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0"
            title="Visit www.zylvex.tech"
          >
            <img 
              src="/assets/aistudio/Zylvex-logo-xr_f40932fa.png" 
              alt="Zylvex Space Logo" 
              className="w-8 h-8 rounded-lg object-cover border border-cyan-500/40 shadow-sm shadow-cyan-950 group-hover:border-cyan-400 group-hover:scale-105 transition-all"
            />
          </a>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="flex items-center space-x-1.5">
                <a
                  href="https://www.zylvex.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold tracking-tight text-white text-sm hover:text-cyan-300 transition-colors"
                >
                  ZYLVEX SPACE
                </a>
              </div>
              <span className="text-[10px] text-cyan-400 block truncate font-mono">
                Spatial Intelligence
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Portfolio Initiative Selector */}
      {!isCollapsed && (
        <div className="p-3 border-b border-slate-800/80 bg-slate-900/40">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
            Active Product Focus
          </span>
          <PortfolioSwitcher
            selectedInitiativeId={selectedInitiativeId}
            onSelectInitiative={onSelectInitiative}
          />
        </div>
      )}

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {!isCollapsed && (
          <div className="px-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Corporate Operating Domains
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {!isCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </div>

              {!isCollapsed && item.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/80 border-cyan-800'
                    : 'text-slate-400 bg-slate-900 border-slate-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Controls & Formal Export */}
      <div className="p-3 border-t border-slate-800/80 space-y-2 bg-slate-950/90">
        <button
          onClick={onOpenReport}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-colors"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          {!isCollapsed && <span>Full Operational Report</span>}
        </button>

        <div className="p-2 rounded bg-emerald-950/20 border border-emerald-900/40 flex items-center justify-center text-[10px] font-mono text-emerald-400">
          <Lock className="w-3 h-3 mr-1.5 shrink-0" />
          {!isCollapsed && <span>READ-ONLY ENFORCED</span>}
        </div>
      </div>
    </aside>
  );
};
