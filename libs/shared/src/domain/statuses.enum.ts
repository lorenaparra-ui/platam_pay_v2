
export enum CreditFacilityState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}


export enum CategoryState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// --- products_schema — solicitudes de crédito ---

export enum CreditApplicationStatus {
  IN_PROGRESS = 'in_progress',
  DUPLICATE = 'duplicate',
  UNDER_REVIEW = 'under_review',
  SARLAFT_MATCH = 'sarlaft_match',
  EXPERIAN_QUERY_ERROR = 'experian_query_error',
  AI_AGENT_ERROR = 'ai_agent_error',
  IN_INTERVIEW = 'in_interview',
  HCPJ_QUERY_ERROR = 'hcpj_query_error',
  PENDING_AUTHORIZATION = 'pending_authorization',
  AUTHORIZED = 'authorized',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  CLOSED = 'closed',
}

/**
 * Códigos en catálogo transversal (`catalog_status_types`) para entity_type = `contracts`.
 */
export enum ContractCatalogStatus {
  PENDING = 'pending',
  SIGNED = 'signed',
  CANCELLED = 'cancelled',
}

/**
 * Códigos en catálogo para entity_type = `contract_templates`.
 */
export enum ContractTemplateCatalogStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Códigos en catálogo para entity_type = `documents`.
 */
export enum DocumentVerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

// --- suppliers_schema ---

export enum PartnerState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum SupplierState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Estado de la saga de onboarding (columna VARCHAR en BD; valores en mayúsculas).
 */
export enum PartnerOnboardingSagaStatus {
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  COMPENSATING = 'COMPENSATING',
}

export enum SalesRepresentativeRecordState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

// --- transversal_schema ---

export enum UserState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/**
 * Refleja `is_active` en filas de catálogo (`catalog_status_types`, divisas, etc.) sin imponer una columna `state` en BD.
 */
export enum CatalogActivationState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}


export enum BusinessLifecycleState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PersonRecordState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum LegalRepresentativeLifecycleState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ShareholderRecordState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum BankAccountRecordState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PurchaseOrderRecordState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum RoleDefinitionState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum PermissionDefinitionState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum RolePermissionLinkState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum BusinessSeniorityCatalogState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ExperianQueryStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export enum SarlaftCheckStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ERROR = 'error',
}


export enum LoanRequestStatus {
  DRAFT = 'draft',
  PENDING_CLIENT_APPROVAL = 'pending_client_approval',
  PENDING_PARTNER_APPROVAL = 'pending_partner_approval',
  PENDING_PLATAM_REVIEW = 'pending_platam_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}

export enum LoanStatus {
  ACTIVE = 'active',
  LATE = 'late',
  DEFAULT = 'default',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export enum DisbursementStatus {
  PENDING = 'pending',
  DISBURSED = 'disbursed',
  FAILED = 'failed',
}

export enum DisbursementBatchesStatus {
  PENDING = 'pending',
  GENERATED = 'generated',
  PROCESSING = 'processing',
  DISBURSED = 'disbursed',
  PARTIAL_FAILED = 'partial_failed',
}

export enum AdjustmentsStatus {
  PENDING = 'pending',
  APPLIED = 'applied',
}

export enum PaymentsStatus {
  APPLIED = 'applied',
  PENDING_REVIEW = 'pending_review',
  REVERSED = 'reversed',
}

export enum PaymentsMethod {
  PAYVALIDA = 'payvalida',
  TRANSFER = 'transfer',
  DEPOSIT = 'deposit',
  OTHER = 'other',
}

export enum BatchLogsStatus {
  SUCCESS = 'success',
  PARTIAL = 'partial',
  FAILED = 'failed',
}