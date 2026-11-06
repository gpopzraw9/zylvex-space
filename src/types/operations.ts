export type SecurityStatus = 'ENFORCED_READ_ONLY' | 'QUARANTINED' | 'PENDING_FOUNDER_VERIFICATION' | 'DISCREPANCY_DETECTED';

export type EvidenceClassification = 'VERIFIED' | 'PROPOSED' | 'ESTIMATE' | 'UNAVAILABLE';

export type ProductInitiativeId = 
  | 'ZYLVEX_SPACE' 
  | 'HARMONIA_XR' 
  | 'ZYLFORGE' 
  | 'ZYLCODE' 
  | 'INSTITUTIONAL_EDITION';

export interface ProductInitiative {
  id: ProductInitiativeId;
  name: string;
  tagline: string;
  status: 'ACTIVE_DEVELOPMENT' | 'UNDER_DEVELOPMENT_RND' | 'PROPOSED_ARCHITECTURE' | 'SEPARATELY_GOVERNED';
  evidenceStatus: EvidenceClassification;
  description: string;
  targetAudience: string;
  technicalStack: string[];
  currentMilestone: string;
  commercialBoundary: string;
  keyCapabilities: string[];
}

export interface VerificationItem {
  id: string;
  category: 'CAC_REGISTRATION' | 'REGISTERED_OFFICE' | 'OPERATIONAL_HQ' | 'OFFICIAL_NAME' | 'CONTACT_INFO' | 'PUBLIC_CLAIMS';
  item: string;
  claimedValue: string;
  verifiedValue: string | null;
  status: 'VERIFIED' | 'DISCREPANCY' | 'PENDING_EVIDENCE' | 'UNVERIFIED';
  evidenceClassification: EvidenceClassification;
  discrepancyNote?: string;
  requiredEvidence: string;
  founderActionRequired: string;
  evidenceSource?: string;
}

export interface ComposioConnection {
  id: string;
  appName: string;
  initiatedAt: string;
  originalIntent: string;
  status: 'EXPOSURE_IDENTIFIED' | 'PROPOSED_DOWNGRADE_READONLY' | 'PROPOSED_REVOCATION';
  evidenceClassification: EvidenceClassification;
  readOnlySupported: boolean;
  limitationDetails: string;
  detectedWriteCapabilities: string[];
  recommendedAction: 'REVOKE_IMMEDIATELY' | 'DOWNGRADE_TO_READONLY' | 'REJECT_APPLICATION';
  founderActionRequired: string;
}

export interface OAuthScopeRequirement {
  service: 'GitHub' | 'Google Drive' | 'Gmail' | 'Google Calendar' | 'HubSpot';
  officialDocumentationUrl: string;
  evidenceClassification: EvidenceClassification;
  approvedReadOnlyScopes: {
    scope: string;
    purpose: string;
    accessLevel: string;
  }[];
  prohibitedWriteScopes: {
    scope: string;
    threatDescription: string;
    securityRiskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  }[];
  providerLimitationNote?: string;
}

export interface DangerousTool {
  id: string;
  provider: string;
  toolName: string;
  category: 'CRM_WRITE' | 'EMAIL_DISPATCH' | 'CODE_COMMIT' | 'DOCUMENT_MUTATION' | 'FINANCIAL_TRANSACTION' | 'WEB_PUBLISH';
  destructiveCapability: string;
  quarantineReason: string;
  status: 'BLOCKED_BY_POLICY';
  evidenceClassification: EvidenceClassification;
}

export interface PipelineStage {
  stageId: string;
  name: string;
  probability: number;
  description: string;
  entryRequirements: string[];
  exitGateCriteria: string[];
  expectedDurationDays: number;
  slaTarget: string;
  evidenceClassification: EvidenceClassification;
}

export interface CRMPipeline {
  id: string;
  name: string;
  code: string;
  proposedDealBand: string;
  description: string;
  evidenceClassification: EvidenceClassification;
  stages: PipelineStage[];
}

export interface CRMDeal {
  id: string;
  title: string;
  organization: string;
  pipelineCode: 'ESS' | 'IDT' | 'ITP' | 'STP';
  currentStageId: string;
  stageName: string;
  proposedValue: number;
  currency: 'GBP' | 'USD' | 'EUR';
  probability: number;
  evidenceClassification: EvidenceClassification;
  qualificationStatus: 'UNQUALIFIED' | 'DISCOVERY' | 'MEDDIC_PASSED' | 'CONTRACT_REVIEW';
  targetCloseDate: string;
  technicalLead: string;
}

export interface CRMLead {
  id: string;
  contactName: string;
  organization: string;
  domain: string;
  source: string;
  intentLevel: 'HIGH_INTENT' | 'TIER_1_EXECUTIVE' | 'TECHNICAL_EVALUATION' | 'EXPLORATORY';
  status: 'NEW_UNTOUCHED' | 'QUALIFICATION_IN_PROGRESS' | 'MEETING_SCHEDULED' | 'CONVERTED';
  evidenceClassification: EvidenceClassification;
  createdAt: string;
  country: string;
}

export interface CRMObjectSchema {
  objectType: 'ORGANISATION' | 'CONTACT' | 'OPPORTUNITY' | 'ACTIVITY';
  evidenceClassification: EvidenceClassification;
  standardProperties: string[];
  customProperties: {
    name: string;
    type: string;
    description: string;
    mandatoryForStages?: string[];
  }[];
}

export interface RevenueIntelligenceTarget {
  serviceDomain: 'Bespoke Software Engineering' | 'CAD & Manufacturing Automation' | 'Industrial Digital Transformation';
  evidenceClassification: EvidenceClassification;
  subCapabilities: string[];
  targetIndustries: string[];
  targetRegions: string[];
  buyerPersonas: {
    roleTitle: string;
    department: string;
    corePainPoints: string[];
    technicalValidationNeeds: string[];
  }[];
  procurementChannels: string[];
  qualificationGate: string;
}

export interface FounderQuestion {
  id: string;
  phase: 'PHASE_0' | 'PHASE_1' | 'PHASE_2' | 'PHASE_3';
  topic: string;
  question: string;
  context: string;
  impactIfUnresolved: string;
  suggestedRecommendation: string;
  status: 'PENDING_FOUNDER_RESPONSE' | 'CRITICAL_BLOCKER';
  evidenceClassification: EvidenceClassification;
}

export interface RiskItem {
  id: string;
  category: 'LEGAL_IDENTITY' | 'SECURITY_PERMISSIONS' | 'CRM_DATA_INTEGRITY' | 'COMMERCIAL_EXECUTION';
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  probability: 'HIGH' | 'MEDIUM' | 'LOW';
  impactStatement: string;
  mitigationProtocol: string;
  evidenceClassification: EvidenceClassification;
}

export interface EngineeringBenchmark {
  id: string;
  metric: string;
  targetTolerance: string;
  verifiedResult: string;
  testEnvironment: string;
  evidenceClassification: EvidenceClassification;
  status: 'PASSED' | 'PENDING_TEST' | 'CALIBRATION_REQUIRED';
}
