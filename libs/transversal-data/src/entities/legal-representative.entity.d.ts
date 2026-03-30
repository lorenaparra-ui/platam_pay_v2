import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export declare class LegalRepresentativeEntity extends BaseExternalIdEntity {
    companyId: number;
    personId: number;
    isPrimary: boolean;
}
