export class Shareholder {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly companyId: number,
    public readonly personId: number,
    /** Porcentaje de participación como string (decimal 5,4) para evitar precisión flotante */
    public readonly ownershipPercentage: string | null,
    public readonly evaluationOrder: number | null,
    public readonly creditCheckRequired: boolean,
    public readonly creditCheckCompleted: boolean,
    public readonly isLegalRepresentative: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
