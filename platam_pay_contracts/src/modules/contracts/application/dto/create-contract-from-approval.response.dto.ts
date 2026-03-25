import { ApiProperty } from "@nestjs/swagger";

export class CreateContractFromApprovalResponseDto {
  @ApiProperty({ description: "UUID publico del contrato creado." })
  contractExternalId: string;

  @ApiProperty({ description: "UUID publico del signer creado." })
  signerExternalId: string;

  @ApiProperty({ description: "Token de documento devuelto por proveedor." })
  providerDocumentToken: string;

  @ApiProperty({
    description: "Token de firmante devuelto por proveedor.",
    nullable: true,
  })
  providerSignerToken: string | null;

  @ApiProperty({
    description: "URL de firma para el cliente.",
    nullable: true,
  })
  signUrl: string | null;

  @ApiProperty({ description: "status_id persistido para contrato." })
  contractStatusId: number;

  @ApiProperty({ description: "status_id persistido para firmante." })
  signerStatusId: number;
}
