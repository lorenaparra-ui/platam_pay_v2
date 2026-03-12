import { BaseExternalIdEntity } from "./base-external-id.entity";
export declare class PartnerCategoriesEntity extends BaseExternalIdEntity {
    partnerId: number;
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent: string | null;
    minimumDisbursementFee: string | null;
    delayDays: number;
    termDays: number;
    statusId: number;
}
