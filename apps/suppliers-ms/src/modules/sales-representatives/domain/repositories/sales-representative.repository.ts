import {
  CreateSalesRepresentativeProps,
  SalesRepresentative,
} from '@modules/sales-representatives/domain/entities/sales-representative.entity';

export interface SalesRepresentativeRepository {
  find_by_external_id(external_id: string): Promise<SalesRepresentative | null>;

  /**
   * @param include_default_representatives Si es `true`, incluye filas con `is_default = true`.
   * Por defecto se excluyen (comportamiento histórico del listado interno).
   */
  find_all(
    partner_id_filter?: number,
    include_default_representatives?: boolean,
  ): Promise<SalesRepresentative[]>;

  create(props: CreateSalesRepresentativeProps): Promise<SalesRepresentative>;

  update_user_by_external_id(
    external_id: string,
    user_id: number | null,
  ): Promise<SalesRepresentative | null>;

  delete_by_external_id(external_id: string): Promise<boolean>;
}
