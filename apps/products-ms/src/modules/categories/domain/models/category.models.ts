import type {
  CategoryState,
  InstallmentFrequencyTypes,
  ModalityTypes,
} from '@platam/shared';

export class Category {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly credit_facility_id: number | null,
    readonly partner_id: number | null,
    readonly name: string,
    readonly modality: ModalityTypes,
    readonly discount_percentage: string,
    readonly interest_rate: string,
    readonly disbursement_fee_percent: string | null,
    readonly minimum_disbursement_fee: string | null,
    readonly delay_days: number,
    readonly term_days: number,
    readonly installment_frequency: InstallmentFrequencyTypes,
    readonly installment_count: number,
    readonly initial_payment_pct: string,
    readonly state: CategoryState,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateCategoryProps {
  credit_facility_id: number;
  partner_id: number | null;
  name: string;
  modality: ModalityTypes;
  discount_percentage: string;
  interest_rate: string;
  disbursement_fee_percent: string | null;
  minimum_disbursement_fee: string | null;
  delay_days: number;
  term_days: number;
  installment_frequency: InstallmentFrequencyTypes;
  installment_count: number;
  initial_payment_pct: string;
  state: CategoryState;
}

export type UpdateCategoryProps = Partial<CreateCategoryProps>;
