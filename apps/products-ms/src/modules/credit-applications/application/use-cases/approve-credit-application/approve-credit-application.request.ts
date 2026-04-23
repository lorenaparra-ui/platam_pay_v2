export class ApproveCreditApplicationRequest {
  constructor(
    readonly externalId: string,
    readonly approvedCreditLine: number,
    readonly analystReport?: string | null,
  ) {}
}
