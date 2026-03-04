import { ApiProperty } from "@nestjs/swagger";

export class RegeneratePartnerApiKeyResponseDto {
  @ApiProperty({
    example: "f3b6c...a9",
    description:
      "API key en texto plano. Solo se muestra una vez al momento de regenerarse.",
  })
  apiKey: string;
}
