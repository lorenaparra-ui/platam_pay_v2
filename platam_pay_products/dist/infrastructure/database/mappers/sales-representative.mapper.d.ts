import { SalesRepresentative } from 'src/modules/persons/domain/models/sales-representative.model';
import type { CreateSalesRepresentativePayload } from 'src/modules/persons/domain/ports/sales-representative.repository.port';
import { SalesRepresentativeEntity } from '../entities/sales-representative.entity';
export declare class SalesRepresentativeMapper {
    static toDomain(entity: SalesRepresentativeEntity): SalesRepresentative;
    static toEntity(domain: SalesRepresentative): SalesRepresentativeEntity;
    static toCreateEntity(payload: CreateSalesRepresentativePayload): SalesRepresentativeEntity;
}
