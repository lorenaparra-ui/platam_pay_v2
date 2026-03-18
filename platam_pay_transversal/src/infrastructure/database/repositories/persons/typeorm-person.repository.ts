import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '@persons/domain/models/person.model';
import {
  CreatePersonPayload,
  PersonRepositoryPort,
  UpdatePersonPayload,
} from '@persons/domain/ports/person.repository.port';
import { PersonEntity } from '@libs/database';
import { PersonMapper } from '../../mappers/persons/person.mapper';

@Injectable()
export class TypeOrmPersonRepository implements PersonRepositoryPort {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly repository: Repository<PersonEntity>,
  ) {}

  async findAll(): Promise<Person[]> {
    const entities = await this.repository.find({
      order: { id: 'DESC' },
    });
    return entities.map((entity) => PersonMapper.toDomain(entity));
  }

  async findById(id: number): Promise<Person | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? PersonMapper.toDomain(entity) : null;
  }

  async findByExternalId(externalId: string): Promise<Person | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? PersonMapper.toDomain(entity) : null;
  }

  async create(payload: CreatePersonPayload): Promise<Person> {
    const entity = PersonMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return PersonMapper.toDomain(saved);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdatePersonPayload,
  ): Promise<Person | null> {
    const existing = await this.repository.findOne({ where: { externalId } });
    if (!existing) return null;
    const updated = PersonMapper.applyUpdate(existing, payload);
    const saved = await this.repository.save(updated);
    return PersonMapper.toDomain(saved);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
