import { StatusEntity } from '@app/transversal-data';
import type { CatalogStatus } from '@modules/transversal/domain/models/status.models';

export class StatusMapper {
  static to_domain(row: StatusEntity): CatalogStatus {
    return {
      id: row.id,
      external_id: row.externalId,
      entity_type: row.entityType,
      code: row.code,
      display_name: row.displayName,
      description: row.description ?? null,
      is_active: row.isActive,
      created_at: row.createdAt,
      updated_at: row.updatedAt,
    };
  }

  static from_raw_row(row: Record<string, unknown>): CatalogStatus {
    return {
      id: Number(row['id']),
      external_id: String(row['external_id']),
      entity_type: String(row['entity_type']),
      code: String(row['code']),
      display_name: String(row['display_name']),
      description:
        row['description'] === null || row['description'] === undefined
          ? null
          : String(row['description']),
      is_active: Boolean(row['is_active']),
      created_at: new Date(String(row['created_at'])),
      updated_at: new Date(String(row['updated_at'])),
    };
  }
}
