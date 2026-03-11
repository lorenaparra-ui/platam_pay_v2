import { ApiProperty } from '@nestjs/swagger';
import { BusinessInformation } from '../../domain/models/business-information.model';
import { LegalRepresentativeDto } from './legal-representative.dto';

export class BusinessInformationResponseDto {
  @ApiProperty({ description: 'Nombre legal de la empresa' })
  legalName: string;

  @ApiProperty({ description: 'NIT / identificador tributario' })
  taxId: string;

  @ApiProperty({
    description: 'Representantes legales',
    type: [LegalRepresentativeDto],
  })
  legalRepresentatives: LegalRepresentativeDto[];

  static fromDomain(model: BusinessInformation): BusinessInformationResponseDto {
    const dto = new BusinessInformationResponseDto();
    dto.legalName = model.legalName;
    dto.taxId = model.taxId;
    dto.legalRepresentatives = model.legalRepresentatives.map(LegalRepresentativeDto.fromDomain);
    return dto;
  }
}
