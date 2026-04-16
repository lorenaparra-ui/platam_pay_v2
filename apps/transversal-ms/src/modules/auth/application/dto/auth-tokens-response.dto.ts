import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthTokensResponseDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  idToken!: string;

  @ApiPropertyOptional({ nullable: true })
  refreshToken!: string | null;

  @ApiProperty()
  expiresIn!: number;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: string;
}
