import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class VerifyTotpRequestDto {
  @ApiProperty({
    example: 'admin@platampay.com',
    description: 'Correo corporativo del usuario de backoffice',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'AYABeC123example-session',
    description: 'Sesion temporal retornada por Cognito tras usuario/contrasena',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  session: string;

  @ApiProperty({
    example: '123456',
    description: 'Codigo TOTP generado por Google Authenticator',
  })
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  totpCode: string;
}

