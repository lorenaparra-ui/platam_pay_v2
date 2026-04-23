import { UserState } from '@platam/shared';

/** Datos de usuario resueltos en una sola consulta (join) para listados y lecturas. */
export interface SalesRepresentativeLoadedUser {
  readonly external_id: string;
  readonly display_name: string;
  readonly role_name: string;
  readonly state: UserState;
}

export class SalesRepresentative {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly partner_id: number,
    readonly user_id: number | null,
    readonly created_at: Date,
    readonly updated_at: Date,
    /** `person.first_name` + `person.last_name` del usuario vinculado (sin fallback a email). */
    readonly user_full_name: string | null,
    readonly is_default: boolean,
    readonly loaded_user?: SalesRepresentativeLoadedUser,
  ) {}
}

export interface CreateSalesRepresentativeProps {
  partner_id: number;
  user_id: number | null;
}
