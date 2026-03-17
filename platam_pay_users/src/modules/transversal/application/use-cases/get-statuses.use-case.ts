import { Inject, Injectable } from '@nestjs/common';
import type { StatusRepositoryPort } from '@transversal/domain/ports/repository/status.repository.port';
import { STATUS_REPOSITORY } from '@transversal/domain/ports/repository/status.repository.port';
import { StatusResponseDto } from '../dto/status-response.dto';

@Injectable()
export class GetStatusesUseCase {
  constructor(
    @Inject(STATUS_REPOSITORY)
    private readonly repository: StatusRepositoryPort,
  ) {}

  async execute(): Promise<StatusResponseDto[]> {
    const models = await this.repository.findAll();
    return models.map(StatusResponseDto.fromDomain);
  }

  async executeByExternalId(externalId: string): Promise<StatusResponseDto | null> {
    const model = await this.repository.findByExternalId(externalId);
    return model ? StatusResponseDto.fromDomain(model) : null;
  }

  async executeByEntityType(entityType: string): Promise<StatusResponseDto[]> {
    const models = await this.repository.findByEntityType(entityType);
    return models.map(StatusResponseDto.fromDomain);
  }

  async executeByEntityTypeAndCode(
    entityType: string,
    code: string,
  ): Promise<StatusResponseDto | null> {
    const model = await this.repository.findByEntityTypeAndCode(entityType, code);
    return model ? StatusResponseDto.fromDomain(model) : null;
  }
}
