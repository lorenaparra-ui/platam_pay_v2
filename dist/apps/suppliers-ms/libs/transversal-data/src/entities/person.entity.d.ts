import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
import { CityEntity } from './city.entity';
export declare class PersonEntity extends BaseExternalIdEntity {
    firstName: string;
    lastName: string;
    docType: string;
    docNumber: string;
    docIssueDate: Date | null;
    birthDate: Date | null;
    gender: string | null;
    phone: string | null;
    email: string | null;
    residentialAddress: string | null;
    city: CityEntity;
    cityId: number;
    bankAccountId: number | null;
}
