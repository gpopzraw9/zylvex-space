/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SecurityPolicyBanner } from './components/SecurityPolicyBanner';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { BusinessIntelligenceView } from './components/BusinessIntelligenceView';
import { SalesPipelineView } from './components/SalesPipelineView';
import { EngineeringOperationsView } from './components/EngineeringOperationsView';
import { ProductPortfolioView } from './components/ProductPortfolioView';
import { PartnershipsView } from './components/PartnershipsView';
import { MarketingIntelligenceView } from './components/MarketingIntelligenceView';
import { FinancialIntelligenceView } from './components/FinancialIntelligenceView';
import { GovernanceSecurityView } from './components/GovernanceSecurityView';
import { FounderDecisionsView } from './components/FounderDecisionsView';
import { ReportExportModal } from './components/ReportExportModal';
import { ProductInitiativeId } from './types/operations';
import { Lock, FileText, ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<ProductInitiativeId>('ZYLVEX_SPACE');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  const getDomainTitle = (tab: string) => {
    switch (tab) {
      case 'overview': return 'Executive Overview';
      case 'bi': return 'Business Intelligence';
      case 'sales': return 'Sales & CRM Deals';
      case 'engineering': return 'Engineering Operations';
      case 'portfolio': return 'Product Portfolio';
      case 'partnerships': return 'Partnerships & Funding';
      case 'marketing': return 'Marketing Intelligence';
      case 'finance': return 'Financial Intelligence';
      case 'governance': return 'Governance & Security';
      case 'founder': return 'Founder Command Centre';
      default: return 'Corporate Console';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Read-Only Security Policy Banner */}
      <SecurityPolicyBanner />

      {/* Main Corporate Workspace with Persistent Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Persistent Collapsible Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          selectedInitiativeId={selectedInitiativeId}
          onSelectInitiative={setSelectedInitiativeId}
          onOpenReport={() => setIsReportOpen(true)}
        />

        {/* Operational Viewport */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Operational Header */}
          <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <span className="text-white font-bold">ZYLVEX SPACE</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-cyan-400 font-semibold">{getDomainTitle(activeTab)}</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Scope: {selectedInitiativeId.replace(/_/g, ' ')}</span>
              </div>

              <button
                onClick={() => setIsReportOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-medium transition-colors"
                title="View & Export Full Operational Report"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Operational Report</span>
              </button>
            </div>
          </header>

          {/* Active Domain Body */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {activeTab === 'overview' && (
              <ExecutiveOverview 
                onNavigate={(tabId) => setActiveTab(tabId)} 
                selectedInitiativeId={selectedInitiativeId}
              />
            )}

            {activeTab === 'bi' && <BusinessIntelligenceView />}

            {activeTab === 'sales' && <SalesPipelineView />}

            {activeTab === 'engineering' && <EngineeringOperationsView />}

            {activeTab === 'portfolio' && (
              <ProductPortfolioView
                selectedInitiativeId={selectedInitiativeId}
                onSelectInitiative={setSelectedInitiativeId}
              />
            )}

            {activeTab === 'partnerships' && <PartnershipsView />}

            {activeTab === 'marketing' && <MarketingIntelligenceView />}

            {activeTab === 'finance' && <FinancialIntelligenceView />}

            {activeTab === 'governance' && <GovernanceSecurityView />}

            {activeTab === 'founder' && <FounderDecisionsView />}
          </main>

          {/* Global Footer */}
          <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-xs text-slate-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-slate-300">Zylvex Technologies Ltd</span>
                <span className="text-slate-700">•</span>
                <span className="text-cyan-400 font-mono">ZYLVEX SPACE</span>
                <span className="text-slate-700">•</span>
                <span className="italic">"Your World, Digitally Measured."</span>
              </div>

              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="flex items-center text-emerald-400">
                  <Lock className="w-3 h-3 mr-1" />
                  READ-ONLY ACTIVE
                </span>
                <span className="text-slate-700">•</span>
                <span className="text-slate-400">Ref: ARCH-REF-V2.0</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Full Structured Implementation Report Modal */}
      <ReportExportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </div>
  );
}
