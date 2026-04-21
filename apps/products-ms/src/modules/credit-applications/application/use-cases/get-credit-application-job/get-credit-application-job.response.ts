import type { AsyncJobStatus } from '@platam/shared';

export class GetCreditApplicationJobResponse {
  constructor(
    readonly jobId: string,
    readonly status: AsyncJobStatus,
    readonly step: string,
    readonly creditApplicationId: string | null,
    readonly errorMessage: string | null,
  ) {}
}
