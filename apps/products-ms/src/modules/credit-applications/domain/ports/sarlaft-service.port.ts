import type { SarlaftCheckStatuses } from '@platam/shared';

export interface SarlaftCheckParams {
  doc_number: string;
  doc_type: string;
  first_name: string;
  force_refresh?: boolean;
}

export interface SarlaftCheckResult {
  has_match: boolean;
  status: SarlaftCheckStatuses;
  sources: Record<string, unknown>;
  detail: string | null;
}

export interface SarlaftServicePort {
  check(params: SarlaftCheckParams): Promise<SarlaftCheckResult>;
}
