import { ApiProperty } from '@nestjs/swagger';

export type AuthorizationLandingStatus = 'pending' | 'already_authorized' | 'not_found';

export class AuthorizationDataResponseDto {
  @ApiProperty({ enum: ['pending', 'already_authorized', 'not_found'] })
  authorizationStatus!: AuthorizationLandingStatus;

  @ApiProperty()
  externalId!: string;

  static from(status: AuthorizationLandingStatus, externalId: string): AuthorizationDataResponseDto {
    const dto = new AuthorizationDataResponseDto();
    dto.authorizationStatus = status;
    dto.externalId = externalId;
    return dto;
  }
}
