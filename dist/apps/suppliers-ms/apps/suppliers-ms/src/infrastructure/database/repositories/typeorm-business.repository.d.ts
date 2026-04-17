import { Repository } from 'typeorm';
import { BusinessEntity } from '@app/suppliers-data';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { Business, CreateBusinessProps, UpdateBusinessProps } from '@modules/businesses/domain/entities/business.entity';
export declare class TypeormBusinessRepository implements BusinessRepository {
    private readonly repo;
    constructor(repo: Repository<BusinessEntity>);
    find_by_external_id(external_id: string): Promise<Business | null>;
    find_all(): Promise<Business[]>;
    create(props: CreateBusinessProps): Promise<Business>;
    update_by_external_id(external_id: string, patch: UpdateBusinessProps): Promise<Business | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
