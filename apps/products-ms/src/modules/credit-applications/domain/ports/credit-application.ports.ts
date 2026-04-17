import type {
  CreditApplication,
  CreateCreditApplicationProps,
  UpdateCreditApplicationProps,
} from '../models/credit-application.models';

export interface CreditApplicationRepository {
  find_by_external_id(external_id: string): Promise<CreditApplication | null>;

  find_all(): Promise<CreditApplication[]>;

  find_by_partner_id(partner_id: number): Promise<CreditApplication[]>;

  find_by_sales_representative_id(sales_representative_id: number): Promise<CreditApplication[]>;

  create(props: CreateCreditApplicationProps): Promise<CreditApplication>;

  update_by_external_id(
    external_id: string,
    patch: UpdateCreditApplicationProps,
  ): Promise<CreditApplication | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
