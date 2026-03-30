import { RoleEntity } from '@app/transversal-data';
import type { Role } from '@modules/transversal/catalog/domain/models/role.models';

export class RoleMapper {
  static to_domain(row: RoleEntity): Role {
    return {
      id: row.id,
      external_id: row.externalId,
      name: row.name,
      description: row.description ?? null,
      created_at: row.createdAt,
      updated_at: row.updatedAt,
    };
  }

  static from_raw_row(row: Record<string, unknown>): Role {
    return {
      id: Number(row['id']),
      external_id: String(row['external_id']),
      name: String(row['name']),
      description:
        row['description'] === null || row['description'] === undefined
          ? null
          : String(row['description']),
      created_at: new Date(String(row['created_at'])),
      updated_at: new Date(String(row['updated_at'])),
    };
  }
}
