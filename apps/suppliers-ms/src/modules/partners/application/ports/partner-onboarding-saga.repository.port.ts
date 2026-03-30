export const PARTNER_ONBOARDING_SAGA_REPOSITORY = Symbol(
  'PARTNER_ONBOARDING_SAGA_REPOSITORY',
);

export type PartnerOnboardingSagaStatus =
  | 'RUNNING'
  | 'COMPLETED'
  | 'FAILED'
  | 'COMPENSATING';

export interface PartnerOnboardingSagaRecord {
  readonly external_id: string;
  readonly correlation_id: string;
  readonly status: PartnerOnboardingSagaStatus;
  readonly current_step: number;
  readonly credit_facility_external_id: string | null;
  readonly user_external_id: string | null;
  readonly person_external_id: string | null;
  readonly business_external_id: string | null;
  readonly bank_account_external_id: string | null;
  readonly partner_external_id: string | null;
  readonly error_message: string | null;
}

export type PartnerOnboardingSagaPatch = Partial<
  Pick<
    PartnerOnboardingSagaRecord,
    | 'status'
    | 'current_step'
    | 'credit_facility_external_id'
    | 'user_external_id'
    | 'person_external_id'
    | 'business_external_id'
    | 'bank_account_external_id'
    | 'partner_external_id'
    | 'error_message'
  >
>;

export interface PartnerOnboardingSagaRepository {
  create_initial(
    record: Omit<
      PartnerOnboardingSagaRecord,
      | 'credit_facility_external_id'
      | 'user_external_id'
      | 'person_external_id'
      | 'business_external_id'
      | 'bank_account_external_id'
      | 'partner_external_id'
      | 'error_message'
    >,
  ): Promise<void>;

  update_by_external_id(
    external_id: string,
    patch: PartnerOnboardingSagaPatch,
  ): Promise<void>;
}
