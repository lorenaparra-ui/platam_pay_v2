import type { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SalesRepresentative } from '@modules/sales-representatives/domain/entities/sales-representative.entity';
export interface SalesRepresentativePublicFields {
    internal_id: number;
    external_id: string;
    partner_external_id: string;
    user_external_id: string | null;
    created_at: Date;
    updated_at: Date;
}
export declare function build_sales_representative_public_fields(rep: SalesRepresentative, lookup: SuppliersReferenceLookupPort): Promise<SalesRepresentativePublicFields | null>;
