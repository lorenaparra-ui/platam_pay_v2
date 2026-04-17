import { CatalogActivationState } from '@platam/shared';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export declare class StatusEntity extends BaseExternalIdEntity {
    entityType: string;
    code: string;
    displayName: string;
    description: string | null;
    isActive: boolean;
    get state(): CatalogActivationState;
    set state(v: CatalogActivationState);
}
