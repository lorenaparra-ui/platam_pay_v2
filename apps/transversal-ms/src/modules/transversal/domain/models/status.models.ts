/** Catálogo transversal_schema.statuses (exposición HTTP por external_id). */
export interface CatalogStatus {
  id: number;
  external_id: string;
  entity_type: string;
  code: string;
  display_name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateStatusProps {
  entity_type: string;
  code: string;
  display_name: string;
  description: string | null;
  is_active: boolean;
}

export interface UpdateStatusProps {
  entity_type?: string;
  code?: string;
  display_name?: string;
  description?: string | null;
  is_active?: boolean;
}

export interface ListStatusesParams {
  page: number;
  limit: number;
  entity_type?: string;
  code_contains?: string;
  display_name_contains?: string;
  is_active?: boolean;
}
