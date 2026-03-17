import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CreditFacilityEntity } from "./credit-facility.entity";
export declare class CategoryEntity extends BaseExternalIdEntity {
    creditFacilityId: number;
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent: string | null;
    minimumDisbursementFee: string | null;
    delayDays: number;
    termDays: number;
    statusId: number;
    creditFacility: CreditFacilityEntity;
}
