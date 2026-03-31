import type {
  CatalogStatus,
  CreateStatusProps,
  UpdateStatusProps,
  ListStatusesParams,
} from '../models/status.models';

export interface StatusRepository {
  find_by_external_id(external_id: string): Promise<CatalogStatus | null>;

  find_by_internal_id(internal_id: number): Promise<CatalogStatus | null>;

  list(
    params: ListStatusesParams,
  ): Promise<{ items: CatalogStatus[]; total: number }>;

  create(props: CreateStatusProps): Promise<CatalogStatus>;

  update_by_external_id(
    external_id: string,
    patch: UpdateStatusProps,
  ): Promise<CatalogStatus | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
