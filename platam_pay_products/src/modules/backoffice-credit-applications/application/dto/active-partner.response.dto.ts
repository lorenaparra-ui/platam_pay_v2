import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ActivePartnerResponseDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  partner_external_id: string;

  @ApiProperty({ example: "Agro Mayorista S.A.S" })
  partner_name: string;

  @ApiPropertyOptional({ example: "https://cdn.example.com/logo.png" })
  logo_url: string | null;
}

export class ActivePartnersListResponseDto {
  @ApiProperty({ type: ActivePartnerResponseDto, isArray: true })
  items: ActivePartnerResponseDto[];
}
