import { ApiProperty } from '@nestjs/swagger';
import { LegalRepresentative } from '../../domain/models/legal-representative.model';

export class LegalRepresentativeDto {
  @ApiProperty({ description: 'Nombre completo del representante' })
  name: string;

  @ApiProperty({ description: 'Tipo de documento (ej. C.C., C.E.)' })
  documentType: string;

  @ApiProperty({ description: 'Número del documento' })
  documentNumber: string;

  @ApiProperty({ description: 'Rol o cargo (ej. Representante Legal)' })
  role: string;

  static fromDomain(model: LegalRepresentative): LegalRepresentativeDto {
    const dto = new LegalRepresentativeDto();
    dto.name = model.name;
    dto.documentType = model.documentType;
    dto.documentNumber = model.documentNumber;
    dto.role = model.role;
    return dto;
  }
}
