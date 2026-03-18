import { ApiProperty } from '@nestjs/swagger';

export class CountryResponseDto {
  @ApiProperty({ description: 'Código ISO del país (2 caracteres)' })
  countryCode: string;

  @ApiProperty({ description: 'Nombre del país' })
  countryName: string;

  static from(countryCode: string, countryName: string): CountryResponseDto {
    const dto = new CountryResponseDto();
    dto.countryCode = countryCode;
    dto.countryName = countryName;
    return dto;
  }
}
