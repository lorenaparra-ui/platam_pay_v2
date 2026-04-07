/**
 * Estado activo/inactivo compartido por facilidades de crédito, categorías y partners.
 * Valores alineados con ENUM PostgreSQL (`active` / `inactive`).
 */
export enum StatusesCreditFacilities {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

/** Alias histórico (facilidades, categorías, partners). */
export import Statuses = StatusesCreditFacilities;

export enum StatusesCreditApplications {
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


