import type { ExperianQuery, CreateExperianQueryProps } from '../models/experian-query.models';

export interface ExperianQueryRepository {
  create(props: CreateExperianQueryProps): Promise<ExperianQuery>;
  find_by_credit_application_id(credit_application_id: number): Promise<ExperianQuery | null>;
}
