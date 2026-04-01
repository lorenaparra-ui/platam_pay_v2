import type { UserState } from '@modules/users/domain/models/user.models';

export class CreateUserRequest {
  constructor(
    readonly cognito_sub: string,
    readonly email: string,
    readonly state: UserState,
    readonly role_external_id: string | null,
    readonly last_login_at: Date | null,
  ) {}
}
