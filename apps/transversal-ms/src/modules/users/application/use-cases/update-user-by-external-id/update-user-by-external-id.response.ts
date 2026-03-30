import { UserPublicFields } from '@modules/users/application/mapping/user-public-fields.builder';

export class UpdateUserByExternalIdResponse implements UserPublicFields {
  external_id: string;
  cognito_sub: string;
  email: string;
  role_external_id: string | null;
  status_external_id: string;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;

  constructor(fields: UserPublicFields) {
    Object.assign(this, fields);
  }
}
