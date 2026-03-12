import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class SalesRepresentativeEntity extends BaseExternalIdEntity {
    partnerId: number;
    userId: number | null;
    name: string;
    role: string;
    statusId: number;
}
