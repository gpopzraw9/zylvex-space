import React from 'react';
import { EvidenceBadge } from './EvidenceBadge';
import { Megaphone, FileText, Ban, Calendar, Share2, CheckCircle2 } from 'lucide-react';

export const MarketingIntelligenceView: React.FC = () => {
  const contentPillars = [
    {
      title: 'High-Performance WebGPU Spatial Shaders',
      format: 'Technical Whitepaper & Interactive Web Benchmark',
      target: 'Chief Technology Officers, Lead Graphics Engineers, 3D Computational Architects',
      focus: 'Demonstrating 60fps rendering of 1M+ triangle assemblies in modern browsers without heap leaks.'
    },
    {
      title: 'Sub-Millimeter Calibration for Digital Twins',
      format: 'Engineering Case Study & Error Tolerance Report',
      target: 'Plant General Managers, Quality Assurance Leads, Precision Fabricators',
      focus: 'Empirical comparison between physical laser scanner tolerances and Zylvex mesh reconstruction.'
    },
    {
      title: 'Automated 2D Floor Plan to 3D Parametric CAD',
      format: 'Developer Video Demonstration & Open Benchmark',
      target: 'Modular Housing Manufacturers, Commercial Space Planners',
      focus: 'Algorithmic conversion reducing manual CAD drafting turnaround from 4 days to 45 seconds.'
    }
  ];

  const symposiums = [
    { event: 'Hannover Messe 2027 (Industrial Transformation)', location: 'Hannover, Germany', focus: 'Smart factory digital twins & industrial automation', targetQtr: 'Q2 2027' },
    { event: 'Autodesk University (AEC & Design Technology)', location: 'Las Vegas / London', focus: 'BIM interoperability & parametric computational design', targetQtr: 'Q4 2027' },
    { event: 'High Value Manufacturing Catapult Summit', focus: 'UK engineering prime subcontracting & defense simulation', location: 'Birmingham, UK', targetQtr: 'Q3 2027' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg bg-slate-900/80 border border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Demand Intelligence</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400 font-mono">Inbound Architecture & Thought Leadership</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Global Marketing Intelligence & Research Dissemination
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Inbound technical content pillars and international engineering symposium strategy. <strong>Zero ad expenditure or unsolicited outreach authorized.</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-red-400 bg-red-950/40 px-3 py-1.5 rounded border border-red-800/60 flex items-center space-x-1.5">
            <Ban className="w-3.5 h-3.5" />
            <span>Zero Paid Ads / Outbound Spam</span>
          </span>
          <EvidenceBadge status="PROPOSED" />
        </div>
      </div>

      {/* Content Pillars Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white">Technical Inbound Content Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentPillars.map((cp, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">{cp.format}</span>
                <h4 className="text-sm font-bold text-white">{cp.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{cp.focus}</p>
                <div className="pt-2 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-semibold block mb-0.5">Target Audience:</span>
                  {cp.target}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400 flex items-center">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Proposed High-Intent Pipeline Asset
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industry Trade Symposiums */}
      <div className="p-5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>Priority Industrial Trade Symposiums & Technical Conferences</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {symposiums.map((sym, i) => (
            <div key={i} className="p-3 rounded bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 font-bold">{sym.targetQtr}</span>
                <span className="text-[10px] text-slate-400">{sym.location}</span>
              </div>
              <h5 className="font-semibold text-white">{sym.event}</h5>
              <p className="text-slate-400 text-[11px]">{sym.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
