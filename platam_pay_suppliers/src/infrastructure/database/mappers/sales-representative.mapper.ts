import { SalesRepresentative } from '@sales-representatives/domain/models/sales-representative.model';
import type { CreateSalesRepresentativePayload } from '@sales-representatives/domain/ports/sales-representative.repository.port';
import { SalesRepresentativeEntity } from '@libs/database';

export class SalesRepresentativeMapper {
  static toDomain(entity: SalesRepresentativeEntity): SalesRepresentative {
    return new SalesRepresentative(
      Number(entity.id),
      entity.externalId,
      Number(entity.partnerId),
      entity.userId != null ? Number(entity.userId) : null,
      entity.name,
      entity.role,
      Number(entity.statusId),
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toCreateEntity(
    payload: CreateSalesRepresentativePayload,
  ): Partial<SalesRepresentativeEntity> {
    const entity = new SalesRepresentativeEntity();
    entity.partnerId = payload.partnerId;
    entity.userId = payload.userId ?? null;
    entity.name = payload.name;
    entity.role = payload.role;
    entity.statusId = payload.statusId;
    return entity;
  }
}
