import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class PersonEntity extends BaseExternalIdEntity {
    userId: number;
    countryCode: string | null;
    firstName: string;
    lastName: string;
    docType: string;
    docNumber: string;
    docIssueDate: Date | null;
    birthDate: Date | null;
    gender: string | null;
    phone: string | null;
    residentialAddress: string | null;
    businessAddress: string | null;
    cityId: number | null;
}
