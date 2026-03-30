import type {
  Person,
  CreatePersonProps,
  UpdatePersonProps,
} from '../models/person.models';

export interface PersonRepository {
  find_by_external_id(external_id: string): Promise<Person | null>;

  find_all(): Promise<Person[]>;

  create(props: CreatePersonProps): Promise<Person>;

  update_by_external_id(
    external_id: string,
    patch: UpdatePersonProps,
  ): Promise<Person | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
