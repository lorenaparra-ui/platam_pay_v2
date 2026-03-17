import { ApiProperty } from '@nestjs/swagger';

export class SetupMfaResponseDto {
  @ApiProperty({
    description:
      'URL otpauth para escanear con app de autenticacion (ej. Google Authenticator)',
    example: 'otpauth://totp/Platam%20Pay?secret=JBSWY3DPEHPK3PXP&issuer=Platam%20Pay',
  })
  secret_code_url: string;

  @ApiProperty({
    description: 'Session a reutilizar en /auth/mfa/verify',
  })
  session: string;
}

