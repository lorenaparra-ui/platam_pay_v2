import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { trim_string_value } from '@modules/auth/application/dto/auth-payload.transforms';

export class SetupMfaRequestDto {
  @ApiProperty({ description: 'Sesión devuelta por /auth/login con MFA_SETUP_REQUIRED' })
  @Transform(trim_string_value)
  @IsString()
  @MinLength(1)
  session!: string;
}
