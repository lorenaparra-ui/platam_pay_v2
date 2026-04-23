import {
  Supplier,
  CreateSupplierProps,
  UpdateSupplierProps,
} from '@modules/suppliers/domain/entities/supplier.entity';

export interface SupplierRepository {
  find_by_external_id(external_id: string): Promise<Supplier | null>;

  find_all(): Promise<Supplier[]>;

  create(props: CreateSupplierProps): Promise<Supplier>;

  update_by_external_id(
    external_id: string,
    patch: UpdateSupplierProps,
  ): Promise<Supplier | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
