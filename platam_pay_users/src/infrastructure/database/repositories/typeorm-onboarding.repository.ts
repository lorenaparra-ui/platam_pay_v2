import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Onboarding } from '@transversal/domain/models/onboarding.model';
import { OnboardingRepositoryPort } from '@transversal/domain/ports/onboarding.repository.port';
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
}
