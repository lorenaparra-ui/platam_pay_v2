import type { WebQueryType } from '@platam/shared';

export class WebQuery {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly credit_application_id: number,
    readonly query_type: WebQueryType,
    readonly person_id: number | null,
    readonly consulted_at: Date,
    readonly query_result: Record<string, unknown> | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateWebQueryProps {
  credit_application_id: number;
  query_type: WebQueryType;
  person_id: number | null;
  consulted_at: Date;
  query_result: Record<string, unknown> | null;
}
