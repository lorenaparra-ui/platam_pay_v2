import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { PermissionRepositoryPort } from '@users/domain/ports/permission.repository.port';
import { Permission } from '@users/domain/models/permission.model';
import { PermissionEntity } from '@libs/database';
import { PermissionMapper } from '../mappers/users/permission.mapper';

@Injectable()
export class TypeOrmPermissionRepository implements PermissionRepositoryPort {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly repository: Repository<PermissionEntity>,
  ) {}

  async findAll(): Promise<Permission[]> {
    const entities = await this.repository.find({
      order: { code: 'ASC' },
    });
    return entities.map(PermissionMapper.toDomain);
  }

  async findById(id: number): Promise<Permission | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? PermissionMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Permission | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? PermissionMapper.toDomain(entity) : null;
  }

  async findByCode(code: string): Promise<Permission | null> {
    const entity = await this.repository.findOne({ where: { code } });
    return entity ? PermissionMapper.toDomain(entity) : null;
  }
}
