import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessSeniorityEntity } from './business-seniority.entity';
export declare class BusinessEntity extends BaseExternalIdEntity {
    person: PersonEntity;
    personId: number;
    businessSeniority: BusinessSeniorityEntity | null;
    businessSeniorityId: number | null;
    cityId: number | null;
    entityType: string;
    businessName: string | null;
    businessAddress: string | null;
    businessType: string | null;
    relationshipToBusiness: string | null;
    legalName: string | null;
    tradeName: string | null;
    taxId: string | null;
    yearOfEstablishment: number | null;
}
