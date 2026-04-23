import type { SarlaftCheck, CreateSarlaftCheckProps } from '../models/sarlaft-check.models';

export interface SarlaftCheckRepository {
  create(props: CreateSarlaftCheckProps): Promise<SarlaftCheck>;
  find_by_credit_application_id(credit_application_id: number): Promise<SarlaftCheck | null>;
}
