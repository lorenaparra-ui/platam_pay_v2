export interface Role {
  id: number;
  external_id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateRoleProps {
  name: string;
  description: string | null;
}

export interface UpdateRoleProps {
  name?: string;
  description?: string | null;
}

export interface ListRolesParams {
  page: number;
  limit: number;
  name_contains?: string;
}
