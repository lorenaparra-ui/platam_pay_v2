import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { Business } from '@modules/businesses/domain/entities/business.entity';
export interface BusinessPublicFields {
    internal_id: number;
    external_id: string;
    person_external_id: string;
    city_external_id: string | null;
    entity_type: string;
    business_name: string | null;
    business_address: string | null;
    business_type: string | null;
    relationship_to_business: string | null;
    legal_name: string | null;
    trade_name: string | null;
    tax_id: string | null;
    year_of_establishment: number | null;
    created_at: Date;
    updated_at: Date;
}
export declare function build_business_public_fields(business: Business, lookup: SuppliersReferenceLookupPort): Promise<BusinessPublicFields>;
