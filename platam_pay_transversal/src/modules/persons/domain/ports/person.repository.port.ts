import { Person } from '../models/person.model';

export const PERSONS_REPOSITORY = 'PERSONS_REPOSITORY';

export interface CreatePersonPayload {
  userId: number;
  countryCode?: string;
  firstName: string;
  lastName: string;
  docType: string;
  docNumber: string;
  docIssueDate?: Date;
  birthDate?: Date;
  gender?: string;
  phone?: string;
  residentialAddress?: string;
  businessAddress?: string;
  cityId?: number;
}

export type UpdatePersonPayload = Partial<CreatePersonPayload>;

export interface PersonRepositoryPort {
  findAll(): Promise<Person[]>;
  findById(id: number): Promise<Person | null>;
  findByExternalId(externalId: string): Promise<Person | null>;
  create(payload: CreatePersonPayload): Promise<Person>;
  updateByExternalId(
    externalId: string,
    payload: UpdatePersonPayload,
  ): Promise<Person | null>;
  deleteByExternalId(externalId: string): Promise<boolean>;
}
