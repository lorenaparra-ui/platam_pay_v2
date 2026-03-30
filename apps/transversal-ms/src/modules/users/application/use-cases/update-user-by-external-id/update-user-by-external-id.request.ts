export class UpdateUserByExternalIdRequest {
  constructor(
    readonly external_id: string,
    readonly cognito_sub: string | undefined,
    readonly email: string | undefined,
    readonly status_external_id: string | undefined,
    readonly role_external_id: string | null | undefined,
    readonly last_login_at: Date | null | undefined,
  ) {}
}
