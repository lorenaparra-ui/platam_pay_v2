export declare class CreatePartnerCategoryRequestDto {
    partnerExternalId: string;
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent?: string;
    minimumDisbursementFee?: string;
    delayDays: number;
    termDays: number;
    statusId?: number;
}
