import { BaseExternalIdEntity } from "./base-external-id.entity";
import { CreditFacilityEntity } from "./credit-facility.entity";
import { PartnerReferenceEntity } from "./partner-reference.entity";
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
    partner: PartnerReferenceEntity | null;
}
