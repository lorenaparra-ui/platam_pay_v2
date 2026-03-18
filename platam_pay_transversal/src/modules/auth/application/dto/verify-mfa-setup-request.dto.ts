import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class VerifyMfaSetupRequestDto {
  @ApiProperty({
    example: 'admin@platampay.com',
    description: 'Correo corporativo del usuario de backoffice',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Session devuelta por /auth/mfa/setup',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  session: string;

  @ApiProperty({
    example: '123456',
    description: 'Codigo TOTP de la app autenticadora',
  })
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  totpCode: string;
}

