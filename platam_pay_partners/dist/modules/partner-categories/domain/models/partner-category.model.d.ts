export interface PartnerCategory {
    id: number;
    externalId: string;
    partnerId: number;
    name: string;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent: string | null;
    minimumDisbursementFee: string | null;
    delayDays: number;
    termDays: number;
    statusId: number;
    createdAt: Date;
    updatedAt: Date;
}
