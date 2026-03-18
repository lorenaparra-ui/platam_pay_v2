export class Guarantor {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly creditApplicationId: number,
    public readonly personId: number,
    public readonly contractSignerId: number | null,
    /** personal | corporate | spousal | third_party */
    public readonly guarantorType: string,
    public readonly relationshipToApplicant: string | null,
    public readonly isPrimaryGuarantor: boolean,
    public readonly selectedAfterCreditCheck: boolean,
    public readonly signatureUrl: string | null,
    public readonly signatureDate: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
