import type {
  User,
  CreateUserProps,
  UpdateUserProps,
} from '../models/user.models';

export interface UserRepository {
  find_by_external_id(external_id: string): Promise<User | null>;

  find_by_email(email: string): Promise<User | null>;

  find_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  find_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  find_all(): Promise<User[]>;

  create(props: CreateUserProps): Promise<User>;

  update_by_external_id(
    external_id: string,
    patch: UpdateUserProps,
  ): Promise<User | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
