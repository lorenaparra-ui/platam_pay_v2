import { ApiProperty } from '@nestjs/swagger';
import { BusinessInformation } from '../../domain/models/business-information.model';
import { LegalRepresentativeDto } from './legal-representative.dto';

export class BusinessInformationResponseDto {
  @ApiProperty({ description: 'Nombre legal de la empresa' })
  legal_name: string;

  @ApiProperty({ description: 'NIT / identificador tributario' })
  tax_id: string;

  @ApiProperty({
    description: 'Representantes legales',
    type: [LegalRepresentativeDto],
  })
  legal_representatives: LegalRepresentativeDto[];

  static fromDomain(model: BusinessInformation): BusinessInformationResponseDto {
    const dto = new BusinessInformationResponseDto();
    dto.legal_name = model.legal_name;
    dto.tax_id = model.tax_id;
    dto.legal_representatives = model.legal_representatives.map(LegalRepresentativeDto.fromDomain);
    return dto;
  }
}
