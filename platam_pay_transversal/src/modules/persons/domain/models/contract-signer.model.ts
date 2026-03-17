export class ContractSigner {
  constructor(
    public readonly id: number,
    public readonly externalId: string,
    public readonly contractId: number | null,
    public readonly personId: number | null,
    public readonly zapsignSignerToken: string | null,
    public readonly statusId: number,
    public readonly signUrl: string | null,
    public readonly ipAddress: string | null,
    public readonly geoLatitude: string | null,
    public readonly geoLongitude: string | null,
    public readonly signedAt: Date | null,
    public readonly documentPhotoUrl: string | null,
    public readonly documentVersePhotoUrl: string | null,
    public readonly selfiePhotoUrl: string | null,
    public readonly signatureImageUrl: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
