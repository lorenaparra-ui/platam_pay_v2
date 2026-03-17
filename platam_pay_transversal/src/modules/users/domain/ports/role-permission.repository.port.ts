import type { RolePermission } from '../models/role-permission.model';

export const ROLE_PERMISSION_REPOSITORY = 'ROLE_PERMISSION_REPOSITORY';

export interface RolePermissionRepositoryPort {
  findAll(): Promise<RolePermission[]>;
  findById(id: number): Promise<RolePermission | null>;
  findByExternalId(externalId: string): Promise<RolePermission | null>;
  findByRoleId(roleId: number): Promise<RolePermission[]>;
  findByPermissionId(permissionId: number): Promise<RolePermission[]>;
  findByRoleIdAndPermissionId(
    roleId: number,
    permissionId: number,
  ): Promise<RolePermission | null>;
}
