import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SetupMfaRequestDto {
  @ApiProperty({
    description:
      'Session devuelta por /auth/login cuando Cognito responde MFA_SETUP_REQUIRED',
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  session: string;
}

