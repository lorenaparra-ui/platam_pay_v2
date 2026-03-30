import { UserReferenceLookupPort } from '@modules/users/domain/ports/user-reference-lookup.port';
import { User } from '@modules/users/domain/models/user.models';

export interface UserPublicFields {
  external_id: string;
  cognito_sub: string;
  email: string;
  role_external_id: string | null;
  status_external_id: string;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export async function build_user_public_fields(
  row: User,
  lookup: UserReferenceLookupPort,
): Promise<UserPublicFields> {
  const role_external_id = await lookup.get_role_external_id_by_internal_id(
    row.role_id,
  );
  const status_external_id =
    await lookup.get_status_external_id_by_internal_id(row.status_id);

  if (status_external_id === null) {
    throw new Error('user status reference resolution failed');
  }
  if (row.role_id !== null && role_external_id === null) {
    throw new Error('user role reference resolution failed');
  }

  return {
    external_id: row.external_id,
    cognito_sub: row.cognito_sub,
    email: row.email,
    role_external_id,
    status_external_id,
    last_login_at: row.last_login_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
