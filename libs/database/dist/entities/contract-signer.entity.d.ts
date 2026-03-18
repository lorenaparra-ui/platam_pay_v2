import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class ContractSignerEntity extends BaseExternalIdEntity {
    contractId: number | null;
    personId: number | null;
    zapsignSignerToken: string | null;
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
}
