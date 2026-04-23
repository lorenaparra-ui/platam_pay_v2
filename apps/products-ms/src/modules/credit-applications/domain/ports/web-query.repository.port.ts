import type { WebQueryType } from '@platam/shared';
import type { WebQuery, CreateWebQueryProps } from '../models/web-query.models';

export interface WebQueryRepository {
  create(props: CreateWebQueryProps): Promise<WebQuery>;
  find_by_credit_application_id_and_type(
    credit_application_id: number,
    query_type: WebQueryType,
  ): Promise<WebQuery | null>;
}
