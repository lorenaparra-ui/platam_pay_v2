import { Repository } from 'typeorm';
import { LegalRepresentativeEntity } from '@app/suppliers-data';
import { LegalRepresentativeRepository } from '@modules/legal-representatives/domain/repositories/legal-representative.repository';
import { LegalRepresentative, CreateLegalRepresentativeProps } from '@modules/legal-representatives/domain/entities/legal-representative.entity';
export declare class TypeormLegalRepresentativeRepository implements LegalRepresentativeRepository {
    private readonly repo;
    constructor(repo: Repository<LegalRepresentativeEntity>);
    create(props: CreateLegalRepresentativeProps): Promise<LegalRepresentative>;
}
