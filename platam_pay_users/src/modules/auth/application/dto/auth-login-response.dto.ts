import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensResponseDto {
  @ApiProperty({ description: 'JWT de acceso', nullable: true })
  accessToken: string | null;

  @ApiProperty({ description: 'JWT de identidad', nullable: true })
  idToken: string | null;

  @ApiProperty({
    description: 'Refresh token para renovar sesion',
    nullable: true,
  })
  refreshToken: string | null;

  @ApiProperty({ description: 'Tiempo de expiracion en segundos', nullable: true })
  expiresIn: number | null;

  @ApiProperty({ description: 'Tipo de token', nullable: true, example: 'Bearer' })
  tokenType: string | null;
}

export class AuthLoginResponseDto {
  @ApiProperty({
    enum: [
      'MFA_REQUIRED',
      'MFA_SETUP_REQUIRED',
      'PASSWORD_CHANGE_REQUIRED',
      'AUTHENTICATED',
    ],
  })
  status:
    | 'MFA_REQUIRED'
    | 'MFA_SETUP_REQUIRED'
    | 'PASSWORD_CHANGE_REQUIRED'
    | 'AUTHENTICATED';

  @ApiProperty({
    nullable: true,
    example: 'SOFTWARE_TOKEN_MFA',
    description: 'Challenge exigido por Cognito cuando aplica',
  })
  challengeName: string | null;

  @ApiProperty({
    nullable: true,
    description: 'Sesion temporal para responder challenge MFA',
  })
  session: string | null;

  @ApiProperty({ type: AuthTokensResponseDto, nullable: true })
  tokens: AuthTokensResponseDto | null;
}

