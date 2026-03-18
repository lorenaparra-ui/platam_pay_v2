import { ApiProperty } from '@nestjs/swagger';

export class TokensResponseDto {
  @ApiProperty({ description: 'JWT de acceso' })
  accessToken: string;

  @ApiProperty({ description: 'JWT de identidad' })
  idToken: string;

  @ApiProperty({ description: 'Refresh token para renovar sesion', nullable: true })
  refreshToken: string | null;

  @ApiProperty({ description: 'Tiempo de expiracion en segundos' })
  expiresIn: number;

  @ApiProperty({ description: 'Tipo de token', example: 'Bearer' })
  tokenType: string;
}

