import { ApiProperty } from '@nestjs/swagger';

export type AuthorizeResultStatus = 'authorized' | 'already_authorized' | 'not_found';

export class AuthorizeResultResponseDto {
  @ApiProperty({ enum: ['authorized', 'already_authorized', 'not_found'] })
  result!: AuthorizeResultStatus;

  static from(result: AuthorizeResultStatus): AuthorizeResultResponseDto {
    const dto = new AuthorizeResultResponseDto();
    dto.result = result;
    return dto;
  }
}
