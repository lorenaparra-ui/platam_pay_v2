import { BusinessEntity } from '@app/suppliers-data';
import { Business } from '@modules/businesses/domain/entities/business.entity';
export declare class BusinessMapper {
    static to_domain(row: BusinessEntity): Business;
    static from_raw_row(row: Record<string, unknown>): Business;
}
