import { UserEntity } from '@app/transversal-data';
import { User } from '@modules/users/domain/models/user.models';

export class UserMapper {
  static to_domain(row: UserEntity): User {
    return new User(
      row.id,
      row.externalId,
      row.cognitoSub,
      row.email,
      row.roleId ?? null,
      row.statusId,
      row.lastLoginAt ?? null,
      row.createdAt,
      row.updatedAt,
    );
  }

  static from_raw_row(row: Record<string, unknown>): User {
    return new User(
      Number(row['id']),
      String(row['external_id']),
      String(row['cognito_sub']),
      String(row['email']),
      row['role_id'] === null || row['role_id'] === undefined
        ? null
        : Number(row['role_id']),
      Number(row['status_id']),
      row['last_login_at'] === null || row['last_login_at'] === undefined
        ? null
        : new Date(String(row['last_login_at'])),
      new Date(String(row['created_at'])),
      new Date(String(row['updated_at'])),
    );
  }
}
