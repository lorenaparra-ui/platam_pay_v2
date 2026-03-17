import { ApiProperty } from '@nestjs/swagger';
import { BusinessSeniority } from '../../domain/models/business-seniority.model';

export class BusinessSeniorityResponseDto {
  @ApiProperty({ description: 'Identificador público UUID' })
  externalId: string;

  @ApiProperty({ description: 'Descripción del rango de antigüedad' })
  description: string;

  @ApiProperty({ description: 'Inicio del rango en meses' })
  rangeStart: number;

  @ApiProperty({ description: 'Fin del rango en meses' })
  rangeEnd: number;

  static fromDomain(model: BusinessSeniority): BusinessSeniorityResponseDto {
    const dto = new BusinessSeniorityResponseDto();
    dto.externalId = model.externalId;
    dto.description = model.description;
    dto.rangeStart = model.rangeStart;
    dto.rangeEnd = model.rangeEnd;
    return dto;
  }
}
