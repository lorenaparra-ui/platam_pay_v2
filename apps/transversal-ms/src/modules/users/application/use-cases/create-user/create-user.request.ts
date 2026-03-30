export class CreateUserRequest {
  constructor(
    readonly cognito_sub: string,
    readonly email: string,
    readonly status_external_id: string,
    readonly role_external_id: string | null,
    readonly last_login_at: Date | null,
  ) {}
}
