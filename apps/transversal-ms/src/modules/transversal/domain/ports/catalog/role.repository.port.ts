import type { Roles } from '@platam/shared';
import type {
  Role,
  CreateRoleProps,
  UpdateRoleProps,
  ListRolesParams,
} from '../../models/role.models';

export interface RoleRepository {
  find_by_external_id(external_id: string): Promise<Role | null>;

  /** Código de catálogo (`Roles` en `@platam/shared`). */
  find_by_name(name: Roles | string): Promise<Role | null>;

  find_by_internal_id(internal_id: number): Promise<Role | null>;

  list(params: ListRolesParams): Promise<{ items: Role[]; total: number }>;

  create(props: CreateRoleProps): Promise<Role>;

  update_by_external_id(
    external_id: string,
    patch: UpdateRoleProps,
  ): Promise<Role | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
