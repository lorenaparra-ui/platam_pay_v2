import type { UserState } from '@modules/users/domain/models/user.models';

export class CreateUserRequest {
  constructor(
    readonly email: string,
    readonly state: UserState,
    readonly role_external_id: string | null,
    readonly last_login_at: Date | null,
    /**
     * Si es `null` o cadena vacía, se crea (o reutiliza) el usuario en Cognito y se usa su `sub` en BD.
     * Si se informa, no se llama a Cognito y se persiste ese `sub` (p. ej. migraciones).
     */
    readonly cognito_sub: string | null = null,
  ) {}
}
