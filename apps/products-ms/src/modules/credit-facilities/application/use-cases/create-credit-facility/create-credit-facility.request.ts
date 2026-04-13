import type { CreditFacilityState } from '@platam/shared';

export class CreateCreditFacilityRequest {
  constructor(
    readonly contract_id: string | null,
    readonly total_limit: string,
    readonly state: CreditFacilityState,
    readonly business_id: number,
    readonly external_id?: string,
  ) {}
}
