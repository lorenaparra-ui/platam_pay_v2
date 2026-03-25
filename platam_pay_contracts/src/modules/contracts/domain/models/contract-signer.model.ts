export interface ContractSigner {
  id: number;
  externalId: string;
  contractId: number | null;
  personId: number | null;
  providerSignerToken: string | null;
  statusId: number;
  signUrl: string | null;
  ipAddress: string | null;
  geoLatitude: string | null;
  geoLongitude: string | null;
  signedAt: Date | null;
  documentPhotoUrl: string | null;
  documentVersePhotoUrl: string | null;
  selfiePhotoUrl: string | null;
  signatureImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
