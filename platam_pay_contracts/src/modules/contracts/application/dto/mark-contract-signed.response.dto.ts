import { ApiProperty } from "@nestjs/swagger";

export class MarkContractSignedResponseDto {
  @ApiProperty({
    description: "Indica si el evento webhook fue procesado exitosamente.",
    example: true,
  })
  processed: boolean;
}
