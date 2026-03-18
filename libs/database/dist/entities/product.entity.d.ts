import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CreditFacilityEntity } from "./credit-facility.entity";
import { PartnersEntity } from "./partners.entity";
/**
 * Entidad TypeORM para categories.
 * N:1 credit_facility; partner_id opcional (categoría propia del partner).
 */
export declare class CategoryEntity extends BaseExternalIdEntity {
    creditFacilityId: number;
    partnerId: number | null;
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent: string | null;
    minimumDisbursementFee: string | null;
    delayDays: number;
    termDays: number;
    statusId: number;
    creditFacility: CreditFacilityEntity;
    partner: PartnersEntity | null;
}
