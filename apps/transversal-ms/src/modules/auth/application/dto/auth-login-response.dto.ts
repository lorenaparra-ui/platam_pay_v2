import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthTokensResponseDto } from '@modules/auth/application/dto/auth-tokens-response.dto';

export class AuthLoginResponseDto {
  @ApiProperty({
    enum: [
      'MFA_REQUIRED',
      'MFA_SETUP_REQUIRED',
      'PASSWORD_CHANGE_REQUIRED',
      'AUTHENTICATED',
    ],
  })
  status!: string;

  @ApiPropertyOptional({
    nullable: true,
    enum: ['SOFTWARE_TOKEN_MFA', 'MFA_SETUP', 'NEW_PASSWORD_REQUIRED'],
  })
  challengeName!: string | null;

  @ApiPropertyOptional({ nullable: true })
  session!: string | null;

  @ApiPropertyOptional({ type: () => AuthTokensResponseDto, nullable: true })
  tokens!: AuthTokensResponseDto | null;
}
