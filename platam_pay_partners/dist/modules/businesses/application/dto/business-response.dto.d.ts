import { Business } from '../../domain/models/business.model';
export declare class BusinessResponseDto {
    externalId: string;
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
    createdAt: string;
    updatedAt: string;
    static fromDomain(model: Business): BusinessResponseDto;
}
