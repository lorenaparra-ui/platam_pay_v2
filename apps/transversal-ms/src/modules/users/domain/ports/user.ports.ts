import type {
  User,
  CreateUserProps,
  UpdateUserProps,
} from '../models/user.models';

export interface UserRepository {
  find_by_external_id(external_id: string): Promise<User | null>;

  find_all(): Promise<User[]>;

  create(props: CreateUserProps): Promise<User>;

  update_by_external_id(
    external_id: string,
    patch: UpdateUserProps,
  ): Promise<User | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
