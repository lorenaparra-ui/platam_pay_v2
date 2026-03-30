import type {
  State,
  CreateStateProps,
  UpdateStateProps,
  ListStatesParams,
} from '../models/state.models';

export interface StateRepository {
  find_by_external_id(external_id: string): Promise<State | null>;

  list(params: ListStatesParams): Promise<{ items: State[]; total: number }>;

  create(props: CreateStateProps): Promise<State>;

  update_by_external_id(
    external_id: string,
    patch: UpdateStateProps,
  ): Promise<State | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
