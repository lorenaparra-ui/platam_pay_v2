import { Repository } from 'typeorm';
import { SalesRepresentativeEntity } from '@app/suppliers-data';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { CreateSalesRepresentativeProps, SalesRepresentative } from '@modules/sales-representatives/domain/entities/sales-representative.entity';
export declare class TypeormSalesRepresentativeRepository implements SalesRepresentativeRepository {
    private readonly repo;
    constructor(repo: Repository<SalesRepresentativeEntity>);
    find_by_external_id(external_id: string): Promise<SalesRepresentative | null>;
    find_all(partner_id_filter?: number): Promise<SalesRepresentative[]>;
    create(props: CreateSalesRepresentativeProps): Promise<SalesRepresentative>;
    update_user_by_external_id(external_id: string, user_id: number | null): Promise<SalesRepresentative | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
