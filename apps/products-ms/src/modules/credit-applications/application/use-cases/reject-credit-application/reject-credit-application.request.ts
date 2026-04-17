export class RejectCreditApplicationRequest {
  constructor(
    readonly externalId: string,
    readonly rejectionReason: string,
  ) {}
}
