import type {
  Contract,
  CreateContractRepositoryInput,
  ListContractsFilters,
  UpdateContractProps,
} from '../models/contract.models';

export interface ContractRepository {
  find_by_id(internal_id: number): Promise<Contract | null>;

  find_by_external_id(external_id: string): Promise<Contract | null>;

  find_page(
    filters: ListContractsFilters,
    offset: number,
    limit: number,
  ): Promise<{ items: readonly Contract[]; total: number }>;

  create(props: CreateContractRepositoryInput): Promise<Contract>;

  update_by_external_id(
    external_id: string,
    patch: UpdateContractProps,
  ): Promise<Contract | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
