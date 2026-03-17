import type { Permission } from '../models/permission.model';

export const PERMISSION_REPOSITORY = 'PERMISSION_REPOSITORY';

export interface PermissionRepositoryPort {
  findAll(): Promise<Permission[]>;
  findById(id: number): Promise<Permission | null>;
  findByExternalId(externalId: string): Promise<Permission | null>;
  findByCode(code: string): Promise<Permission | null>;
}
