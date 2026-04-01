import type { CreditFacilitiesStatuses } from '@platam/shared';

export class UpdateCreditFacilityByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly contract_id: string | null | undefined,
    readonly total_limit: string | undefined,
    readonly state: CreditFacilitiesStatuses | undefined,
  ) {}
}
