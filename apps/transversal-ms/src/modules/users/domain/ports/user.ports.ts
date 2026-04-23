import type { Roles } from '@platam/shared';
import type {
  User,
  CreateUserProps,
  UpdateUserProps,
  UserVisibilityScope,
} from '../models/user.models';

export interface UserRepository {
  find_by_external_id(external_id: string): Promise<User | null>;

  find_by_email(email: string): Promise<User | null>;

  find_by_cognito_sub(cognito_sub: string): Promise<User | null>;

  find_external_id_by_internal_id(
    internal_id: number,
  ): Promise<string | null>;

  find_internal_id_by_external_id(
    external_id: string,
  ): Promise<number | null>;

  find_all(): Promise<User[]>;

  /** Lista usuarios cuyo id interno está en el conjunto (p. ej. filtro por alcance organizacional). */
  find_all_where_internal_id_in(
    internal_ids: readonly number[],
  ): Promise<User[]>;

  /**
   * Descendientes estrictos de `internal_id` (no incluye al nodo raíz).
   * Basado en `users.parent_id` y CTE recursivo.
   */
  find_descendant_internal_ids_under(
    internal_id: number,
  ): Promise<readonly number[]>;

  /**
   * Actor + descendientes bajo `users.parent_id` (subárbol con raíz en el actor).
   */
  find_subtree_internal_ids_under(
    internal_id: number,
  ): Promise<readonly number[]>;

  /**
   * Alcance de ids internos visibles según rol del actor.
   * Back-office: sin recorte; cualquier otro rol (incl. CUSTOMER): subárbol actor + descendientes.
   */
  resolve_visible_internal_user_ids_for_role(
    actor_internal_id: number,
    role_code: Roles,
  ): Promise<UserVisibilityScope>;

  create(props: CreateUserProps): Promise<User>;

  update_by_external_id(
    external_id: string,
    patch: UpdateUserProps,
  ): Promise<User | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
