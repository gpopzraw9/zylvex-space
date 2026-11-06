import React, { useState } from 'react';
import { PRODUCT_INITIATIVES } from '../data/operationsData';
import { ProductInitiativeId } from '../types/operations';
import { EvidenceBadge } from './EvidenceBadge';
import { 
  Box, 
  Headphones, 
  Cpu, 
  Terminal, 
  Landmark, 
  ChevronDown, 
  ShieldCheck, 
  AlertTriangle 
} from 'lucide-react';

interface PortfolioSwitcherProps {
  selectedInitiativeId: ProductInitiativeId;
  onSelectInitiative: (id: ProductInitiativeId) => void;
}

export const PortfolioSwitcher: React.FC<PortfolioSwitcherProps> = ({
  selectedInitiativeId,
  onSelectInitiative,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedInitiative = PRODUCT_INITIATIVES.find(p => p.id === selectedInitiativeId) || PRODUCT_INITIATIVES[0];

  const getIcon = (id: ProductInitiativeId) => {
    switch (id) {
      case 'ZYLVEX_SPACE': return Box;
      case 'HARMONIA_XR': return Headphones;
      case 'ZYLFORGE': return Cpu;
      case 'ZYLCODE': return Terminal;
      case 'INSTITUTIONAL_EDITION': return Landmark;
      default: return Box;
    }
  };

  const SelectedIcon = getIcon(selectedInitiative.id);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors text-left"
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <SelectedIcon className="w-4 h-4" />
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-white tracking-tight truncate">
                {selectedInitiative.name}
              </span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                selectedInitiative.status === 'ACTIVE_DEVELOPMENT'
                  ? 'text-cyan-400 bg-cyan-950/40 border-cyan-800/60'
                  : selectedInitiative.status === 'UNDER_DEVELOPMENT_RND'
                  ? 'text-amber-400 bg-amber-950/40 border-amber-800/60'
                  : 'text-slate-400 bg-slate-950 border-slate-800'
              }`}>
                {selectedInitiative.status === 'ACTIVE_DEVELOPMENT' ? 'FLAGSHIP' : selectedInitiative.status.replace(/_/g, ' ')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate mt-0.5">
              {selectedInitiative.tagline}
            </p>
          </div>
        </div>

        <ChevronDown className="w-4 h-4 text-slate-400 ml-2 shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-slate-950 border border-slate-800 shadow-2xl p-2 space-y-1">
            <div className="px-2 py-1.5 text-[10px] uppercase tracking-wider font-mono text-slate-400 border-b border-slate-800">
              Select Strategic Initiative
            </div>

            {PRODUCT_INITIATIVES.map((initiative) => {
              const ItemIcon = getIcon(initiative.id);
              const isSelected = initiative.id === selectedInitiativeId;

              return (
                <div
                  key={initiative.id}
                  onClick={() => {
                    onSelectInitiative(initiative.id);
                    setIsOpen(false);
                  }}
                  className={`p-2.5 rounded-lg cursor-pointer transition-colors flex items-start justify-between gap-2 ${
                    isSelected 
                      ? 'bg-slate-800/80 border border-cyan-500/50' 
                      : 'hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-start space-x-2.5 overflow-hidden">
                    <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 mt-0.5 shrink-0">
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span className="truncate">{initiative.name}</span>
                        {initiative.status === 'UNDER_DEVELOPMENT_RND' && (
                          <span className="text-[9px] text-amber-400 font-mono">
                            [R&D ONLY]
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {initiative.description}
                      </p>
                    </div>
                  </div>

                  <EvidenceBadge status={initiative.evidenceStatus} size="xs" />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
