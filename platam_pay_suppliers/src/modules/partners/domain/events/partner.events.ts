/**
 * Eventos de dominio del flujo de creación de partner (event-driven).
 * Nombres alineados con simulación de cola (ej. SQS).
 */

/** Payload del evento: solicitud de subida de logos */
export interface PartnerLogoUploadRequestedPayload {
  correlation_id: string;
  partner_external_id?: string;
  business_id: number;
  business_external_id: string;
  logo_buffer: Buffer;
  logo_content_type: string;
  logo_filename: string;
  co_branding_logo_buffer: Buffer;
  co_branding_logo_content_type: string;
  co_branding_logo_filename: string;
}

/** Resultado del handler de logos (para orquestación síncrona o callback) */
export interface PartnerLogoUploadCompletedPayload {
  correlation_id: string;
  business_id: number;
  logo_url: string;
  co_branding_logo_url: string;
}

/** Payload del evento: crear categorías y credit facility en products */
export interface PartnerCategoriesCreateRequestedPayload {
  correlation_id: string;
  partner_id: number;
  partner_external_id: string;
  business_id: number;
  categories: PartnerCategoryEventItem[];
}

export interface PartnerCategoryEventItem {
  name: string;
  term_days: number;
  delay_days: number;
  discount_percentage: number;
  interest_rate: number;
  disbursement_fee_percent: number;
  minimum_disbursement_fee: number;
}

/** Payload del evento: crear usuario principal en transversal */
export interface PartnerUserCreateRequestedPayload {
  correlation_id: string;
  partner_external_id: string;
  business_id: number;
  first_name: string;
  last_name: string;
  document_type: string;
  document_number: string;
  email: string;
  phone: string;
}

/** Nombres de eventos (topic/pattern) */
export const PARTNER_EVENTS = {
  LOGO_UPLOAD_REQUESTED: "partner.logo.upload.requested",
  LOGO_UPLOAD_COMPLETED: "partner.logo.upload.completed",
  LOGO_UPLOAD_FAILED: "partner.logo.upload.failed",
  CATEGORIES_CREATE_REQUESTED: "partner.categories.create.requested",
  USER_CREATE_REQUESTED: "partner.user.create.requested",
} as const;

export type PartnerEventName =
  (typeof PARTNER_EVENTS)[keyof typeof PARTNER_EVENTS];
