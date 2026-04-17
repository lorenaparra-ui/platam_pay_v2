import { PartnerEntity } from '@app/suppliers-data';
import { Partner } from '@modules/partners/domain/entities/partner.entity';
export declare class PartnerMapper {
    static to_domain(row: PartnerEntity): Partner;
    static from_raw_row(row: Record<string, unknown>): Partner;
}
