export type BusinessEntityType = 'PN' | 'PJ';
export interface BusinessProps {
    id: number;
    externalId: string;
    userId: number;
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
export declare class Business {
    readonly id: number;
    readonly externalId: string;
    readonly userId: number;
    readonly cityId: number | null;
    readonly entityType: BusinessEntityType;
    readonly businessName: string | null;
    readonly businessAddress: string | null;
    readonly businessType: string | null;
    readonly relationshipToBusiness: string | null;
    readonly legalName: string | null;
    readonly tradeName: string | null;
    readonly taxId: string | null;
    readonly yearOfEstablishment: number | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: BusinessProps);
}
