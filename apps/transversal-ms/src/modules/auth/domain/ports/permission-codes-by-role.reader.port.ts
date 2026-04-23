/** Lee códigos de permiso del catálogo vía `role_permissions` para un `roles.id`. */
export interface PermissionCodesByRoleReaderPort {
  list_codes_for_role_internal_id(role_internal_id: number): Promise<readonly string[]>;
}
