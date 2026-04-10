import { Repository } from 'typeorm';
import { PartnersEntity } from '@app/suppliers-data';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { Partner, CreatePartnerProps, UpdatePartnerProps } from '@modules/partners/domain/entities/partner.entity';
export declare class TypeormPartnerRepository implements PartnerRepository {
    private readonly repo;
    constructor(repo: Repository<PartnersEntity>);
    find_by_external_id(external_id: string): Promise<Partner | null>;
    find_all(): Promise<Partner[]>;
    create(props: CreatePartnerProps): Promise<Partner>;
    update_by_external_id(external_id: string, patch: UpdatePartnerProps): Promise<Partner | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
