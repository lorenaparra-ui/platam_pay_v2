import { Statuses } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { SupplierEntity } from './supplier.entity';
export declare class PartnersEntity extends BaseExternalIdEntity {
    supplier: SupplierEntity;
    acronym: string | null;
    logoUrl: string | null;
    coBrandingLogoUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    lightColor: string | null;
    notificationEmail: string | null;
    webhookUrl: string | null;
    sendSalesRepVoucher: boolean;
    disbursementNotificationEmail: string | null;
    state: Statuses;
}
