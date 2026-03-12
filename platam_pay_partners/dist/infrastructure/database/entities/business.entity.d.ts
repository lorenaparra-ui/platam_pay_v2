import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class BusinessEntity extends BaseExternalIdEntity {
    userId: number;
    cityId: number | null;
    entityType: string;
    businessName: string | null;
    businessAddress: string | null;
    businessType: string | null;
    relationshipToBusiness: string | null;
    legalName: string | null;
    tradeName: string | null;
    taxId: string | null;
    yearOfEstablishment: number | null;
}
