export class SaveCreditApplicationPreStudyRequest {
  constructor(
    readonly externalId: string,
    readonly creditScore: string | null,
    readonly creditDecision: string | null,
    readonly riskProfile: string | null,
    readonly analystReport: string | null,
    readonly creditStudyDate?: Date | null,
  ) {}
}
