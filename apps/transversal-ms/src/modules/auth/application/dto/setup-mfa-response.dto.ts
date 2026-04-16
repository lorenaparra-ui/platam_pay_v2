import { ApiProperty } from '@nestjs/swagger';

export class SetupMfaResponseDto {
  @ApiProperty({ description: 'URL otpauth:// para configurar Google Authenticator' })
  secretCodeUrl!: string;

  @ApiProperty({ description: 'Sesión actualizada para /auth/mfa/verify' })
  session!: string;
}
