export interface PartnerLinkData {
  /** String del id interno del partner en BD (suppliers_schema.partners.id). */
  readonly partnerId: string;
  /** external_id UUID del registro en suppliers_schema.sales_representatives. */
  readonly salesRepresentativeExternalId: string;
}

/**
 * Lee el vínculo usuario → partner desde suppliers_schema.sales_representatives.
 * Retorna null si el usuario no tiene fila en esa tabla.
 */
export interface PartnerLinkReaderPort {
  find_by_user_internal_id(user_internal_id: number): Promise<PartnerLinkData | null>;
}
