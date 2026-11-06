import React from 'react';
import { EvidenceClassification } from '../types/operations';
import { CheckCircle2, FileQuestion, TrendingUp, AlertCircle } from 'lucide-react';

interface EvidenceBadgeProps {
  status: EvidenceClassification;
  showIcon?: boolean;
  size?: 'sm' | 'xs';
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ 
  status, 
  showIcon = true,
  size = 'xs' 
}) => {
  const configs = {
    VERIFIED: {
      label: 'VERIFIED EVIDENCE',
      className: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
      icon: CheckCircle2
    },
    PROPOSED: {
      label: 'PROPOSED DESIGN',
      className: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/80',
      icon: FileQuestion
    },
    ESTIMATE: {
      label: 'ESTIMATE / TARGET',
      className: 'text-purple-400 bg-purple-950/60 border-purple-800/80',
      icon: TrendingUp
    },
    UNAVAILABLE: {
      label: 'PRE-COMMERCIAL / UNAVAILABLE',
      className: 'text-slate-400 bg-slate-900 border-slate-700',
      icon: AlertCircle
    }
  };

  const config = configs[status] || configs.PROPOSED;
  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center space-x-1 font-mono tracking-wider rounded border ${config.className} ${
      size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'
    }`}>
      {showIcon && <IconComponent className={size === 'xs' ? 'w-2.5 h-2.5 mr-0.5' : 'w-3 h-3 mr-1'} />}
      <span>{config.label}</span>
    </span>
  );
};
