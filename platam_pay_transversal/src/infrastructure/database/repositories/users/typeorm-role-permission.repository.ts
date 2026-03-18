import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { RolePermissionRepositoryPort } from '@users/domain/ports/role-permission.repository.port';
import { RolePermission } from '@users/domain/models/role-permission.model';
import { RolePermissionEntity } from '@libs/database';
import { RolePermissionMapper } from '../mappers/users/role-permission.mapper';

@Injectable()
export class TypeOrmRolePermissionRepository implements RolePermissionRepositoryPort {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private readonly repository: Repository<RolePermissionEntity>,
  ) {}

  async findAll(): Promise<RolePermission[]> {
    const entities = await this.repository.find({
      order: { roleId: 'ASC', permissionId: 'ASC' },
    });
    return entities.map(RolePermissionMapper.toDomain);
  }

  async findById(id: number): Promise<RolePermission | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? RolePermissionMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<RolePermission | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? RolePermissionMapper.toDomain(entity) : null;
  }

  async findByRoleId(roleId: number): Promise<RolePermission[]> {
    const entities = await this.repository.find({
      where: { roleId },
      order: { permissionId: 'ASC' },
    });
    return entities.map(RolePermissionMapper.toDomain);
  }

  async findByPermissionId(permissionId: number): Promise<RolePermission[]> {
    const entities = await this.repository.find({
      where: { permissionId },
      order: { roleId: 'ASC' },
    });
    return entities.map(RolePermissionMapper.toDomain);
  }

  async findByRoleIdAndPermissionId(
    roleId: number,
    permissionId: number,
  ): Promise<RolePermission | null> {
    const entity = await this.repository.findOne({
      where: { roleId, permissionId },
    });
    return entity ? RolePermissionMapper.toDomain(entity) : null;
  }
}
