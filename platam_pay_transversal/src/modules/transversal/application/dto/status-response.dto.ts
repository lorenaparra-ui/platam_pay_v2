import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '../../domain/models/status.model';

export class StatusResponseDto {
  @ApiProperty({ description: 'Identificador público UUID' })
  externalId: string;

  @ApiProperty({ description: 'Tipo de entidad al que pertenece el status' })
  entityType: string;

  @ApiProperty({ description: 'Código único del status dentro del entityType' })
  code: string;

  @ApiProperty({ description: 'Nombre para mostrar al usuario' })
  displayName: string;

  @ApiPropertyOptional({ description: 'Descripción detallada del status' })
  description: string | null;

  @ApiProperty({ description: 'Indica si el status está activo' })
  isActive: boolean;

  static fromDomain(model: Status): StatusResponseDto {
    const dto = new StatusResponseDto();
    dto.externalId = model.externalId;
    dto.entityType = model.entityType;
    dto.code = model.code;
    dto.displayName = model.displayName;
    dto.description = model.description;
    dto.isActive = model.isActive;
    return dto;
  }
}
