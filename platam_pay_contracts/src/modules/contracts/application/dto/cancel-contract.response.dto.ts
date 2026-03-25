import { ApiProperty } from "@nestjs/swagger";

export class CancelContractResponseDto {
  @ApiProperty({ description: "UUID publico del contrato cancelado." })
  contractExternalId: string;

  @ApiProperty({ description: "Resultado de la operacion de cancelacion." })
  status: "cancelled";
}
