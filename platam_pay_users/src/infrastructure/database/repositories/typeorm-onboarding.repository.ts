import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Onboarding } from '@transversal/domain/models/onboarding.model';
import {
  CreateOnboardingPayload,
  OnboardingRepositoryPort,
  UpdateOnboardingPayload,
} from '@transversal/domain/ports/repository/onboarding.repository.port';
import { OnboardingEntity } from '../entities/onboarding.entity';
import { OnboardingMapper } from '../mappers/onboarding.mapper';

@Injectable()
export class TypeOrmOnboardingRepository implements OnboardingRepositoryPort {
  constructor(
    @InjectRepository(OnboardingEntity)
    private readonly repository: Repository<OnboardingEntity>,
  ) {}

  async findAll(): Promise<Onboarding[]> {
    const entities = await this.repository.find({
      order: { id: 'DESC' },
    });
    return entities.map((entity) => OnboardingMapper.toDomain(entity));
  }

  async findById(id: number): Promise<Onboarding | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? OnboardingMapper.toDomain(entity) : null;
  }

  async findByExternalId(
    externalId: string,
  ): Promise<Onboarding | null> {
    const entity = await this.repository.findOne({ where: { externalId } });
    return entity ? OnboardingMapper.toDomain(entity) : null;
  }

  async create(payload: CreateOnboardingPayload): Promise<Onboarding> {
    const entity = OnboardingMapper.toCreateEntity(payload);
    const saved = await this.repository.save(entity);
    return OnboardingMapper.toDomain(saved);
  }

  async updateByExternalId(
    externalId: string,
    payload: UpdateOnboardingPayload,
  ): Promise<Onboarding | null> {
    const existing = await this.repository.findOne({ where: { externalId } });
    if (!existing) return null;
    const updated = OnboardingMapper.applyUpdate(existing, payload);
    const saved = await this.repository.save(updated);
    return OnboardingMapper.toDomain(saved);
  }

  async deleteByExternalId(externalId: string): Promise<boolean> {
    const result = await this.repository.delete({ externalId });
    return (result.affected ?? 0) > 0;
  }
}
