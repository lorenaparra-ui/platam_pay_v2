import type { CreditFacilitiesStatuses } from '@platam/shared';

export class CreateCreditFacilityRequest {
  constructor(
    readonly contract_id: string | null,
    readonly total_limit: string,
    readonly state: CreditFacilitiesStatuses,
    readonly external_id?: string,
  ) {}
}
