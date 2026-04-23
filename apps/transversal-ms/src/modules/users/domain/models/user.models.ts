export type UserState = 'active' | 'inactive';

/**
 * Alcance de filas `users.id` visibles para un actor.
 * `unrestricted`: back-office; no materializa todos los ids (evita lecturas masivas).
 */
export type UserVisibilityScope =
  | { readonly kind: 'unrestricted' }
  | { readonly kind: 'subset'; readonly internal_user_ids: readonly number[] };

export class User {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly cognito_sub: string,
    readonly email: string,
    readonly role_id: number | null,
    readonly state: UserState,
    readonly parent_id: number | null,
    /** Path materializado en BD (`id/id/.../`); no confiar solo en esto sin validar JWT + estado. */
    readonly hierarchy_path: string,
    /** FK a `persons.id` para joins explícitos de PII; no exponer en APIs públicas sin control. */
    readonly person_id: number | null,
    readonly last_login_at: Date | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateUserProps {
  cognito_sub: string;
  email: string;
  role_id: number | null;
  state: UserState;
  last_login_at: Date | null;
  parent_id?: number | null;
  person_id?: number | null;
}

export type UpdateUserProps = Partial<CreateUserProps>;
