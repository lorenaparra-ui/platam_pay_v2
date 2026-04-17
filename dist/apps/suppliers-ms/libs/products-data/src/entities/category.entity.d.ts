import { CategoryState, InstallmentFrequencyTypes, ModalityTypes } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { PartnerEntity } from '@app/suppliers-data';
import { CreditFacilityEntity } from './credit-facility.entity';
export declare class CategoryEntity extends BaseExternalIdEntity {
    name: string;
    modality: ModalityTypes;
    discountPercentage: string;
    interestRate: string;
    disbursementFeePercent: string | null;
    minimumDisbursementFee: string | null;
    delayDays: number;
    termDays: number;
    installmentFrequency: InstallmentFrequencyTypes;
    installmentCount: number;
    initialPaymentPct: string;
    state: CategoryState;
    isDefault: boolean;
    partner: PartnerEntity | null;
    partnerId: number | null;
    creditFacility: CreditFacilityEntity[];
}
