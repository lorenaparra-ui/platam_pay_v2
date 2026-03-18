export class LegalRepresentative {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly companyId: number,
    public readonly personId: number,
    public readonly isPrimary: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
