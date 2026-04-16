import { UserEntity } from '@app/transversal-data';
import { normalize_cognito_sub } from '@common/utils/normalize-cognito-sub';
import { User, UserState } from '@modules/users/domain/models/user.models';

export class UserMapper {
  static to_domain(row: UserEntity): User {
    return new User(
      row.id,
      row.externalId,
      normalize_cognito_sub(row.cognitoSub),
      row.email,
      row.roleId ?? null,
      row.state as UserState,
      row.parent_id ?? null,
      row.hierarchyPath,
      row.personId ?? null,
      row.lastLoginAt ?? null,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): User {
    const parent_raw = row['parent_id'];
    const person_raw = row['person_id'];
    const hierarchy_path = row['hierarchy_path'];
    return new User(
      Number(row['id']),
      String(row['external_id']),
      normalize_cognito_sub(String(row['cognito_sub'])),
      String(row['email']),
      row['role_id'] === null || row['role_id'] === undefined
        ? null
        : Number(row['role_id']),
      (row['state'] as UserState | undefined) ?? 'active',
      parent_raw === null || parent_raw === undefined
        ? null
        : Number(parent_raw),
      typeof hierarchy_path === 'string' ? hierarchy_path : String(hierarchy_path ?? ''),
      person_raw === null || person_raw === undefined
        ? null
        : Number(person_raw),
      row['last_login_at'] === null || row['last_login_at'] === undefined
        ? null
        : new Date(String(row['last_login_at'])),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
