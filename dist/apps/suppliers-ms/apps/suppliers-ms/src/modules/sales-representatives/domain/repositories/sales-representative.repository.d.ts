import { CreateSalesRepresentativeProps, SalesRepresentative } from '@modules/sales-representatives/domain/entities/sales-representative.entity';
export interface SalesRepresentativeRepository {
    find_by_external_id(external_id: string): Promise<SalesRepresentative | null>;
    find_all(partner_id_filter?: number): Promise<SalesRepresentative[]>;
    create(props: CreateSalesRepresentativeProps): Promise<SalesRepresentative>;
    update_user_by_external_id(external_id: string, user_id: number | null): Promise<SalesRepresentative | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
