import type { SarlaftCheckStatuses } from '@platam/shared';

export class SarlaftCheck {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly credit_application_id: number,
    readonly person_id: number,
    readonly business_id: number | null,
    readonly has_match: boolean,
    readonly status: SarlaftCheckStatuses,
    readonly consulted_at: Date,
    readonly sources: Record<string, unknown> | null,
    readonly detail: string | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateSarlaftCheckProps {
  credit_application_id: number;
  person_id: number;
  business_id: number | null;
  has_match: boolean;
  status: SarlaftCheckStatuses;
  consulted_at: Date;
  sources: Record<string, unknown> | null;
  detail: string | null;
}
