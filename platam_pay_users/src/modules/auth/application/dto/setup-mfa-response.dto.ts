import { ApiProperty } from '@nestjs/swagger';

export class SetupMfaResponseDto {
  @ApiProperty({
    description:
      'Clave secreta TOTP para registrar en Google Authenticator o Authy',
    example: 'JBSWY3DPEHPK3PXP',
  })
  secretCode: string;

  @ApiProperty({
    description: 'Session a reutilizar en /auth/mfa/verify',
  })
  session: string;
}

