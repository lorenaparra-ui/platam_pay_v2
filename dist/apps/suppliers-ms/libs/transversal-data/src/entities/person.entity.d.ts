import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export declare class PersonEntity extends BaseExternalIdEntity {
    countryCode: string | null;
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
    businessAddress: string | null;
    cityId: number | null;
}
