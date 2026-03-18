import { SalesRepresentative } from '@sales-representatives/domain/models/sales-representative.model';
import type { CreateSalesRepresentativePayload } from '@sales-representatives/domain/ports/sales-representative.repository.port';
import { SalesRepresentativeEntity } from '@libs/database';
export declare class SalesRepresentativeMapper {
    static toDomain(entity: SalesRepresentativeEntity): SalesRepresentative;
    static toCreateEntity(payload: CreateSalesRepresentativePayload): Partial<SalesRepresentativeEntity>;
}
