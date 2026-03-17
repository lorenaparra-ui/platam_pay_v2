import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'admin@platampay.com',
    description: 'Correo corporativo del usuario de backoffice',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Secure#Pass123',
    description: 'Contrasena del usuario',
    minLength: 12,
  })
  @IsString()
  @MinLength(12)
  password: string;
}

