import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ContractSignerDetailsDto {
  @ApiPropertyOptional({ description: "UUID publico del signer." })
  externalId?: string;

  @ApiPropertyOptional({ description: "Token de signer del proveedor." })
  providerSignerToken?: string | null;

  @ApiPropertyOptional({ description: "URL de firma (o URL final de documento firmado)." })
  signUrl?: string | null;

  @ApiPropertyOptional({ description: "IP registrada al momento de la firma." })
  ipAddress?: string | null;

  @ApiPropertyOptional({ description: "Latitud registrada al momento de la firma." })
  geoLatitude?: string | null;

  @ApiPropertyOptional({ description: "Longitud registrada al momento de la firma." })
  geoLongitude?: string | null;

  @ApiPropertyOptional({ description: "Fecha/hora en la que se firmo." })
  signedAt?: Date | null;
}

export class FindContractByExternalIdResponseDto {
  @ApiProperty({ description: "UUID publico del contrato." })
  contractExternalId: string;

  @ApiPropertyOptional({ description: "Token de documento del proveedor." })
  providerDocumentToken: string | null;

  @ApiProperty({ description: "status_id del contrato." })
  contractStatusId: number;

  @ApiPropertyOptional({ description: "URL original del documento." })
  originalFileUrl: string | null;

  @ApiPropertyOptional({ description: "URL del documento firmado (PDF final)." })
  signedFileUrl: string | null;

  @ApiPropertyOptional({
    description: "Estado actual del documento segun proveedor de firma.",
  })
  providerDocumentStatus: string | null;

  @ApiProperty({
    description: "Indica si en esta consulta se sincronizo estado con proveedor.",
  })
  synchronizedWithProvider: boolean;

  @ApiPropertyOptional({
    description: "Datos de signer asociados al contrato, si existen.",
    type: ContractSignerDetailsDto,
  })
  signer: ContractSignerDetailsDto | null;
}
