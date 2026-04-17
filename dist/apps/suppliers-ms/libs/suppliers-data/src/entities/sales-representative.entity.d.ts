import { SalesRepresentativeRecordState } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { PartnerEntity } from './partner.entity';
import { UserEntity } from '@app/transversal-data';
export declare class SalesRepresentativeEntity extends BaseExternalIdEntity {
    partner: PartnerEntity;
    partnerId: number;
    state: SalesRepresentativeRecordState;
    user: UserEntity;
    userId: number;
    is_default: boolean;
}
