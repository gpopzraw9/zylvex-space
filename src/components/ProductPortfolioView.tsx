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
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Code2 
} from 'lucide-react';

interface ProductPortfolioViewProps {
  selectedInitiativeId: ProductInitiativeId;
  onSelectInitiative: (id: ProductInitiativeId) => void;
}

export const ProductPortfolioView: React.FC<ProductPortfolioViewProps> = ({
  selectedInitiativeId,
  onSelectInitiative,
}) => {
  const activeProduct = PRODUCT_INITIATIVES.find(p => p.id === selectedInitiativeId) || PRODUCT_INITIATIVES[0];

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Product Engineering</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Portfolio Architecture & Strategic R&D</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Zylvex Product Portfolio & Technical Specifications
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Independent operational boundaries, technical roadmaps, and commercial containment protocols across the 5 Zylvex strategic initiatives.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
            5 Strategic Brands Mapped
          </span>
        </div>
      </div>

      {/* Portfolio Initiative Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {PRODUCT_INITIATIVES.map((p) => {
          const Icon = getIcon(p.id);
          const isSelected = p.id === selectedInitiativeId;

          return (
            <div
              key={p.id}
              onClick={() => onSelectInitiative(p.id)}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-800 border-cyan-500 shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-950 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <EvidenceBadge status={p.evidenceStatus} size="xs" showIcon={false} />
              </div>

              <h4 className="text-sm font-bold text-white mt-2 truncate">{p.name}</h4>
              <span className={`text-[9px] font-mono block mt-0.5 ${
                p.status === 'ACTIVE_DEVELOPMENT' ? 'text-cyan-400' :
                p.status === 'UNDER_DEVELOPMENT_RND' ? 'text-amber-400' : 'text-slate-400'
              }`}>
                {p.status.replace(/_/g, ' ')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Deep Dive on Active Selected Product */}
      <div className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {React.createElement(getIcon(activeProduct.id), { className: 'w-5 h-5' })}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-white">{activeProduct.name}</h3>
                <EvidenceBadge status={activeProduct.evidenceStatus} />
              </div>
              <span className="text-xs text-cyan-400 font-mono italic">
                "{activeProduct.tagline}"
              </span>
            </div>
          </div>

          <span className="text-xs font-mono px-3 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Status: {activeProduct.status.replace(/_/g, ' ')}
          </span>
        </div>

        {/* HarmoniaXR Containment Alert if selected */}
        {activeProduct.id === 'HARMONIA_XR' && (
          <div className="p-4 rounded-lg bg-amber-950/30 border border-amber-800/80 flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <strong className="text-amber-300 uppercase font-mono tracking-wider">
                Founder Directive — R&D Containment Enforced
              </strong>
              <p className="text-slate-300 leading-relaxed">
                HarmoniaXR is strictly designated as an internal active research and development initiative. No public commercial claims, client warranties, or premature service commitments are authorized.
              </p>
            </div>
          </div>
        )}

        {/* Overview & Audience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
              Executive Description & Scope
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeProduct.description}
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              <strong className="text-slate-300">Target Audience:</strong> {activeProduct.targetAudience}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-cyan-400 block font-semibold">
              Current Engineering Milestone
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {activeProduct.currentMilestone}
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              <strong className="text-slate-300">Commercial Boundary:</strong> {activeProduct.commercialBoundary}
            </div>
          </div>
        </div>

        {/* Capabilities & Tech Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-emerald-400 block font-semibold">
              Core Technical Capabilities:
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeProduct.keyCapabilities.map((cap, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
              Technology Stack Components:
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeProduct.technicalStack.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
