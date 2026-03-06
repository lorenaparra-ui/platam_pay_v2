import { ApiProperty } from '@nestjs/swagger';
import { LegalRepresentative } from '../../domain/models/legal-representative.model';

export class LegalRepresentativeDto {
  @ApiProperty({ description: 'Nombre completo del representante' })
  name: string;

  @ApiProperty({ description: 'Tipo de documento (ej. C.C., C.E.)' })
  document_type: string;

  @ApiProperty({ description: 'Número del documento' })
  document_number: string;

  @ApiProperty({ description: 'Rol o cargo (ej. Representante Legal)' })
  role: string;

  static fromDomain(model: LegalRepresentative): LegalRepresentativeDto {
    const dto = new LegalRepresentativeDto();
    dto.name = model.name;
    dto.document_type = model.document_type;
    dto.document_number = model.document_number;
    dto.role = model.role;
    return dto;
  }
}
