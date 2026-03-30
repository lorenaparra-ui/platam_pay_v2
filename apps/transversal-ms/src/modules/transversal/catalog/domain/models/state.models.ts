export interface State {
  id: number;
  external_id: string;
  country_code: string;
  state_name: string;
  state_code: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateStateProps {
  country_code: string;
  state_name: string;
  state_code: string | null;
}

export interface UpdateStateProps {
  country_code?: string;
  state_name?: string;
  state_code?: string | null;
}

export interface ListStatesParams {
  page: number;
  limit: number;
  country_code?: string;
  state_name_contains?: string;
}
