import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/domain/models/user.model';
import {
  CreateUserPayload,
  UpdateUserPayload,
  UserRepositoryPort,
} from '@users/domain/ports/user.repository.port';
import { UserEntity } from '@libs/database';
import { UserMapper } from '../mappers/users/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find({
      order: { id: 'DESC' },
    });
    return entities.map((entity) => UserMapper.toDomain(entity));
  }

  async findById(id: number): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? UserMapper.toDomain(entity) : null;
  }

  async create(payload: CreateUserPayload): Promise<User> {
    const entity = UserMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return UserMapper.toDomain(saved);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdateUserPayload,
  ): Promise<User | null> {
    const existing = await this.repository.findOne({ where: { externalId } });
    if (!existing) return null;
    const updated = UserMapper.applyUpdate(existing, payload);
    const saved = await this.repository.save(updated);
    return UserMapper.toDomain(saved);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
