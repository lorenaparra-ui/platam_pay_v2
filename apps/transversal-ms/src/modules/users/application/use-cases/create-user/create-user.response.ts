import type { UserState } from '@modules/users/domain/models/user.models';
import { UserPublicFields } from '@modules/users/application/mapping/user-public-fields.builder';

export class CreateUserResponse implements UserPublicFields {
  external_id: string;
  cognito_sub: string;
  email: string;
  role_external_id: string | null;
  state: UserState;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: UserPublicFields) {
    Object.assign(this, fields);
  }
}
