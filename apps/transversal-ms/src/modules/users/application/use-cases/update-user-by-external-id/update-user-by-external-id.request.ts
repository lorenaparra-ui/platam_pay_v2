import type { UserState } from '@modules/users/domain/models/user.models';

export class UpdateUserByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly cognito_sub: string | undefined,
    readonly email: string | undefined,
    readonly state: UserState | undefined,
    readonly role_external_id: string | null | undefined,
    readonly last_login_at: Date | null | undefined,
  ) {}
}
