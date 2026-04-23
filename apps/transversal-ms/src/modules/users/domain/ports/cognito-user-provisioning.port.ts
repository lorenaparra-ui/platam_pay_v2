export type EnsureCognitoUserParams = Readonly<{
  email: string;
  /** Código de rol (`Roles` / `PartnerRoles`) para `custom:role`; omitir si no aplica. */
  role_code: string | null;
}>;

export type EnsureCognitoUserResult = Readonly<{
  sub: string;
  /** Username en el pool (p. ej. email); usar en `AdminUpdateUserAttributes`. */
  username: string;
  /** `true` si se creó con `AdminCreateUser` en esta llamada (rollback con borrado). */
  created_new: boolean;
}>;

export interface CognitoUserProvisioningPort {
  ensure_user(params: EnsureCognitoUserParams): Promise<EnsureCognitoUserResult>;

  set_custom_db_id(username: string, db_user_id: number): Promise<void>;

  try_delete_user(username: string): Promise<void>;
}
