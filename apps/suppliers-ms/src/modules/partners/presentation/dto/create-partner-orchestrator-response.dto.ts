import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerOrchestratorResponseDto {
  @ApiProperty()
  sagaExternalId!: string;

  @ApiProperty()
  correlationId!: string;

  @ApiProperty()
  creditFacilityExternalId!: string;

  @ApiProperty()
  userExternalId!: string;

  @ApiProperty()
  personExternalId!: string;

  @ApiProperty()
  businessExternalId!: string;

  @ApiProperty()
  bankCertificationUrl!: string;

  @ApiProperty()
  logoUrl!: string;

  @ApiProperty()
  coBrandingUrl!: string;

  @ApiProperty()
  bankAccountExternalId!: string;

  @ApiProperty()
  partnerExternalId!: string;
}
