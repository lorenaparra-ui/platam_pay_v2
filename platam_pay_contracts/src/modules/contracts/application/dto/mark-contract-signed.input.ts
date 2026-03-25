import { IsNumber, IsObject, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MarkContractSignedInput {
  @ApiProperty({
    description: "Payload webhook recibido desde proveedor de firma.",
    type: Object,
  })
  @IsObject()
  payload: Record<string, unknown>;

  @ApiProperty({
    description: "status_id tecnico para contrato firmado.",
    example: 26,
  })
  @IsNumber()
  contractSignedStatusId: number;

  @ApiProperty({
    description: "status_id tecnico para firmante firmado.",
    example: 17,
  })
  @IsNumber()
  signerSignedStatusId: number;

  @ApiPropertyOptional({
    description: "status_id tecnico para contrato cancelado (uso opcional).",
    example: 27,
  })
  @IsOptional()
  @IsNumber()
  contractCancelledStatusId?: number;
}
