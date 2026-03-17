import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { City } from '../../domain/models/city.model';

export class CityResponseDto {
  @ApiProperty({ description: 'Identificador público UUID' })
  externalId: string;

  @ApiProperty({ description: 'Nombre del país' })
  countryName: string;

  @ApiProperty({ description: 'Código ISO del país (2 caracteres)' })
  countryCode: string;

  @ApiProperty({ description: 'Nombre del estado/departamento' })
  stateName: string;

  @ApiPropertyOptional({ description: 'Código del estado (3 caracteres)' })
  stateCode: string | null;

  @ApiProperty({ description: 'Nombre de la ciudad' })
  cityName: string;

  static fromDomain(model: City): CityResponseDto {
    const dto = new CityResponseDto();
    dto.externalId = model.externalId;
    dto.countryName = model.countryName;
    dto.countryCode = model.countryCode;
    dto.stateName = model.stateName;
    dto.stateCode = model.stateCode;
    dto.cityName = model.cityName;
    return dto;
  }
}
