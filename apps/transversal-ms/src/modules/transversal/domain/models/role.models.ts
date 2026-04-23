import type { Roles } from '@platam/shared';

export interface Role {
  id: number;
  external_id: string;
  name: Roles;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateRoleProps {
  name: Roles;
  description: string | null;
}

export interface UpdateRoleProps {
  name?: Roles;
  description?: string | null;
}

export interface ListRolesParams {
  page: number;
  limit: number;
  name_contains?: string;
}
