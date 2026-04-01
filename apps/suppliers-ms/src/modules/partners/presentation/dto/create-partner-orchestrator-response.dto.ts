import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerOrchestratorResponseDto {
  @ApiProperty()
  sagaExternalId!: string;

  @ApiProperty()
  correlationId!: string;

  @ApiProperty()
  creditFacilityExternalId!: string;

  @ApiProperty({
    nullable: true,
    description:
      'Pendiente hasta que transversal-ms complete create-partner-user (mensaje SQS). Correlación: correlationId.',
  })
  userExternalId!: string | null;

  @ApiProperty({
    nullable: true,
    description: 'Pendiente hasta creación asíncrona de persona en transversal-ms.',
  })
  personExternalId!: string | null;

  @ApiProperty({
    nullable: true,
    description: 'Representante legal registrado en suppliers_schema (si vino en el payload).',
  })
  legalRepresentativeExternalId!: string | null;

  @ApiProperty()
  businessExternalId!: string;

  @ApiProperty()
  bankCertificationUrl!: string;

  @ApiProperty()
  logoUrl!: string;

  @ApiProperty()
  coBrandingUrl!: string;

  @ApiProperty({ nullable: true })
  bankAccountExternalId!: string | null;

  @ApiProperty()
  supplierExternalId!: string;

  @ApiProperty()
  partnerExternalId!: string;
}
