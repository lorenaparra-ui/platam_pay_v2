import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '../../domain/models/document-type.model';

export class DocumentTypeResponseDto {
  @ApiProperty({ description: 'Identificador público UUID' })
  externalId: string;

  @ApiProperty({ description: 'Nombre del tipo de documento' })
  name: string;

  @ApiProperty({ description: 'Código único del tipo de documento' })
  code: string;

  @ApiProperty({ description: 'Indica si el tipo de documento está activo' })
  isActive: boolean;

  static fromDomain(model: DocumentType): DocumentTypeResponseDto {
    const dto = new DocumentTypeResponseDto();
    dto.externalId = model.externalId;
    dto.name = model.name;
    dto.code = model.code;
    dto.isActive = model.isActive;
    return dto;
  }
}
