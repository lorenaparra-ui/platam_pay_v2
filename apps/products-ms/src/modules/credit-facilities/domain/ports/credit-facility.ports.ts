import type {
  CreditFacility,
  CreateCreditFacilityProps,
  UpdateCreditFacilityProps,
} from '../models/credit-facility.models';

export interface CreditFacilityRepository {
  find_by_external_id(external_id: string): Promise<CreditFacility | null>;

  find_all(): Promise<CreditFacility[]>;

  create(props: CreateCreditFacilityProps): Promise<CreditFacility>;

  update_by_external_id(
    external_id: string,
    patch: UpdateCreditFacilityProps,
  ): Promise<CreditFacility | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
