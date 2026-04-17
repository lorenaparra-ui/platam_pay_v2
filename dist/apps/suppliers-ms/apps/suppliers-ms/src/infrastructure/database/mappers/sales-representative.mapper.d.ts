import { SalesRepresentativeEntity } from '@app/suppliers-data';
import { SalesRepresentative } from '@modules/sales-representatives/domain/entities/sales-representative.entity';
export declare class SalesRepresentativeMapper {
    static to_domain(row: SalesRepresentativeEntity): SalesRepresentative;
    private static loaded_user_from_row;
    static from_raw_row(row: Record<string, unknown>): SalesRepresentative;
}
