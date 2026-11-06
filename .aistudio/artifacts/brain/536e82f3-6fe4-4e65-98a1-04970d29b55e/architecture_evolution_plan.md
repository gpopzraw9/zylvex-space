# ZYLVEX TECHNOLOGIES LTD
## UNIFIED CORPORATE INTELLIGENCE & OPERATIONS PLATFORM
### ARCHITECTURE & COMPONENT REFINEMENT PLAN (v2.0.0)

**Author:** Digital Operations Architect & Principal Software Architect  
**Corporate Authority:** Zylvex Technologies Ltd  
**Product Authority:** ZYLVEX SPACE (*"Your World, Digitally Measured"*)  
**Security Posture:** STRICT READ-ONLY ACTIVE (Non-Negotiable)  
**Document Status:** Architecture Proposal & Staging Specification (Subject to Founder Review)

---

## 1. EXECUTIVE CONTEXT & PURPOSE

This plan addresses the **Design Evolution Directive** issued by the founder: evolving the current *Zylvex Digital Operations Architecture* and integrating the business intelligence vision of the *Zylvex Sales Dashboard* into a single, authoritative corporate operating platform.

### Core Unification Principle
Rather than maintaining two disparate tools:
1. **The Digital Operations Architecture** provides the security spine, governance gates, statutory identity checklists, OAuth threat matrices, and founder command controls.
2. **The Sales Dashboard** provides commercial visibility, revenue telemetry, pipeline deal tracking, lead management, and product portfolio oversight.

Together, they form the **Zylvex Corporate Intelligence & Operations Platform** — the central nervous system for running the enterprise.

---

## 2. CRITICAL AUDIT CORRECTIONS (ASSUMPTION REMOVAL)

In strict adherence to the founder's directive, all operational assumptions from the initial turn are corrected and categorized into an explicit **Evidence & Authority Taxonomy**:

| Data Item | Previous Stated Classification | Corrected Operational Status | Authoritative Note |
|---|---|---|---|
| **Deal Size Bands (£25k / £50k)** | Stated as baseline thresholds | **PROPOSED BENCHMARK (Pending Founder Ratification)** | These values represent proposed initial scoping guidelines, NOT operational business policy. |
| **Composio Connection State** | Stated as quarantined / downgraded | **EXPOSURE IDENTIFIED (Proposed Action Pending Authorization)** | Connections were analyzed in read-only audit. No external account modifications or revocations have been executed without explicit founder authorization. |
| **HubSpot Pipeline Probabilities & Custom Properties** | Stated as active schemas | **PROPOSED BLUEPRINT (Design Proposal)** | Defined as candidate data schemas, NOT live or established business requirements. |
| **Historical & Current Revenue Figures** | None fabricated | **UNAVAILABLE / PRE-COMMERCIAL (£0.00 Live)** | Distinguishes actual recorded billing from pipeline projections and future market targets. |

---

## 3. UNIFIED NAVIGATION ARCHITECTURE

The platform will transition from horizontal phase tabs into a **persistent, collapsible sidebar** supporting 10 functional enterprise domains, responsive across desktop (1440px baseline), tablet, and mobile:

```
┌────────────────────────────────────────────────────────────────────────┐
│  ZYLVEX SPACE • READ-ONLY ENFORCED • Corporate Intelligence Console    │
├───────────────┬────────────────────────────────────────────────────────┤
│ SIDEBAR       │ MAIN OPERATIONAL VIEWPORT                              │
│ (Collapsible) │                                                        │
│               │  [Portfolio Switcher: ZYLVEX SPACE | HarmoniaXR ...]  │
│ 1. Executive  │  [Evidence Badge: VERIFIED • PROPOSED • ESTIMATE]     │
│    Overview   │                                                        │
│ 2. Business   │  [Active Domain Screen]                                │
│    Intell.    │                                                        │
│ 3. Sales &    │                                                        │
│    CRM        │                                                        │
│ 4. Engineering│                                                        │
│    Operations │                                                        │
│ 5. Product    │                                                        │
│    Portfolio  │                                                        │
│ 6. Partner-   │                                                        │
│    ships      │                                                        │
│ 7. Marketing  │                                                        │
│    Intell.    │                                                        │
│ 8. Financial  │                                                        │
│    Intell.    │                                                        │
│ 9. Governance │                                                        │
│    & Security │                                                        │
│ 10. Founder   │                                                        │
│     Command   │                                                        │
└───────────────┴────────────────────────────────────────────────────────┘
```

### Domain Navigation Scope:

1. **Executive Overview:** Consolidated KPI cards distinguishing *Actual (Verified)*, *Pipeline (Proposed)*, and *Targets (Estimates)*; active phase gates, security status, and open founder blockers.
2. **Business Intelligence:** Interactive commercial performance analytics, conversion ratios, average deal progression velocity, and regional opportunity distribution.
3. **Sales & CRM:** The 4 proposed HubSpot pipelines (Engineering Services, Industrial DX, Institutional Training, Strategic Partnerships) with deal stage boards, lead triage, and qualification gate trackers.
4. **Engineering Operations:** Core spatial computation metrics, geometry accuracy benchmarks (sub-millimeter / centimeter), WebGPU/Three.js render stress logs, and technical deliverables roadmap.
5. **Product Portfolio:** Dedicated operational views and roadmaps for each strategic initiative:
   - **ZYLVEX SPACE:** Flagship spatial intelligence platform (Active development).
   - **HarmoniaXR:** Active R&D / Under Development (Strict non-commercial containment).
   - **ZylForge:** CAD & manufacturing automation toolchain (Proposed / R&D).
   - **ZylCode:** Developer SDK, computational geometry APIs, and marketplace credits (Proposed).
   - **Institutional Edition:** Separately governed sovereign/academic edition.
6. **Partnerships & Funding:** OEM hardware vendors (LiDAR, spatial sensors), systems integrators, university research frameworks, and grant funding pipelines.
7. **Marketing Intelligence:** Inbound demand telemetry, technical whitepaper downloads, developer community engagement, and trade symposium strategy (Hannover Messe, AU).
8. **Financial Intelligence:** Pre-revenue burn tracking, commercial services pricing models, multi-currency invoicing frameworks (GBP, EUR, USD), and Zylvex Space Credits (ZSC) tokenomics blueprint.
9. **Governance & Security:** Phase 0 Corporate Identity Checklist, Composio OAuth Scope Matrices, Dangerous Tools Quarantine Registry, and Zero-Write Policy Monitor.
10. **Founder Command Centre:** High-priority decision queue, evidence upload vault, risk mitigation matrix, and one-click export of formal governance reports.

---

## 4. FOUR-TIER EVIDENCE & DATA INTEGRITY LAYER

Every metric, card, table row, and recommendation throughout the platform will carry an explicit, visual **Evidence Badge**:

1. **[VERIFIED EVIDENCE] (Emerald):** Supported by statutory documentation, verified configuration, or audited fact (e.g., HarmoniaXR status as "Under Development", read-only policy enforcement).
2. **[PROPOSED DESIGN] (Cyan/Sky):** Architecture proposal or recommendation awaiting founder confirmation (e.g., 4 HubSpot pipeline structures, proposed contract bands).
3. **[ESTIMATE / TARGET] (Purple):** Mathematical projection, stage probability, or market sizing figure (e.g., deal duration SLAs, win probabilities).
4. **[DATA UNAVAILABLE] (Slate/Amber):** Metric represents operational activity that has not yet occurred (e.g., live closed revenue, live customer counts prior to CRM deployment).

---

## 5. REFINEMENT STAGES & EXECUTION ROADMAP

### Stage 1: Data Model & Evidence Refinement (Current Step)
- Refactor `src/types/operations.ts` and `src/data/operationsData.ts`.
- Introduce `EvidenceStatus` (`VERIFIED`, `PROPOSED`, `ESTIMATE`, `UNAVAILABLE`).
- Update existing items with explicit evidence sources and audit tags.
- Remove hardcoded claims of executed external write actions.

### Stage 2: Persistent Sidebar & Portfolio Architecture
- Create `src/components/Sidebar.tsx` with collapsible states and mobile drawer.
- Create `src/components/PortfolioSwitcher.tsx` with initiative selector (ZYLVEX SPACE, HarmoniaXR, ZylForge, ZylCode, Institutional).
- Create `src/components/EvidenceBadge.tsx` reusable component.

### Stage 3: Business Intelligence & Sales Pipeline Integration
- Build `src/components/BusinessIntelligenceView.tsx` with high-contrast charts and revenue models.
- Build `src/components/SalesPipelineView.tsx` incorporating the Nexora-style deal stage board and lead triage.

### Stage 4: Product Portfolio & Financial Intelligence Modules
- Build `src/components/ProductPortfolioView.tsx` with dedicated tabs for each product initiative.
- Build `src/components/FinancialIntelligenceView.tsx` with cash runway, pricing tiers, and ZSC blueprint.

### Stage 5: Preservation & Verification
- Seamlessly mount all existing components (Phase 0 Identity, Phase 1 Composio, OAuth Scopes, HubSpot Schemas, Founder Decisions, Risk Matrix, Report Export) within the new 10-domain architecture.
- Verify zero regressions with `compile_applet` and `lint_applet`.
