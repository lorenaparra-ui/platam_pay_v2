import type { ExperianQueryStatus, ExperianQueryTypes } from '@platam/shared';

export class ExperianQuery {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly credit_application_id: number,
    readonly person_id: number | null,
    readonly business_id: number | null,
    readonly query_type: ExperianQueryTypes,
    readonly credit_report: Record<string, unknown> | null,
    readonly credit_score: string | null,
    readonly consulted_at: Date,
    readonly status: ExperianQueryStatus,
    readonly error_message: string | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateExperianQueryProps {
  credit_application_id: number;
  person_id: number | null;
  business_id: number | null;
  query_type: ExperianQueryTypes;
  credit_report: Record<string, unknown> | null;
  credit_score: string | null;
  consulted_at: Date;
  status: ExperianQueryStatus;
  error_message: string | null;
}
