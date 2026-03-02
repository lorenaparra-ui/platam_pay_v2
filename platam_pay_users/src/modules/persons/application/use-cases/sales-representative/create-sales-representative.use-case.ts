import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SalesRepresentative } from '../../../domain/models/sales-representative.model';
import type { CreateSalesRepresentativePayload } from '../../../domain/ports/sales-representative.repository.port';
import {
  SALES_REPRESENTATIVE_REPOSITORY,
  type SalesRepresentativeRepositoryPort,
} from '../../../domain/ports/sales-representative.repository.port';
import type { CreateSalesRepresentativeRequestDto } from '../../dto/create-sales-representative-request.dto';

@Injectable()
export class CreateSalesRepresentativeUseCase {
  constructor(
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly repository: SalesRepresentativeRepositoryPort,
  ) {}

  async execute(
    dto: CreateSalesRepresentativeRequestDto,
  ): Promise<SalesRepresentative> {
    if (dto.userId != null) {
      const existing = await this.repository.findByUserId(dto.userId);
      if (existing) {
        throw new ConflictException(
          'El usuario ya está asociado a otro representante de ventas',
        );
      }
    }
    const payload: CreateSalesRepresentativePayload = {
      partnerId: dto.partnerId,
      userId: dto.userId ?? null,
      name: dto.name,
      role: dto.role,
      statusId: dto.statusId,
    };
    return this.repository.create(payload);
  }
}
