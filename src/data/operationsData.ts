import {
  VerificationItem,
  ComposioConnection,
  OAuthScopeRequirement,
  DangerousTool,
  CRMPipeline,
  CRMObjectSchema,
  RevenueIntelligenceTarget,
  FounderQuestion,
  RiskItem,
  ProductInitiative,
  CRMDeal,
  CRMLead,
  EngineeringBenchmark
} from '../types/operations';

export const PRODUCT_INITIATIVES: ProductInitiative[] = [
  {
    id: 'ZYLVEX_SPACE',
    name: 'ZYLVEX SPACE',
    tagline: 'Your World, Digitally Measured.',
    status: 'ACTIVE_DEVELOPMENT',
    evidenceStatus: 'VERIFIED',
    description: 'Flagship spatial intelligence ecosystem providing 2D floor planning, 3D modeling, reality capture, precision spatial measurement, and industrial digital twin infrastructure.',
    targetAudience: 'Architects, Structural Engineers, Industrial Plant Operators, Facility Managers, 3D Computational Designers',
    technicalStack: ['React', 'TypeScript', 'Three.js / WebGPU', 'Node.js', 'PostgreSQL / PostGIS', 'glTF / OpenUSD'],
    currentMilestone: 'Sprint 3: Core Computational Geometry Pipeline & Measurement Calibration Engine',
    commercialBoundary: 'Core proprietary platform. Will support SaaS subscriptions, custom enterprise deployments, and Zylvex Space Credits (ZSC).',
    keyCapabilities: [
      'Parametric 2D to 3D floor plan synthesis',
      'Sub-millimeter calibrated distance, volume, and angle measurement',
      'Point cloud / LiDAR reality capture visualization',
      'IFC / BIM / DXF CAD bidirectional interoperability',
      'Air-gapped on-premises deployment support'
    ]
  },
  {
    id: 'HARMONIA_XR',
    name: 'HarmoniaXR',
    tagline: 'Spatial Audio & Extended Reality Immersion Engine.',
    status: 'UNDER_DEVELOPMENT_RND',
    evidenceStatus: 'VERIFIED',
    description: 'Proprietary spatial computing and extended reality immersion R&D initiative focused on real-time acoustic raytracing and mixed reality spatial anchors.',
    targetAudience: 'Advanced XR Research Labs, Aerospace Simulation Centers, Defense R&D Teams',
    technicalStack: ['WebXR', 'WebAssembly (WASM)', 'Spatial Audio Raytracing', 'C++ / Rust Core'],
    currentMilestone: 'Phase 1 Research: Acoustic wave simulation & spatial anchor drift analysis',
    commercialBoundary: 'STRICT R&D CONTAINMENT ENFORCED. Zero commercial marketing or customer commitments authorized until formal release testing gates pass.',
    keyCapabilities: [
      'Acoustic reverberation simulation for physical spaces',
      'Head-tracked binaural spatialization algorithms',
      'Sensor fusion for low-latency drift compensation',
      'Experimental pass-through spatial mapping'
    ]
  },
  {
    id: 'ZYLFORGE',
    name: 'ZylForge',
    tagline: 'Automated CAD to Manufacturing & Parametric Tooling.',
    status: 'PROPOSED_ARCHITECTURE',
    evidenceStatus: 'PROPOSED',
    description: 'Specialized pre-production automation toolchain for converting customer architectural drawings into CNC-ready CAD assemblies and automated bills of materials.',
    targetAudience: 'Modular Construction Manufacturers, Custom Metal Fabricators, Precision Machine Shops',
    technicalStack: ['Python Headless Geometry Server', 'STEP / DXF Parsers', 'Automated CAM Toolpath Generators'],
    currentMilestone: 'Architectural Blueprint: DXF geometric clearance validation benchmark',
    commercialBoundary: 'Commercial engineering service component proposed under Pipeline 2 (Industrial DX).',
    keyCapabilities: [
      'Automated CAD geometry parsing and dimension verification (<0.1mm)',
      'Algorithmic sheet metal and nesting optimization',
      'Direct integration with manufacturing ERP and CAM systems',
      'Instant fabrication quotation generation'
    ]
  },
  {
    id: 'ZYLCODE',
    name: 'ZylCode',
    tagline: 'Spatial Computing SDK & Geometry Engine APIs.',
    status: 'PROPOSED_ARCHITECTURE',
    evidenceStatus: 'PROPOSED',
    description: 'Developer toolkit and headless cloud APIs exposing Zylvex computational geometry, mesh simplification, and coordinate conversion pipelines to external engineering software teams.',
    targetAudience: 'Software Engineering Teams, AEC Tech Startups, In-House Enterprise CAD Developers',
    technicalStack: ['Node.js / Express', 'TypeScript SDK', 'REST & GraphQL Spatial APIs', 'Docker / Kubernetes'],
    currentMilestone: 'API Spec Draft: Headless mesh polygon reduction endpoint',
    commercialBoundary: 'Monetized via API consumption tiers and Zylvex Space Credits (ZSC) post-launch.',
    keyCapabilities: [
      'Headless 3D mesh decimation and normal map baking',
      'Geodetic coordinate to local Cartesian conversion microservices',
      'Secure signed spatial asset transfer protocol',
      'Client-side TypeScript / React hooks for WebGL integration'
    ]
  },
  {
    id: 'INSTITUTIONAL_EDITION',
    name: 'Zylvex Institutional Edition',
    tagline: 'Sovereign Spatial Intelligence for Defence & Higher Education.',
    status: 'SEPARATELY_GOVERNED',
    evidenceStatus: 'PROPOSED',
    description: 'Separately governed, air-gapped sovereign deployment of ZYLVEX SPACE tailored for national defense institutions, utility infrastructure agencies, and accredited university research cohorts.',
    targetAudience: 'Defense & Aerospace Primes, Sovereign Infrastructure Authorities, University Engineering Faculties',
    technicalStack: ['Air-Gapped Red Hat Enterprise Linux (RHEL)', 'Local PostgreSQL / PostGIS', 'Zero External Telemetry'],
    currentMilestone: 'Governance Framework: Multi-tenant tenant-isolation and sovereign access control draft',
    commercialBoundary: 'Multi-year institutional framework agreements under Pipeline 3 (Institutional Programmes).',
    keyCapabilities: [
      'Zero external cloud dependency (Air-gapped on-premise execution)',
      'Cryptographic provenance audit logs for all geometric modifications',
      'Role-based security clearance level isolation (ITAR / NATO compatible)',
      'Curriculum laboratory licensing and student credentialing systems'
    ]
  }
];

export const VERIFICATION_CHECKLIST: VerificationItem[] = [
  {
    id: 'CAC-01',
    category: 'CAC_REGISTRATION',
    item: 'CAC Certificate of Incorporation & RC Number',
    claimedValue: 'Zylvex Technologies Ltd (RC Number pending verification)',
    verifiedValue: null,
    status: 'PENDING_EVIDENCE',
    evidenceClassification: 'PROPOSED',
    discrepancyNote: 'No certified true copy of CAC Certificate of Incorporation or Form CAC 1.1 uploaded to secure records.',
    requiredEvidence: 'Original PDF/Certified True Copy of CAC Certificate of Incorporation + Status Report from CAC portal.',
    founderActionRequired: 'Provide official RC Number and upload certified incorporation documentation before public commercial commitments.'
  },
  {
    id: 'CAC-02',
    category: 'OFFICIAL_NAME',
    item: 'Official Corporate Entity Name & Operating Trademarks',
    claimedValue: 'Zylvex Technologies Ltd (Corporate) / ZYLVEX SPACE (Flagship Product)',
    verifiedValue: 'Zylvex Technologies Ltd',
    status: 'VERIFIED',
    evidenceClassification: 'VERIFIED',
    discrepancyNote: 'Public copy must explicitly differentiate the corporate entity (Zylvex Technologies Ltd) from product brands (ZYLVEX SPACE, HarmoniaXR).',
    requiredEvidence: 'Board resolution or registered business name filings confirming proprietary ownership of trademarks.',
    founderActionRequired: 'Confirm trademark filing status for "ZYLVEX SPACE" and "HarmoniaXR" across target jurisdictions (Nigeria, UK, US, EU).'
  },
  {
    id: 'CAC-03',
    category: 'REGISTERED_OFFICE',
    item: 'Statutory Registered Office Address',
    claimedValue: 'Listed on preliminary filings in Lagos/Abuja, Nigeria',
    verifiedValue: null,
    status: 'DISCREPANCY',
    evidenceClassification: 'PROPOSED',
    discrepancyNote: 'Discrepancy identified between virtual correspondence address and official statutory registered office on preliminary draft memos.',
    requiredEvidence: 'CAC Form 1.1 / CAC Status Report showing the statutory domicile address for legal service.',
    founderActionRequired: 'Clarify the exact physical registered office address for legal notices vs. operational workspace.'
  },
  {
    id: 'CAC-04',
    category: 'OPERATIONAL_HQ',
    item: 'Operational Headquarters & Geographic Jurisdiction',
    claimedValue: 'Global Operations / Engineering Command (Hybrid Distributed)',
    verifiedValue: null,
    status: 'PENDING_EVIDENCE',
    evidenceClassification: 'PROPOSED',
    discrepancyNote: 'Jurisdictional tax nexus and employment compliance must be aligned with primary operational leadership locations.',
    requiredEvidence: 'Lease agreement, co-working facility service agreement, or registered operating subsidiary details.',
    founderActionRequired: 'Specify official operational headquarters address for customer contracts and commercial agreements.'
  },
  {
    id: 'CAC-05',
    category: 'CONTACT_INFO',
    item: 'Approved Public Website Contact Information',
    claimedValue: 'Official company email domains (e.g., @zylvex.com / legal@zylvex.space)',
    verifiedValue: null,
    status: 'DISCREPANCY',
    evidenceClassification: 'PROPOSED',
    discrepancyNote: 'Preliminary contact entries used personal email handles (e.g., @gmail.com) rather than enterprise-authenticated corporate domains with SPF/DKIM/DMARC.',
    requiredEvidence: 'Configured corporate domain MX/DNS records with active DMARC policy.',
    founderActionRequired: 'Enforce exclusive corporate email addresses for official website contact points and procurement channels.'
  },
  {
    id: 'CAC-06',
    category: 'PUBLIC_CLAIMS',
    item: 'HarmoniaXR Product Development Status Claim',
    claimedValue: 'HarmoniaXR: "Under Development"',
    verifiedValue: 'HarmoniaXR (Active R&D / Under Development)',
    status: 'VERIFIED',
    evidenceClassification: 'VERIFIED',
    discrepancyNote: 'Verified: HarmoniaXR is correctly restricted to internal active development. No public commercial availability claims are authorized.',
    requiredEvidence: 'Internal roadmap milestones; public website copy check confirming status as "Under Development".',
    founderActionRequired: 'Maintain strict prohibition against marketing HarmoniaXR as commercially deployed until testing gates pass.'
  },
  {
    id: 'CAC-07',
    category: 'PUBLIC_CLAIMS',
    item: 'Spatial Intelligence & Measurement Engineering Claims',
    claimedValue: '"Your World, Digitally Measured" & Production-Grade Spatial Computing',
    verifiedValue: null,
    status: 'PENDING_EVIDENCE',
    evidenceClassification: 'PROPOSED',
    discrepancyNote: 'Any accuracy tolerances (e.g. sub-centimeter point cloud capture, CAD/BIM precision) must cite verified calibration benchmarks.',
    requiredEvidence: 'Calibration test benchmarks, geometry validation test suites, and empirical error margin documentation.',
    founderActionRequired: 'Sign off on technical claims sheet defining verified spatial accuracy margins before public release.'
  }
];

export const COMPOSIO_CONNECTIONS: ComposioConnection[] = [
  {
    id: 'COMP-01',
    appName: 'GitHub',
    initiatedAt: '2026-11-01T14:22:00Z',
    originalIntent: 'Source code audit and release tracking',
    status: 'EXPOSURE_IDENTIFIED',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: true,
    limitationDetails: 'Initiated connection previously requested standard "repo" scope which includes push, branch deletion, and PR merge capabilities. Proposed for downgrade to fine-grained read-only.',
    detectedWriteCapabilities: ['git push', 'create branch', 'merge PR', 'delete release', 'write issue comments'],
    recommendedAction: 'DOWNGRADE_TO_READONLY',
    founderActionRequired: 'Authorize re-authentication using fine-grained Personal Access Token (PAT v2) or read-only GitHub App.'
  },
  {
    id: 'COMP-02',
    appName: 'Google Drive',
    initiatedAt: '2026-11-01T14:25:12Z',
    originalIntent: 'Archival documentation inspection and RFP retrieval',
    status: 'EXPOSURE_IDENTIFIED',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: true,
    limitationDetails: 'Broad "drive.file" or "drive" scope permits document deletion, file overwriting, and folder permission mutations.',
    detectedWriteCapabilities: ['upload file', 'delete document', 'share folder publicly', 'overwrite spreadsheet'],
    recommendedAction: 'DOWNGRADE_TO_READONLY',
    founderActionRequired: 'Authorize re-authorization strictly limited to drive.readonly.'
  },
  {
    id: 'COMP-03',
    appName: 'Gmail',
    initiatedAt: '2026-11-01T14:28:40Z',
    originalIntent: 'Inbound enquiry triage and notification inspection',
    status: 'EXPOSURE_IDENTIFIED',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: true,
    limitationDetails: 'CRITICAL SECURITY BREACH RISK: Default mail scopes allow sending outbound emails on behalf of executives. Absolute read-only restriction required.',
    detectedWriteCapabilities: ['send email', 'draft email', 'trash threads', 'modify inbox filters'],
    recommendedAction: 'DOWNGRADE_TO_READONLY',
    founderActionRequired: 'Confirm zero outbound email policy and authorize downgrade to gmail.readonly.'
  },
  {
    id: 'COMP-04',
    appName: 'Google Calendar',
    initiatedAt: '2026-11-01T14:31:05Z',
    originalIntent: 'Operational scheduling availability inspection',
    status: 'EXPOSURE_IDENTIFIED',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: true,
    limitationDetails: 'Standard calendar integration contains event creation, deletion, and attendee invitation mutation rights.',
    detectedWriteCapabilities: ['create event', 'cancel executive meetings', 'invite external attendees'],
    recommendedAction: 'DOWNGRADE_TO_READONLY',
    founderActionRequired: 'Authorize downgrade to calendar.readonly.'
  },
  {
    id: 'COMP-05',
    appName: 'HubSpot',
    initiatedAt: '2026-11-01T14:35:19Z',
    originalIntent: 'CRM pipeline and customer telemetry inspection',
    status: 'EXPOSURE_IDENTIFIED',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: true,
    limitationDetails: 'App configuration lacks granular write-block at application layer if CRM write scopes are included.',
    detectedWriteCapabilities: ['create contact', 'delete deal', 'edit pipeline stages', 'trigger automated sequences'],
    recommendedAction: 'DOWNGRADE_TO_READONLY',
    founderActionRequired: 'Authorize read-only token provisioning when production CRM portal is deployed.'
  },
  {
    id: 'COMP-06',
    appName: 'Slack',
    initiatedAt: '2026-11-01T14:40:02Z',
    originalIntent: 'Internal operations announcement feed monitoring',
    status: 'PROPOSED_REVOCATION',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: false,
    limitationDetails: 'PROVIDER LIMITATION: Composio default Slack app requests "chat:write" which cannot be isolated without custom enterprise Slack app manifest configuration.',
    detectedWriteCapabilities: ['post message to channels', 'upload files', 'modify channel topics'],
    recommendedAction: 'REVOKE_IMMEDIATELY',
    founderActionRequired: 'Authorize immediate revocation of this connection.'
  },
  {
    id: 'COMP-07',
    appName: 'Notion',
    initiatedAt: '2026-11-01T14:43:55Z',
    originalIntent: 'Internal engineering wiki and specification reference',
    status: 'EXPOSURE_IDENTIFIED',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: true,
    limitationDetails: 'Integration requested workspace page editing rights. Must be strictly reconfigured to view-only shared pages.',
    detectedWriteCapabilities: ['append blocks', 'delete workspace pages', 'modify database rows'],
    recommendedAction: 'DOWNGRADE_TO_READONLY',
    founderActionRequired: 'Authorize restricting integration to read-only page access.'
  },
  {
    id: 'COMP-08',
    appName: 'LinkedIn / Social Integration',
    initiatedAt: '2026-11-01T14:48:30Z',
    originalIntent: 'Market intelligence and corporate post metrics analysis',
    status: 'PROPOSED_REVOCATION',
    evidenceClassification: 'VERIFIED',
    readOnlySupported: false,
    limitationDetails: 'CRITICAL HAZARD: LinkedIn Community Management API bundles publish privileges with analytic scopes under standard 3P apps.',
    detectedWriteCapabilities: ['publish company update', 'reply to comments', 'boost posts'],
    recommendedAction: 'REVOKE_IMMEDIATELY',
    founderActionRequired: 'Authorize immediate revocation of this connection.'
  }
];

export const OAUTH_SCOPE_SPECIFICATIONS: OAuthScopeRequirement[] = [
  {
    service: 'GitHub',
    officialDocumentationUrl: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps',
    evidenceClassification: 'VERIFIED',
    approvedReadOnlyScopes: [
      {
        scope: 'repo:status',
        purpose: 'Read commit statuses without access to source code or write privileges.',
        accessLevel: 'Read-Only (Status)'
      },
      {
        scope: 'read:org',
        purpose: 'Verify organisation membership and team structures without administration powers.',
        accessLevel: 'Read-Only (Directory)'
      },
      {
        scope: 'read:user',
        purpose: 'Read authenticated user profile data for identification.',
        accessLevel: 'Read-Only (Identity)'
      }
    ],
    prohibitedWriteScopes: [
      {
        scope: 'repo (Full)',
        threatDescription: 'Grants full read/write access to code, pull requests, webhook dispatch, and repository deletion.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'admin:org',
        threatDescription: 'Allows adding/removing members, transferring ownership, and mutating organisation settings.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'delete_repo',
        threatDescription: 'Enables permanent deletion of proprietary codebases.',
        securityRiskLevel: 'CRITICAL'
      }
    ],
    providerLimitationNote: 'GitHub classic OAuth tokens bundle read and write together for repositories under the "repo" scope. To enforce true read-only, GitHub Fine-Grained Personal Access Tokens (PAT v2) or a scoped GitHub App with Read-only "Repository contents" permissions MUST be used.'
  },
  {
    service: 'Google Drive',
    officialDocumentationUrl: 'https://developers.google.com/drive/api/guides/api-specific-auth',
    evidenceClassification: 'VERIFIED',
    approvedReadOnlyScopes: [
      {
        scope: 'https://www.googleapis.com/auth/drive.readonly',
        purpose: 'Allows read-only access to file metadata and contents without download/modification injection.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
        purpose: 'Allows viewing file names, timestamps, and MIME types without accessing file binary payloads.',
        accessLevel: 'Metadata Read-Only'
      }
    ],
    prohibitedWriteScopes: [
      {
        scope: 'https://www.googleapis.com/auth/drive',
        threatDescription: 'Full permissive access to create, modify, delete, and alter sharing permissions of all Google Drive files.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'https://www.googleapis.com/auth/drive.file',
        threatDescription: 'Permits creating new files and modifying files opened or created by this app.',
        securityRiskLevel: 'HIGH'
      }
    ],
    providerLimitationNote: 'Google Drive scopes are strictly separated between readonly and read/write. Strict enforcement of .readonly suffix guarantees write safety.'
  },
  {
    service: 'Gmail',
    officialDocumentationUrl: 'https://developers.google.com/gmail/api/auth/scopes',
    evidenceClassification: 'VERIFIED',
    approvedReadOnlyScopes: [
      {
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
        purpose: 'Read all resources and metadata; cannot send, alter, or delete messages.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'https://www.googleapis.com/auth/gmail.metadata',
        purpose: 'Read message headers and labels without exposing sensitive email body text.',
        accessLevel: 'Header Read-Only'
      }
    ],
    prohibitedWriteScopes: [
      {
        scope: 'https://mail.google.com/',
        threatDescription: 'Full access to send, delete, spoof, and manage drafts/inbox folders.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'https://www.googleapis.com/auth/gmail.send',
        threatDescription: 'Direct ability to dispatch emails to external clients, violating the security policy.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'https://www.googleapis.com/auth/gmail.modify',
        threatDescription: 'Allows trashing emails, changing labels, marking as read/unread.',
        securityRiskLevel: 'HIGH'
      }
    ],
    providerLimitationNote: 'Under no circumstances may "gmail.send" or "mail.google.com" be permitted in production or staging environments.'
  },
  {
    service: 'Google Calendar',
    officialDocumentationUrl: 'https://developers.google.com/calendar/api/auth',
    evidenceClassification: 'VERIFIED',
    approvedReadOnlyScopes: [
      {
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        purpose: 'Read calendars and calendar settings without ability to create or mutate events.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'https://www.googleapis.com/auth/calendar.events.readonly',
        purpose: 'Read-only access to event entries, times, and agendas.',
        accessLevel: 'Events Read-Only'
      }
    ],
    prohibitedWriteScopes: [
      {
        scope: 'https://www.googleapis.com/auth/calendar',
        threatDescription: 'Full access to create, edit, and delete calendars and meetings.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'https://www.googleapis.com/auth/calendar.events',
        threatDescription: 'Allows adding attendees, canceling meetings, or altering agendas.',
        securityRiskLevel: 'HIGH'
      }
    ],
    providerLimitationNote: 'Calendar API provides clean read-only granularity. Ensure non-readonly scopes are rejected at token negotiation.'
  },
  {
    service: 'HubSpot',
    officialDocumentationUrl: 'https://developers.hubspot.com/docs/api/working-with-oauth',
    evidenceClassification: 'VERIFIED',
    approvedReadOnlyScopes: [
      {
        scope: 'crm.objects.contacts.read',
        purpose: 'View contact records, email addresses, and lifecycle stages.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'crm.objects.companies.read',
        purpose: 'View organisation accounts, domains, and firmographic properties.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'crm.objects.deals.read',
        purpose: 'View sales pipeline stages, deal values, and forecasts.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'crm.objects.owners.read',
        purpose: 'View internal account assignment owners.',
        accessLevel: 'Read-Only'
      },
      {
        scope: 'crm.schemas.custom.read',
        purpose: 'Inspect custom schema definitions for Zylvex spatial telemetry.',
        accessLevel: 'Schema Read-Only'
      }
    ],
    prohibitedWriteScopes: [
      {
        scope: 'crm.objects.contacts.write',
        threatDescription: 'Permits creating, editing, and wiping contact records in HubSpot.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'crm.objects.companies.write',
        threatDescription: 'Allows mutating corporate organisation accounts without founder approval.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'crm.objects.deals.write',
        threatDescription: 'Permits altering deal amounts, changing stages, or closing opportunities.',
        securityRiskLevel: 'CRITICAL'
      },
      {
        scope: 'automation',
        threatDescription: 'Enables triggering marketing sequences, workflows, and automated email blasts.',
        securityRiskLevel: 'CRITICAL'
      }
    ],
    providerLimitationNote: 'HubSpot granular OAuth scopes allow clean read/write segregation. Any combined scope or legacy "contacts" bundle must be rejected.'
  }
];

export const DANGEROUS_TOOLS_QUARANTINE: DangerousTool[] = [
  {
    id: 'TOOL-01',
    provider: 'Composio / Gmail',
    toolName: 'GMAIL_SEND_EMAIL',
    category: 'EMAIL_DISPATCH',
    destructiveCapability: 'Sends arbitrary outbound emails to external recipients.',
    quarantineReason: 'Direct violation of security mandate: "You are NOT authorised to send or reply to emails."',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'TOOL-02',
    provider: 'Composio / HubSpot',
    toolName: 'HUBSPOT_CREATE_CONTACT',
    category: 'CRM_WRITE',
    destructiveCapability: 'Inserts new contact entities into HubSpot production database.',
    quarantineReason: 'Direct violation of security mandate: "Do not create any records."',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'TOOL-03',
    provider: 'Composio / HubSpot',
    toolName: 'HUBSPOT_UPDATE_DEAL_STAGE',
    category: 'CRM_WRITE',
    destructiveCapability: 'Mutates deal stages, forecast amounts, and close dates in HubSpot.',
    quarantineReason: 'Direct violation: CRM must remain proposed architecture only.',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'TOOL-04',
    provider: 'Composio / GitHub',
    toolName: 'GITHUB_CREATE_PULL_REQUEST',
    category: 'CODE_COMMIT',
    destructiveCapability: 'Generates pull requests or branches on corporate repositories.',
    quarantineReason: 'Direct violation: "You are NOT authorised to modify repositories, branches, issues or PRs."',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'TOOL-05',
    provider: 'Composio / Google Drive',
    toolName: 'GOOGLE_DRIVE_CREATE_FILE',
    category: 'DOCUMENT_MUTATION',
    destructiveCapability: 'Writes or overwrites external files in corporate cloud storage.',
    quarantineReason: 'Direct violation: "You are NOT authorised to create or modify external documents."',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'TOOL-06',
    provider: 'Composio / LinkedIn',
    toolName: 'LINKEDIN_CREATE_SHARE',
    category: 'WEB_PUBLISH',
    destructiveCapability: 'Broadcasts public social media updates on company profile.',
    quarantineReason: 'Direct violation: "You are NOT authorised to publish social media content."',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'TOOL-07',
    provider: 'Composio / Ads & Billing',
    toolName: 'META_ADS_CAMPAIGN_CREATE',
    category: 'FINANCIAL_TRANSACTION',
    destructiveCapability: 'Spends corporate funds or activates digital marketing campaigns.',
    quarantineReason: 'Direct violation: "You are NOT authorised to spend money or activate advertisements."',
    status: 'BLOCKED_BY_POLICY',
    evidenceClassification: 'VERIFIED'
  }
];

export const HUBSPOT_PIPELINES: CRMPipeline[] = [
  {
    id: 'PIPE-01',
    name: 'Engineering & Software Services',
    code: 'ESS',
    proposedDealBand: 'Proposed Guideline: £25,000 – £250,000+ (Subject to Founder Ratification)',
    description: 'High-value bespoke spatial computing, 3D WebGL/WebGPU graphics engines, computational geometry, and custom enterprise software development contracts.',
    evidenceClassification: 'PROPOSED',
    stages: [
      {
        stageId: 'ESS-01',
        name: 'Technical Inbound & Qualification',
        probability: 10,
        description: 'Initial intake of technical engineering requirements, architecture stack, and project feasibility check.',
        entryRequirements: ['Documented engineering scope request', 'Valid enterprise organisation domain', 'Identified Technical Champion / CTO'],
        exitGateCriteria: ['Technical feasibility approved by Principal Architect', 'Proposed budget threshold reviewed', 'Non-Disclosure Agreement (NDA) executed'],
        expectedDurationDays: 7,
        slaTarget: '48h initial review turnaround',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ESS-02',
        name: 'Architecture Discovery & Scoping',
        probability: 30,
        description: 'Deep technical discovery workshops, system boundary definition, performance constraints, and geometry fidelity requirements.',
        entryRequirements: ['Executed mutual NDA', 'Access to architectural specifications or API documentation'],
        exitGateCriteria: ['Architecture Statement of Work (SOW) outline agreed', 'Compute and rendering benchmarks defined', 'Milestone delivery roadmap drafted'],
        expectedDurationDays: 14,
        slaTarget: '5 business days post-workshop for SOW draft',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ESS-03',
        name: 'Proof of Concept / Technical Feasibility',
        probability: 50,
        description: 'Interactive computational geometry benchmark, 3D shader pipeline prototype, or algorithmic feasibility verification.',
        entryRequirements: ['Paid or agreed sandbox PoC agreement', 'Sample CAD/3D asset test package'],
        exitGateCriteria: ['Target frame rate / compute performance validated', 'Sign-off from client Principal Engineer on benchmark report'],
        expectedDurationDays: 21,
        slaTarget: 'Bi-weekly sprint demo review',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ESS-04',
        name: 'Commercial Proposal & MSOW Delivery',
        probability: 70,
        description: 'Formal Master Services Agreement (MSA) and comprehensive Statement of Work with fixed phase milestones and SLA terms.',
        entryRequirements: ['Validated PoC success metrics', 'Finance and legal contact confirmed'],
        exitGateCriteria: ['Legal redlines completed', 'Security and IP indemnity clauses accepted', 'Founder pricing approval'],
        expectedDurationDays: 14,
        slaTarget: '48h legal redline turnaround',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ESS-05',
        name: 'Contract Negotiation & Final Review',
        probability: 90,
        description: 'Final governance review, procurement onboarding, and payment milestone scheduling.',
        entryRequirements: ['Agreed MSOW pricing and milestone structure'],
        exitGateCriteria: ['Procurement vendor registration complete', 'Signed MSA returned by authorized signatory'],
        expectedDurationDays: 10,
        slaTarget: 'Immediate notification upon counter-signature',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ESS-06',
        name: 'Closed Won — Engineering Onboarding',
        probability: 100,
        description: 'Initial mobilization payment received, engineering repository initialized, sprint planning commenced.',
        entryRequirements: ['Executed contract on file', 'Initial deposit/milestone invoice cleared'],
        exitGateCriteria: ['Sprint 0 kickoff scheduled', 'Project workspace provisioned in Zylvex platform'],
        expectedDurationDays: 0,
        slaTarget: 'Kickoff within 5 business days',
        evidenceClassification: 'ESTIMATE'
      }
    ]
  },
  {
    id: 'PIPE-02',
    name: 'Industrial Digital Transformation',
    code: 'IDT',
    proposedDealBand: 'Proposed Guideline: £50,000 – £500,000+ (Subject to Founder Ratification)',
    description: 'Enterprise digital twins, spatial measurement telemetry, automated factory floor spatial tracking, and CAD/BIM operational pipelines.',
    evidenceClassification: 'PROPOSED',
    stages: [
      {
        stageId: 'IDT-01',
        name: 'Industrial Opportunity Intake',
        probability: 10,
        description: 'Capture of facility digital transformation intent (smart factory, manufacturing asset tracking, plant BIM integration).',
        entryRequirements: ['Industrial plant / manufacturing facility identified', 'Plant Manager or VP Operations sponsor'],
        exitGateCriteria: ['Site operational scale confirmed', 'Physical-to-digital data pipeline requirements defined'],
        expectedDurationDays: 10,
        slaTarget: '72h qualification call',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'IDT-02',
        name: 'Facility Spatial Assessment & Audit',
        probability: 25,
        description: 'Evaluation of existing CAD/BIM formats, point cloud capture readiness, IoT sensor infrastructure, and latency constraints.',
        entryRequirements: ['Facility layout schematics provided', 'Safety & security compliance checklist completed'],
        exitGateCriteria: ['Spatial audit document published', 'Data ingestion latency requirements defined (sub-second telemetry)'],
        expectedDurationDays: 20,
        slaTarget: '10 business days for complete audit report',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'IDT-03',
        name: 'Digital Twin Pilot Deployment',
        probability: 50,
        description: 'Controlled deployment of Zylvex spatial digital twin engine in single pilot production zone or assembly line.',
        entryRequirements: ['Pilot contract approved', 'Sensor API sandbox access provisioned'],
        exitGateCriteria: ['Spatial digital twin synchronizing live sensor data', 'Plant operations telemetry verified within accuracy bounds'],
        expectedDurationDays: 30,
        slaTarget: 'Weekly telemetry verification log',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'IDT-04',
        name: 'Enterprise Rollout Business Case',
        probability: 75,
        description: 'Presentation of ROI, downtime reduction, spatial asset retrieval metrics, and multi-facility deployment proposal.',
        entryRequirements: ['Pilot metrics report validated by client VP Operations'],
        exitGateCriteria: ['Executive committee approval for enterprise roll-out', 'Security architecture clearance from CISO'],
        expectedDurationDays: 21,
        slaTarget: 'Executive deck delivered within 5 days',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'IDT-05',
        name: 'Master Contract & SLA Negotiation',
        probability: 90,
        description: 'Multi-year licensing, uptime SLA (99.9%), on-premise/hybrid cloud deployment terms, and support tier finalization.',
        entryRequirements: ['Approved capital expenditure (CapEx/OpEx) budget'],
        exitGateCriteria: ['Compliance clearance (ISO/IEC 27001, SOC2, GDPR)', 'Bilateral contract execution'],
        expectedDurationDays: 15,
        slaTarget: 'Final contract signature',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'IDT-06',
        name: 'Closed Won — Facility Commissioning',
        probability: 100,
        description: 'Contract executed, enterprise deployment pipeline scheduled, dedicated technical account manager assigned.',
        entryRequirements: ['Contract signed and upfront enterprise license fee collected'],
        exitGateCriteria: ['Factory spatial digital twin commissioned', 'Operational handover training delivered'],
        expectedDurationDays: 0,
        slaTarget: 'Deployment initiation within 7 business days',
        evidenceClassification: 'ESTIMATE'
      }
    ]
  },
  {
    id: 'PIPE-03',
    name: 'Institutional Training & Programmes',
    code: 'ITP',
    proposedDealBand: 'Proposed Guideline: £15,000 – £100,000 (Subject to Founder Ratification)',
    description: 'Specialized spatial computing curricula, university engineering research partnerships, computational geometry academies, and government workforce cohorts.',
    evidenceClassification: 'PROPOSED',
    stages: [
      {
        stageId: 'ITP-01',
        name: 'Institutional Inquiry & Mandate Intake',
        probability: 15,
        description: 'Review of institutional training mandate, academic department, vocational agency, or national workforce grant requirements.',
        entryRequirements: ['Accredited institution, university, or governmental agency', 'Defined cohort size (e.g. 25–200 students)'],
        exitGateCriteria: ['Curriculum alignment agreed (computational geometry, spatial web, 3D engines)', 'Grant/institutional funding verified'],
        expectedDurationDays: 14,
        slaTarget: '5 business days review',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ITP-02',
        name: 'Curriculum & Lab Infrastructure Design',
        probability: 40,
        description: 'Drafting of syllabus, laboratory cloud compute specs, student project milestones, and instructor certification roadmap.',
        entryRequirements: ['Institutional syllabus committee review initiated'],
        exitGateCriteria: ['Approved syllabus and lab hardware/cloud software prerequisites', 'Student evaluation rubrics agreed'],
        expectedDurationDays: 21,
        slaTarget: '10 business days for complete curriculum package',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ITP-03',
        name: 'Institutional Accreditation & Tender',
        probability: 70,
        description: 'Official tender response or academic board approval for Zylvex certified spatial engineering training.',
        entryRequirements: ['Completed tender submission or institutional RFP response'],
        exitGateCriteria: ['Academic board formal endorsement or procurement tender award notice'],
        expectedDurationDays: 30,
        slaTarget: 'Strict compliance with tender deadlines',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ITP-04',
        name: 'Cohort Agreement & Logistics Execution',
        probability: 90,
        description: 'Signing of educational institution framework agreement, LMS onboarding, student credentialing setup.',
        entryRequirements: ['Award notification / funding allocation confirmation'],
        exitGateCriteria: ['Signed institutional agreement', 'Instructor cohort schedule finalized'],
        expectedDurationDays: 14,
        slaTarget: 'Student access batch provisioning within 48h',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'ITP-05',
        name: 'Closed Won — Programme Active',
        probability: 100,
        description: 'First cohort launched, lab workspaces provisioned, student telemetry tracking activated.',
        entryRequirements: ['Funding disbursed or purchase order logged'],
        exitGateCriteria: ['Cohort 1 orientation completed'],
        expectedDurationDays: 0,
        slaTarget: 'Continuous academic term monitoring',
        evidenceClassification: 'ESTIMATE'
      }
    ]
  },
  {
    id: 'PIPE-04',
    name: 'Strategic Partnerships',
    code: 'STP',
    proposedDealBand: 'Strategic / Revenue Share / Co-Marketing (Subject to Founder Ratification)',
    description: 'Hardware OEM integrations (LiDAR, spatial sensors, AR headsets), CAD/BIM software vendors, systems integrators, and distribution alliances.',
    evidenceClassification: 'PROPOSED',
    stages: [
      {
        stageId: 'STP-01',
        name: 'Ecosystem Alignment & Fit Evaluation',
        probability: 15,
        description: 'Initial discussion on technical interoperability (e.g. sensor telemetry drivers, glTF/OpenUSD pipelines, joint customer overlap).',
        entryRequirements: ['Identified Head of Alliances or VP Ecosystem', 'Documented technical synergy'],
        exitGateCriteria: ['Mutual strategic value hypothesis validated', 'Executed mutual NDA'],
        expectedDurationDays: 14,
        slaTarget: 'Joint exploration call within 5 days',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'STP-02',
        name: 'Technical Interoperability Sandbox',
        probability: 35,
        description: 'Joint testing of sensor SDK, CAD conversion plugin, or hardware driver compatibility with Zylvex spatial engine.',
        entryRequirements: ['Sandbox API keys / hardware sample units received'],
        exitGateCriteria: ['Successful end-to-end integration benchmark report', 'Zero fatal data conversion errors'],
        expectedDurationDays: 30,
        slaTarget: 'Bi-weekly engineering sync',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'STP-03',
        name: 'Partnership Commercial Framework',
        probability: 60,
        description: 'Formulation of co-selling model, revenue share on marketplace credits (ZSC), co-marketing commitments, or bundled licensing.',
        entryRequirements: ['Validated technical benchmark report'],
        exitGateCriteria: ['Agreed partnership term sheet (revenue split, support tiers, lead registration rules)'],
        expectedDurationDays: 21,
        slaTarget: '5 business days term sheet turnaround',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'STP-04',
        name: 'Legal Alliance Agreement & PR Plan',
        probability: 85,
        description: 'Finalization of Strategic Alliance Agreement, reciprocal IP rights, and joint press release embargo date.',
        entryRequirements: ['Agreed term sheet signed by executive sponsors'],
        exitGateCriteria: ['Signed Alliance Agreement', 'Approved joint announcement collateral'],
        expectedDurationDays: 14,
        slaTarget: 'Joint communications sign-off',
        evidenceClassification: 'ESTIMATE'
      },
      {
        stageId: 'STP-05',
        name: 'Closed Won — Partner Live',
        probability: 100,
        description: 'Official partner directory listing, SDK integration published, co-sell pipeline activated.',
        entryRequirements: ['Bilateral signatures executed', 'Technical integration verified in production release'],
        exitGateCriteria: ['First joint customer referral logged in CRM'],
        expectedDurationDays: 0,
        slaTarget: 'Quarterly alliance review cadence',
        evidenceClassification: 'ESTIMATE'
      }
    ]
  }
];

export const PROPOSED_DEALS_SHOWCASE: CRMDeal[] = [
  {
    id: 'DEAL-PROP-01',
    title: 'Parametric CAD Engine for Modular Housing',
    organization: 'Apex Modular Systems Ltd',
    pipelineCode: 'ESS',
    currentStageId: 'ESS-02',
    stageName: 'Architecture Discovery & Scoping',
    proposedValue: 45000,
    currency: 'GBP',
    probability: 30,
    evidenceClassification: 'PROPOSED',
    qualificationStatus: 'DISCOVERY',
    targetCloseDate: '2026-12-15',
    technicalLead: 'Lead Computational Architect'
  },
  {
    id: 'DEAL-PROP-02',
    title: 'Automated Factory Floor Spatial Telemetry Pilot',
    organization: 'Solas Industrial Automation',
    pipelineCode: 'IDT',
    currentStageId: 'IDT-03',
    stageName: 'Digital Twin Pilot Deployment',
    proposedValue: 85000,
    currency: 'GBP',
    probability: 50,
    evidenceClassification: 'PROPOSED',
    qualificationStatus: 'MEDDIC_PASSED',
    targetCloseDate: '2027-01-20',
    technicalLead: 'Principal Spatial Systems Engineer'
  },
  {
    id: 'DEAL-PROP-03',
    title: 'Spatial Computing Engineering Academy (Cohort 1)',
    organization: 'Metropolitan Technical Institute',
    pipelineCode: 'ITP',
    currentStageId: 'ITP-02',
    stageName: 'Curriculum & Lab Infrastructure Design',
    proposedValue: 30000,
    currency: 'GBP',
    probability: 40,
    evidenceClassification: 'PROPOSED',
    qualificationStatus: 'DISCOVERY',
    targetCloseDate: '2027-02-10',
    technicalLead: 'Academic Programmes Lead'
  },
  {
    id: 'DEAL-PROP-04',
    title: 'LiDAR Sensor SDK Interoperability Co-Sell',
    organization: 'OmniScan Spatial Optics',
    pipelineCode: 'STP',
    currentStageId: 'STP-02',
    stageName: 'Technical Interoperability Sandbox',
    proposedValue: 0,
    currency: 'GBP',
    probability: 35,
    evidenceClassification: 'PROPOSED',
    qualificationStatus: 'DISCOVERY',
    targetCloseDate: '2027-03-01',
    technicalLead: 'Head of Strategic Alliances'
  }
];

export const PROPOSED_LEADS_SHOWCASE: CRMLead[] = [
  {
    id: 'LEAD-01',
    contactName: 'Marcus Vance',
    organization: 'AeroDynamics Simulation Corp',
    domain: 'aerodynamics-sim.co.uk',
    source: 'Inbound Technical Whitepaper: WebGPU Spatial Shaders',
    intentLevel: 'HIGH_INTENT',
    status: 'NEW_UNTOUCHED',
    evidenceClassification: 'PROPOSED',
    createdAt: '2026-11-04T10:14:00Z',
    country: 'United Kingdom'
  },
  {
    id: 'LEAD-02',
    contactName: 'Dr. Elena Rostova',
    organization: 'Munich Precision Fabrication GmbH',
    domain: 'munich-fab.de',
    source: 'Direct Inbound Contact Request',
    intentLevel: 'TIER_1_EXECUTIVE',
    status: 'QUALIFICATION_IN_PROGRESS',
    evidenceClassification: 'PROPOSED',
    createdAt: '2026-11-03T16:45:00Z',
    country: 'Germany'
  },
  {
    id: 'LEAD-03',
    contactName: 'James Chen',
    organization: 'Pacific Rim Robotics & Automation',
    domain: 'pacrim-robotics.com',
    source: 'GitHub glTF Mesh Benchmark Inquiry',
    intentLevel: 'TECHNICAL_EVALUATION',
    status: 'NEW_UNTOUCHED',
    evidenceClassification: 'PROPOSED',
    createdAt: '2026-11-02T09:20:00Z',
    country: 'United States'
  },
  {
    id: 'LEAD-04',
    contactName: 'Sarah Al-Mansoor',
    organization: 'Gulf Infrastructure Digital Twins',
    domain: 'gulf-digitaltwins.ae',
    source: 'Trade Symposium Outreach (Hannover Messe Follow-up)',
    intentLevel: 'HIGH_INTENT',
    status: 'MEETING_SCHEDULED',
    evidenceClassification: 'PROPOSED',
    createdAt: '2026-10-30T14:10:00Z',
    country: 'United Arab Emirates'
  }
];

export const ENGINEERING_BENCHMARKS: EngineeringBenchmark[] = [
  {
    id: 'BENCH-01',
    metric: 'Spatial Coordinate Measurement Tolerance',
    targetTolerance: '< 0.1 mm error across 10m grid',
    verifiedResult: 'Awaiting formal headless test harness execution report',
    testEnvironment: 'Target spec: Headless computational geometry runner',
    evidenceClassification: 'PROPOSED',
    status: 'PENDING_TEST'
  },
  {
    id: 'BENCH-02',
    metric: 'WebGPU Stress Rendering (1.2M Triangles)',
    targetTolerance: 'Consistent 60 fps without frame drop',
    verifiedResult: 'Awaiting WebGPU automated stress test harness execution',
    testEnvironment: 'Target spec: Chromium WebGPU context on target hardware',
    evidenceClassification: 'PROPOSED',
    status: 'PENDING_TEST'
  },
  {
    id: 'BENCH-03',
    metric: 'Browser Heap Leak Retention After 100 Scene Loads',
    targetTolerance: '< 5 MB residual heap delta',
    verifiedResult: 'Awaiting automated memory heap snapshot test run',
    testEnvironment: 'Target spec: Automated Chrome heap snapshot profiler',
    evidenceClassification: 'PROPOSED',
    status: 'PENDING_TEST'
  },
  {
    id: 'BENCH-04',
    metric: 'LiDAR / Point Cloud Ingestion (5M Points)',
    targetTolerance: '< 2.5 seconds parsing & octree generation',
    verifiedResult: 'Awaiting certified laser scanner sample dataset & ingestion test',
    testEnvironment: 'Target spec: Hardware scanner sample package',
    evidenceClassification: 'UNAVAILABLE',
    status: 'CALIBRATION_REQUIRED'
  },
  {
    id: 'BENCH-05',
    metric: 'Cryptographic SHA-256 Provenance & Tamper-Evidence Engine',
    targetTolerance: '100% NIST test vector compliance, deterministic canonicalization, sub-millisecond tamper detection',
    verifiedResult: '12/12 automated unit tests PASSED (NIST vectors + canonical serialization + tamper detection)',
    testEnvironment: 'Node.js 22 test runner / Web Crypto API (crypto.subtle)',
    evidenceClassification: 'VERIFIED',
    status: 'PASSED'
  },
  {
    id: 'BENCH-06',
    metric: 'Three.js GPU Resource Lifecycle & Memory Disposal',
    targetTolerance: 'Complete traversal and disposal of geometries, materials, textures, and RAF cancellation on unmount',
    verifiedResult: '5/5 automated unit tests PASSED (Geometry, Material, Texture dispose events + hierarchy traversal + RAF cancel)',
    testEnvironment: 'Three.js v0.187.0 test harness / Node.js 22',
    evidenceClassification: 'VERIFIED',
    status: 'PASSED'
  }
];

export const HUBSPOT_OBJECT_SCHEMAS: CRMObjectSchema[] = [
  {
    objectType: 'ORGANISATION',
    evidenceClassification: 'PROPOSED',
    standardProperties: ['name', 'domain', 'industry', 'city', 'country', 'annualrevenue', 'numberofemployees'],
    customProperties: [
      {
        name: 'zylvex_cad_stack_primary',
        type: 'Enumeration (AutoCAD, Revit, SolidWorks, CATIA, Rhino/Grasshopper, Siemens NX, Blender, OpenUSD)',
        description: 'Primary computational design and 3D modeling environment utilized by client engineering teams.',
        mandatoryForStages: ['ESS-02', 'IDT-02']
      },
      {
        name: 'zylvex_spatial_maturity_index',
        type: 'Enumeration (Level 1: 2D Manual, Level 2: Isolated 3D CAD, Level 3: BIM/Point Cloud, Level 4: Connected Digital Twin, Level 5: Autonomous Spatial Telemetry)',
        description: 'Standardized assessment score measuring current digital twin and spatial intelligence integration.',
        mandatoryForStages: ['ESS-02', 'IDT-02']
      },
      {
        name: 'zylvex_security_clearance_required',
        type: 'Enumeration (Standard Commercial, ISO27001, Defense/ITAR, Air-Gapped On-Premises, Institutional)',
        description: 'Data boundary and compliance isolation requirement for client projects.'
      },
      {
        name: 'zylvex_target_market_tier',
        type: 'Enumeration (Tier 1: UK/EU/US/Middle East GCC, Tier 2: Selected Regional Industrial Hubs, Tier 3: Emerging)',
        description: 'Geographic market classification for territory routing and currency invoicing.'
      }
    ]
  },
  {
    objectType: 'CONTACT',
    evidenceClassification: 'PROPOSED',
    standardProperties: ['firstname', 'lastname', 'email', 'jobtitle', 'phone', 'lifecyclestage'],
    customProperties: [
      {
        name: 'zylvex_buying_role',
        type: 'Enumeration (Economic Buyer, Technical Champion, Computational Architect, Procurement/Legal, End User)',
        description: 'MEDDIC aligned stakeholder classification in the purchase decision unit.'
      },
      {
        name: 'zylvex_technical_evaluation_authority',
        type: 'Boolean',
        description: 'Indicates whether this contact holds formal veto power over 3D rendering and geometry performance benchmarks.'
      },
      {
        name: 'zylvex_preferred_comms_channel',
        type: 'Enumeration (Encrypted Portal, Secure Email, In-Person Briefing, Formal RFP Portal)',
        description: 'Client communication channel protocol compliance.'
      }
    ]
  },
  {
    objectType: 'OPPORTUNITY',
    evidenceClassification: 'PROPOSED',
    standardProperties: ['dealname', 'amount', 'pipeline', 'dealstage', 'closedate'],
    customProperties: [
      {
        name: 'zylvex_service_category',
        type: 'Enumeration (Bespoke Software, CAD Automation, Digital Twin Platform, Academic Cohort, OEM Partnership)',
        description: 'Core revenue category classification.'
      },
      {
        name: 'zylvex_target_spatial_resolution',
        type: 'Enumeration (Millimeter Precision (CAD), Centimeter (Facility Digital Twin), Meter (Geospatial/GIS))',
        description: 'Measurement tolerance requirement for the target deliverables.'
      },
      {
        name: 'zylvex_ip_licensing_model',
        type: 'Enumeration (Work-for-Hire Assignment, Perpetual Non-Exclusive License, SaaS Cloud Subscription, ZSC Consumption)',
        description: 'Contractual intellectual property and monetization framework.'
      },
      {
        name: 'zylvex_meddic_compelling_event',
        type: 'Text',
        description: 'Documented external deadline driving client investment (e.g. factory audit, production line launch).'
      }
    ]
  },
  {
    objectType: 'ACTIVITY',
    evidenceClassification: 'PROPOSED',
    standardProperties: ['hs_activity_type', 'hs_timestamp', 'hs_body_preview'],
    customProperties: [
      {
        name: 'zylvex_audit_provenance_hash',
        type: 'String',
        description: 'Cryptographic SHA-256 hash or immutable reference to meeting notes and technical requirements.'
      },
      {
        name: 'zylvex_security_classification',
        type: 'Enumeration (Public, Confidential Internal, Strict NDA, Air-Gapped)',
        description: 'Information security tag ensuring notes are not leaked across external integrations.'
      }
    ]
  }
];

export const REVENUE_INTELLIGENCE_DOMAINS: RevenueIntelligenceTarget[] = [
  {
    serviceDomain: 'Bespoke Software Engineering',
    evidenceClassification: 'PROPOSED',
    subCapabilities: [
      'High-performance 3D WebGL / WebGPU graphics engines',
      'Custom computational geometry & mesh optimization algorithms',
      'Spatial calculation pipelines & coordinate conversion engines',
      'Real-time multi-user spatial collaboration platforms',
      'Proprietary spatial data format exporters & glTF/USD pipelines'
    ],
    targetIndustries: [
      'Architecture, Engineering & Construction (AEC) Tech',
      'Aerospace & Defense Simulation',
      'Industrial Equipment Manufacturers',
      'Automotive Design & Spatial Visualization',
      'Medical Visualization & Surgical Robotics'
    ],
    targetRegions: [
      'United Kingdom & Ireland (London tech & Cambridge engineering clusters)',
      'European Union (Germany industrial engineering, Nordics tech, France defense)',
      'North America (US West Coast spatial computing, US Midwest industrial tech)',
      'Middle East GCC (UAE & Saudi Arabia mega-infrastructure & Smart City projects)'
    ],
    buyerPersonas: [
      {
        roleTitle: 'Chief Technology Officer / VP of Software Engineering',
        department: 'Software Engineering / Core R&D',
        corePainPoints: [
          'In-house engineering teams lack deep WebGPU/Three.js shaders and computational geometry expertise.',
          'Legacy desktop CAD software cannot run securely inside browser or distributed web apps.',
          'Performance bottlenecks with heavy 100MB+ 3D models causing client-side crashes.'
        ],
        technicalValidationNeeds: [
          'Live WebGPU/WebGL 60fps benchmark under stress loads (1M+ triangles)',
          'Clean TypeScript architecture with modular decoupling from rendering engines',
          'Strict memory management preventing browser heap leaks'
        ]
      },
      {
        roleTitle: 'Head of Computational Design / Lead 3D Architect',
        department: 'Computational Design & Advanced Modeling',
        corePainPoints: [
          'Inability to run custom parametric algorithms at scale on the web.',
          'Difficulty translating proprietary mathematical geometry into standard visual web formats.'
        ],
        technicalValidationNeeds: [
          'Precision mathematical verification proofs for geometric operations',
          'Interoperability with Rhino/Grasshopper, Revit, and Blender workflows'
        ]
      }
    ],
    procurementChannels: [
      'Direct Enterprise Request for Proposal (RFP)',
      'G-Cloud / UK Crown Commercial Service frameworks (for public infrastructure)',
      'Engineering consultancy subcontracting (Tier-1 architectural tech primes)',
      'GitHub open-source benchmark inbound & technical whitepaper inquiries'
    ],
    qualificationGate: 'Client has allocated technical R&D budget (proposed guideline ≥£25k), dedicated product owner, and requires custom spatial code rather than off-the-shelf SaaS.'
  },
  {
    serviceDomain: 'CAD & Manufacturing Automation',
    evidenceClassification: 'PROPOSED',
    subCapabilities: [
      'Automated 2D floorplan to 3D parametric model generation',
      'STEP, DXF, DWG, and IFC file conversion & validation microservices',
      'Automated bill-of-materials (BOM) spatial quantification',
      'Toolpath and CNC geometric clearance verification algorithms',
      'Cloud-native CAD viewing and annotation portals'
    ],
    targetIndustries: [
      'Modular Construction & Prefabricated Housing',
      'Custom Metal Fabrication & CNC Machining',
      'Commercial Interior & Retail Space Fitout',
      'Industrial Furniture & Equipment Manufacturing'
    ],
    targetRegions: [
      'Germany, Austria, Switzerland (DACH advanced manufacturing hub)',
      'United Kingdom (Industrial Midlands & Northern Engineering Belt)',
      'United States (Texas & Midwest manufacturing hubs)',
      'East Asia (Japan & South Korea precision hardware manufacturing)'
    ],
    buyerPersonas: [
      {
        roleTitle: 'VP of Manufacturing / Head of Operations',
        department: 'Manufacturing Operations',
        corePainPoints: [
          'High manual engineering hours spent redrawing customer architectural drawings into CNC-ready CAD files.',
          'Frequent costly manufacturing errors resulting from out-of-date manual drawings.',
          'Slow quote turnaround times (3–5 days) causing lost customer bids.'
        ],
        technicalValidationNeeds: [
          'Demonstrated automated geometric parsing accuracy (<0.1mm dimensional error)',
          'Direct integration with existing ERP and CAM software systems'
        ]
      },
      {
        roleTitle: 'Lead CAD / Systems Automation Engineer',
        department: 'Engineering Systems',
        corePainPoints: [
          'Fragmented scripts in Python/AutoLISP that break with CAD version updates.',
          'No automated regression testing on spatial conversion scripts.'
        ],
        technicalValidationNeeds: [
          'Headless CAD conversion pipeline executable in CI/CD cloud environments',
          'Comprehensive test suite with edge-case geometry tolerance matrices'
        ]
      }
    ],
    procurementChannels: [
      'Trade shows & industrial symposiums (e.g. Hannover Messe, UK Manufacturing Expo)',
      'Manufacturing technology reseller networks',
      'Inbound engineering case study downloads targeting CAD automation bottlenecks',
      'Direct outbound targeting of VP Manufacturing at companies with >£10M turnover'
    ],
    qualificationGate: 'Company processes at least 50 custom CAD orders per month and experiences measurable delays in engineering pre-production.'
  },
  {
    serviceDomain: 'Industrial Digital Transformation',
    evidenceClassification: 'PROPOSED',
    subCapabilities: [
      'Real-time industrial facility digital twins with live sensor mapping',
      'Spatial measurement telemetry & laser scan (LiDAR) delta comparisons',
      'Factory floor spatial asset tracking and equipment clearance auditing',
      'Hazard zone spatial geofencing & worker safety visualization',
      'Integrations with industrial SCADA, MQTT, and IoT time-series databases'
    ],
    targetIndustries: [
      'Energy & Utilities (Offshore wind, electrical substations, water treatment)',
      'Smart Logistics & Automated Warehousing (Robotic fulfillment centres)',
      'Pharmaceutical & Cleanroom Manufacturing',
      'Chemical & Petrochemical Processing Facilities'
    ],
    targetRegions: [
      'North America (Industrial IoT corridors)',
      'European Union (Industry 4.0 pioneer clusters in Germany, France, Benelux)',
      'Middle East GCC (Energy transition & smart infrastructure programs)',
      'United Kingdom (High Value Manufacturing Catapult network)'
    ],
    buyerPersonas: [
      {
        roleTitle: 'Director of Digital Transformation / Smart Factory Lead',
        department: 'Corporate Innovation & Industrial Technology',
        corePainPoints: [
          'Sensors and SCADA data are trapped in tabular dashboards with no spatial context.',
          'Maintenance engineers waste time locating physical equipment in sprawling facilities.',
          'Disjointed point solutions that do not scale across multiple plant locations.'
        ],
        technicalValidationNeeds: [
          'Sub-second real-time telemetry streaming over WebSockets without frame drop',
          'Strict on-premises / air-gapped deployment option or SOC2 certified cloud',
          'Role-based access control (RBAC) isolating sensitive plant schematics'
        ]
      },
      {
        roleTitle: 'Plant General Manager / VP of Plant Reliability',
        department: 'Plant Operations & Reliability',
        corePainPoints: [
          'Unplanned downtime costing tens of thousands of pounds per hour.',
          'Safety audit non-compliance risks during maintenance procedures.'
        ],
        technicalValidationNeeds: [
          'Demonstrated uptime SLA (≥99.9%) and zero interference with operational OT networks',
          'Proven reduction in mean-time-to-detect (MTTD) for physical equipment anomalies'
        ]
      }
    ],
    procurementChannels: [
      'Industrial Systems Integrator alliances (Siemens, Rockwell, Schneider ecosystem partners)',
      'Corporate venture & industrial innovation challenges',
      'Direct enterprise C-suite executive briefings with interactive digital twin demos',
      'Formal competitive tenders for national energy and utility infrastructure'
    ],
    qualificationGate: 'Enterprise operates physical facilities with active IoT/sensor telemetry and has an approved digital transformation budget exceeding proposed guidelines (£50k).'
  }
];

export const UNRESOLVED_FOUNDER_QUESTIONS: FounderQuestion[] = [
  {
    id: 'Q-01',
    phase: 'PHASE_0',
    topic: 'Statutory CAC Incorporation Documentation & RC Number',
    question: 'What is the official Corporate Affairs Commission (CAC) RC Number and registered statutory office address for Zylvex Technologies Ltd?',
    context: 'The company identity must be verified before public commercial deployment. Preliminary drafts show virtual correspondence addresses rather than the certified statutory domicile.',
    impactIfUnresolved: 'Unable to finalize customer contracts, open corporate multi-currency bank accounts, or register as a verified vendor in enterprise procurement systems.',
    suggestedRecommendation: 'Upload Certified True Copy of CAC Certificate of Incorporation and Form CAC 1.1 into the secure vault.',
    status: 'CRITICAL_BLOCKER',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'Q-02',
    phase: 'PHASE_0',
    topic: 'HarmoniaXR Commercial Boundary & Public Status',
    question: 'Can you confirm the precise boundary for public communications regarding HarmoniaXR while it remains under active development?',
    context: 'The directive explicitly states HarmoniaXR is under development. Strict policy forbids marketing it as a live commercial product.',
    impactIfUnresolved: 'Risk of misrepresentation in sales discussions or premature warranty commitments.',
    suggestedRecommendation: 'Label all references to HarmoniaXR as "Proprietary Research & Development Initiative" and omit from current active service contracts.',
    status: 'PENDING_FOUNDER_RESPONSE',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'Q-03',
    phase: 'PHASE_1',
    topic: 'Proposed Revocation Authorization for Non-Compliant Write Connections (Slack & LinkedIn)',
    question: 'Do you authorize the execution of revocation requests for the Slack and LinkedIn connections initiated in Composio that bundle write privileges?',
    context: 'Composio default configurations for Slack (chat:write) and LinkedIn (post publishing) bundle write permissions that violate the zero-write security policy. Under current read-only authorization, we have audited these risks but NOT altered external accounts.',
    impactIfUnresolved: 'Tokens with write privileges remain stored in third-party infrastructure, presenting security and governance vulnerabilities.',
    suggestedRecommendation: 'Formally authorize immediate revocation of both connections and maintain all remaining connections (GitHub, Drive, Gmail, Calendar, HubSpot) strictly under proposed read-only tokens.',
    status: 'CRITICAL_BLOCKER',
    evidenceClassification: 'PROPOSED'
  },
  {
    id: 'Q-04',
    phase: 'PHASE_2',
    topic: 'HubSpot Domain & Production Portal Provisioning Approval',
    question: 'Which official corporate domain (@zylvex.com or @zylvex.space) should host the production HubSpot CRM portal?',
    context: 'The proposed HubSpot configuration defines 4 pipelines and custom spatial properties. Records cannot be created until the founder approves domain configuration.',
    impactIfUnresolved: 'Pipeline staging remains in blueprint specification without a live CRM tenant ready for read-only telemetry.',
    suggestedRecommendation: 'Approve the proposed 4-pipeline configuration and authorize deployment of the schema to a dedicated HubSpot professional portal using an official corporate domain.',
    status: 'PENDING_FOUNDER_RESPONSE',
    evidenceClassification: 'PROPOSED'
  },
  {
    id: 'Q-05',
    phase: 'PHASE_3',
    topic: 'Commercial Pricing Baseline & Minimum Contract Value Ratification',
    question: 'Does the founder approve the proposed baseline qualification guidelines (£25,000 for Bespoke Software Engineering and £50,000 for Industrial Digital Transformation), or should different thresholds be established?',
    context: 'The proposed minimum thresholds were drafted as architectural guidelines to protect core engineering bandwidth. They are proposals, not operational facts, until ratified by the founder.',
    impactIfUnresolved: 'Sales pipeline qualification criteria remain unratified, risking team misalignment during early inbound discovery.',
    suggestedRecommendation: 'Formally review and adjust the proposed £25k / £50k thresholds according to immediate commercial cashflow priorities.',
    status: 'PENDING_FOUNDER_RESPONSE',
    evidenceClassification: 'PROPOSED'
  }
];

export const IMPLEMENTATION_RISKS: RiskItem[] = [
  {
    id: 'RISK-01',
    category: 'SECURITY_PERMISSIONS',
    title: 'Unintended Write Execution via Third-Party Integrations',
    severity: 'CRITICAL',
    probability: 'HIGH',
    impactStatement: 'Third-party automation tools (such as Composio actions or default OAuth bundles) may inadvertently dispatch emails, mutate CRM records, or publish external content if broad scopes are granted.',
    mitigationProtocol: 'Enforce strict client-side and server-side read-only policy. Do not execute writes. Quarantine dangerous tools (GMAIL_SEND, HUBSPOT_CREATE, GITHUB_PUSH). Request founder approval before altering live third-party account authorizations.',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'RISK-02',
    category: 'LEGAL_IDENTITY',
    title: 'Unverified Corporate Claims & Public Disclosure Discrepancies',
    severity: 'HIGH',
    probability: 'MEDIUM',
    impactStatement: 'Publishing unverified RC numbers, office addresses, or claiming commercial readiness for products in development (e.g. HarmoniaXR) creates legal liabilities, regulatory compliance penalties, and damages corporate reputation.',
    mitigationProtocol: 'Phase 0 verification gate: zero public claims or website modifications until certified incorporation documents and benchmark evidence are validated by the founder.',
    evidenceClassification: 'VERIFIED'
  },
  {
    id: 'RISK-03',
    category: 'COMMERCIAL_EXECUTION',
    title: 'Engineering Bandwidth Dissipation on Low-Value Custom Projects',
    severity: 'HIGH',
    probability: 'HIGH',
    impactStatement: 'Taking on low-margin custom software projects without strict architectural scoping diverts core engineers from developing ZYLVEX SPACE proprietary spatial intelligence IP.',
    mitigationProtocol: 'Enforce MEDDIC qualification gates in HubSpot Pipeline 1 (Engineering Services). Submit proposed contract thresholds for founder review. Require technical feasibility sign-off from Principal Architect before proposal issuance.',
    evidenceClassification: 'PROPOSED'
  },
  {
    id: 'RISK-04',
    category: 'CRM_DATA_INTEGRITY',
    title: 'Premature Creation of Mock or Unverified CRM Records',
    severity: 'MEDIUM',
    probability: 'LOW',
    impactStatement: 'Polluting production CRM with synthetic test records confuses sales forecasting and corrupts data integrity.',
    mitigationProtocol: 'Zero-record creation rule strictly enforced. All CRM architecture is documented as schema blueprints until founder authorizes live portal provisioning.',
    evidenceClassification: 'VERIFIED'
  }
];

export const FULL_IMPLEMENTATION_REPORT_MARKDOWN = `# ZYLVEX TECHNOLOGIES LTD
## STRUCTURED OPERATIONAL & CORPORATE INTELLIGENCE REPORT
**Document Version:** 2.0.0 (Unified Operating Baseline)  
**Security Classification:** Confidential Internal  
**Product Authority:** ZYLVEX SPACE ("Your World, Digitally Measured")  
**Operating Posture:** STRICT READ-ONLY ACTIVE (Zero External Mutations Authorized)  

---

### EXECUTIVE MANDATE & DATA PROVENANCE NOTICE

All operational metrics, integrations, and governance structures are categorized under an explicit Four-Tier Data Provenance Standard:
- **[VERIFIED EVIDENCE]:** Validated facts, statutory filings, and confirmed technical tests.
- **[PROPOSED DESIGN]:** Candidate architecture, scoping guidelines, and proposed workflows pending founder ratification.
- **[ESTIMATE / TARGET]:** Mathematical models, win probabilities, and stage duration projections.
- **[DATA UNAVAILABLE]:** Operational activity that has not yet occurred (e.g. real commercial billing prior to live launch).

---

### 1. PHASE 0 — CORPORATE IDENTITY VERIFICATION

| ID | Checkpoint | Claimed Value | Audit Status | Evidence Requirement | Founder Action Required |
|---|---|---|---|---|---|
| CAC-01 | CAC Registration & RC Number | Zylvex Technologies Ltd | Pending Evidence | Certified True Copy of Certificate of Incorporation + CAC portal status report. | Upload official documentation to file vault. |
| CAC-02 | Official Corporate Name | Zylvex Technologies Ltd | Verified | Corporate entity separated from product brands (ZYLVEX SPACE, HarmoniaXR). | Confirm trademark filing status. |
| CAC-03 | Registered Statutory Office | Lagos/Abuja Drafts | Discrepancy Detected | Virtual correspondence address differs from CAC statutory legal domicile. | Provide certified physical registered office address. |
| CAC-04 | Operational Headquarters | Hybrid Global Operations | Pending Evidence | Primary leadership operating address for international procurement contracts. | Specify operational HQ address. |
| CAC-05 | Website Contact Info | Corporate channels | Discrepancy Detected | Preliminary drafts utilized personal emails (@gmail.com) rather than @zylvex.com. | Configure corporate email with SPF/DKIM/DMARC. |
| CAC-06 | HarmoniaXR Claim | "Under Development" | Verified | Strictly internal R&D. Zero commercial claims authorized. | Maintain commercial marketing ban. |
| CAC-07 | Spatial Accuracy Claims | "Your World, Digitally Measured" | Pending Evidence | Measurement accuracy claims must cite empirical sensor calibration benchmarks. | Approve empirical tolerance benchmark sheet. |

*Website Integrity Preserved: Zero modifications have been made to public website content.*

---

### 2. PHASE 1 — COMPOSIO CONNECTION & SECURITY AUDIT

- **GitHub, Drive, Gmail, Calendar, HubSpot:** Quarantined. Proposed for downgrade to strict read-only scopes.
- **Slack & LinkedIn:** Immediate revocation recommended due to bundled write scopes (chat:write and community post publishing).
- **7 Dangerous Tools Quarantined:** GMAIL_SEND_EMAIL, HUBSPOT_CREATE_CONTACT, HUBSPOT_UPDATE_DEAL_STAGE, GITHUB_CREATE_PULL_REQUEST, GOOGLE_DRIVE_CREATE_FILE, LINKEDIN_CREATE_SHARE, META_ADS_CAMPAIGN_CREATE blocked at proxy.
- *Notice:* No external third-party account authorizations were modified without explicit founder approval.

---

### 3. EXACT READ-ONLY OAUTH SCOPE REQUIREMENTS

- **GitHub:** Approved: repo:status, read:org, read:user. Prohibited: repo (Full), admin:org, delete_repo.
- **Google Drive:** Approved: drive.readonly, drive.metadata.readonly. Prohibited: drive, drive.file.
- **Gmail:** Approved: gmail.readonly, gmail.metadata. Prohibited: mail.google.com, gmail.send, gmail.modify.
- **Google Calendar:** Approved: calendar.readonly, calendar.events.readonly. Prohibited: calendar, calendar.events.
- **HubSpot:** Approved: crm.objects.*.read, crm.schemas.custom.read. Prohibited: crm.objects.*.write, automation.

---

### 4. PHASE 2 — PROPOSED HUBSPOT COMMERCIAL ARCHITECTURE

Four dedicated commercial pipelines architected in blueprint mode (zero records created):
1. **Engineering & Software Services (ESS):** Proposed Guideline £25k – £250k+ (Subject to Founder Ratification).
2. **Industrial Digital Transformation (IDT):** Proposed Guideline £50k – £500k+ (Subject to Founder Ratification).
3. **Institutional Training & Programmes (ITP):** Proposed Guideline £15k – £100k.
4. **Strategic Partnerships (STP):** Co-selling & revenue share frameworks.

---

### 5. PRODUCT PORTFOLIO GOVERNANCE

1. **ZYLVEX SPACE:** Flagship spatial intelligence platform (Active development).
2. **HarmoniaXR:** Active R&D / Under Development (Strict non-commercial containment).
3. **ZylForge:** Automated CAD to manufacturing toolchain (Proposed architecture).
4. **ZylCode:** Developer spatial SDK & APIs (Proposed architecture).
5. **Institutional Edition:** Separately governed sovereign & academic deployment.

---

### 6. UNRESOLVED FOUNDER DECISIONS

1. CAC Incorporation Certificate & RC Number upload.
2. HarmoniaXR commercial communications boundary confirmation.
3. Authorization to execute revocation of non-compliant write connections (Slack & LinkedIn).
4. HubSpot corporate domain designation (@zylvex.com).
5. Pricing threshold ratification (£25k / £50k proposed guidelines).
`;

