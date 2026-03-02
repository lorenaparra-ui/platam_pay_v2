export type BusinessEntityType = "PN" | "PJ";
export interface Business {
    id: number;
    externalId: string;
    userId: number;
    countryCode: string | null;
    cityId: number | null;
    entityType: BusinessEntityType;
    businessName: string | null;
    businessAddress: string | null;
    businessType: string | null;
    relationshipToBusiness: string | null;
    legalName: string | null;
    tradeName: string | null;
    taxId: string | null;
    yearOfEstablishment: number | null;
    createdAt: Date;
    updatedAt: Date;
}
