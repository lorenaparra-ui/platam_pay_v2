import { CategoryEntity } from '../../../products-data/src/entities/category.entity';
import { PartnerState } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';
import { SalesRepresentativeEntity } from './sales-representative.entity';
import { SupplierEntity } from './supplier.entity';
export declare class PartnerEntity extends BaseExternalIdEntity {
    business: BusinessEntity;
    supplier: SupplierEntity;
    alias: string | null;
    acronym: string | null;
    logoUrl: string | null;
    coBrandingLogoUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    lightColor: string | null;
    notificationEmail: string | null;
    webhookUrl: string | null;
    disbursementNotificationEmail: string | null;
    apiKeyHash: string | null;
    sendSalesRepVoucher: boolean;
    salesRepresentatives: SalesRepresentativeEntity[];
    categories: CategoryEntity[];
    state: PartnerState;
}
