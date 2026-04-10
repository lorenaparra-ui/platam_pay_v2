import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';
export declare class LegalRepresentativeEntity extends BaseExternalIdEntity {
    business: BusinessEntity;
    businessId: number;
    person: PersonEntity;
    personId: number;
    isPrimary: boolean;
}
