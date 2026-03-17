export declare class UpdateBusinessRequestDto {
    userId?: number;
    cityId?: number | null;
    entityType?: 'PN' | 'PJ';
    businessName?: string | null;
    businessAddress?: string | null;
    businessType?: string | null;
    relationshipToBusiness?: string | null;
    legalName?: string | null;
    tradeName?: string | null;
    taxId?: string | null;
    yearOfEstablishment?: number | null;
}
