import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { PermissionCodesByRoleReaderPort } from '@modules/auth/domain/ports/permission-codes-by-role.reader.port';

@Injectable()
export class TypeormPermissionCodesByRoleReader implements PermissionCodesByRoleReaderPort {
  constructor(@InjectDataSource() private readonly data_source: DataSource) {}

  async list_codes_for_role_internal_id(role_internal_id: number): Promise<readonly string[]> {
    const rows = (await this.data_source.query(
      `SELECT p.code AS code
       FROM transversal_schema.permissions p
       INNER JOIN transversal_schema.role_permissions rp ON rp.permission_id = p.id
       WHERE rp.role_id = $1
       ORDER BY p.code ASC`,
      [role_internal_id],
    )) as Array<{ code: string }>;
    return rows.map((r) => r.code);
  }
}
