import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class CancelContractRequestDto {
  @ApiProperty({ description: "UUID publico del contrato a cancelar." })
  @IsUUID()
  contractExternalId: string;

  @ApiProperty({
    description: "status_id tecnico para estado cancelado.",
    example: 27,
  })
  @IsNumber()
  cancelledStatusId: number;

  @ApiProperty({
    description: "Motivo operativo de cancelacion.",
    example: "Datos de documento invalido",
  })
  @IsString()
  reason: string;
}
