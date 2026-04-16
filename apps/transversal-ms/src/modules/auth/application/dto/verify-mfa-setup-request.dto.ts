import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';
import {
  digits_only_totp,
  normalize_auth_email,
  trim_string_value,
} from '@modules/auth/application/dto/auth-payload.transforms';

export class VerifyMfaSetupRequestDto {
  @ApiProperty({ example: 'usuario@ejemplo.com' })
  @Transform(normalize_auth_email)
  @IsEmail()
  email!: string;

  @ApiProperty()
  @Transform(trim_string_value)
  @IsString()
  @MinLength(1)
  session!: string;

  @ApiProperty({ example: '123456', minLength: 6, maxLength: 6 })
  @Transform(digits_only_totp)
  @IsString()
  @Length(6, 6)
  totpCode!: string;
}
