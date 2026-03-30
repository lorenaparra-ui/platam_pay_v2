import type { StatusRef } from '../models/status.models';

export interface StatusRepository {
  find_by_external_id(external_id: string): Promise<StatusRef | null>;

  find_by_internal_id(internal_id: number): Promise<StatusRef | null>;
}
