import type { Statuses } from '@platam/shared';

export class CreateCreditFacilityRequest {
  constructor(
    readonly contract_id: string | null,
    readonly total_limit: string,
    readonly state: Statuses,
    readonly external_id?: string,
  ) {}
}
