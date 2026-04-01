export interface CreatePartnerOrchestratorCategoryItem {
  readonly name: string;
  readonly discount_percentage: string;
  readonly interest_rate: string;
  readonly disbursement_fee_percent: string | null;
  readonly minimum_disbursement_fee: string | null;
  readonly delay_days: number;
  readonly term_days: number;
}

/** Datos de representante legal; la saga asíncrona aún solo publica `operatingUser` vía SQS. */
export interface CreatePartnerOrchestratorLegalRepresentative {
  readonly first_name: string;
  readonly last_name: string;
  readonly doc_type: string;
  readonly doc_number: string;
  readonly phone: string | null;
  readonly email: string;
}

/**
 * Entrada ya mapeada desde HTTP (sin Multer): el caso de uso recibe metadatos de archivos por separado.
 */
export interface CreatePartnerOrchestratorCommand {
  /**
   * UUID v4 de ciudad en catálogo transversal (`business.cityId` en JSON HTTP).
   * En SQS create-partner-user v1.0 va en `payload.city_external_id` (snake en mensaje).
   */
  readonly city_id: string | null;
  readonly entity_type: string;
  readonly business_name: string | null;
  readonly business_address: string | null;
  readonly business_type: string | null;
  readonly relationship_to_business: string | null;
  readonly legal_name: string | null;
  readonly trade_name: string | null;
  readonly tax_id: string | null;
  readonly year_of_establishment: number | null;
  readonly bank_entity: string;
  readonly account_number: string;
  readonly acronym: string | null;

  readonly primary_color: string | null;
  readonly secondary_color: string | null;
  readonly light_color: string | null;
  readonly notification_email: string | null;
  readonly webhook_url: string | null;
  readonly send_sales_rep_voucher: boolean;
  readonly disbursement_notification_email: string | null;
  readonly contract_id: string | null;

  readonly total_limit: string;
  readonly country_code: string | null;
  readonly first_name: string;
  readonly last_name: string;
  readonly doc_type: string;
  readonly doc_number: string;
  readonly phone: string | null;
  readonly email: string;
 
  readonly legal_representative: CreatePartnerOrchestratorLegalRepresentative | null;
  readonly categories: readonly CreatePartnerOrchestratorCategoryItem[];
}
