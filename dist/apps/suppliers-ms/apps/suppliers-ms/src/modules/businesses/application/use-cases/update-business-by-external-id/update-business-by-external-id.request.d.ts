export declare class UpdateBusinessByExternalIdRequest {
    readonly external_id: string;
    readonly person_external_id: string | undefined;
    readonly city_external_id: string | null | undefined;
    readonly entity_type: string | undefined;
    readonly business_name: string | null | undefined;
    readonly business_address: string | null | undefined;
    readonly business_type: string | null | undefined;
    readonly relationship_to_business: string | null | undefined;
    readonly legal_name: string | null | undefined;
    readonly trade_name: string | null | undefined;
    readonly tax_id: string | null | undefined;
    readonly year_of_establishment: number | null | undefined;
    constructor(external_id: string, person_external_id: string | undefined, city_external_id: string | null | undefined, entity_type: string | undefined, business_name: string | null | undefined, business_address: string | null | undefined, business_type: string | null | undefined, relationship_to_business: string | null | undefined, legal_name: string | null | undefined, trade_name: string | null | undefined, tax_id: string | null | undefined, year_of_establishment: number | null | undefined);
}
