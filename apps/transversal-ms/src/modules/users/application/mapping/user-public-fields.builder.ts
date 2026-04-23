import type { UserState } from '@modules/users/domain/models/user.models';
import { User } from '@modules/users/domain/models/user.models';
import type { RoleRepository } from '@modules/transversal/domain/ports/catalog/role.repository.port';

export interface UserPublicFields {
  external_id: string;
  cognito_sub: string;
  email: string;
  role_external_id: string | null;
  state: UserState;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_user_public_fields(
  row: User,
  role_repo: RoleRepository,
): Promise<UserPublicFields> {
  const role_external_id =
    row.role_id === null
      ? null
      : (await role_repo.find_by_internal_id(row.role_id))?.external_id ?? null;

  if (row.role_id !== null && role_external_id === null) {
    throw new Error('user role reference resolution failed');
  }

  return {
    external_id: row.external_id,
    cognito_sub: row.cognito_sub,
    email: row.email,
    role_external_id,
    state: row.state,
    last_login_at: row.last_login_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
