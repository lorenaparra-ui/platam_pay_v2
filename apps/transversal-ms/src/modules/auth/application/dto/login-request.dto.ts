import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { normalize_auth_email } from '@modules/auth/application/dto/auth-payload.transforms';

export class LoginRequestDto {
  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @Transform(normalize_auth_email)
  @IsEmail()
  email!: string;

  @ApiProperty({ format: 'password', minLength: 1 })
  @IsString()
  @MinLength(1)
  password!: string;
}
