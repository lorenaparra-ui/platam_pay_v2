import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CityResponseDto {
  @ApiProperty({
    description:
      'Identificador público de la ciudad (UUID). El id bigint interno no se expone.',
    format: 'uuid',
  })
  externalId!: string;

  @ApiProperty()
  countryName!: string;

  @ApiProperty({ description: 'ISO 3166-1 alpha-2' })
  countryCode!: string;

  @ApiProperty()
  stateName!: string;

  @ApiPropertyOptional({ nullable: true })
  stateCode!: string | null;

  @ApiProperty()
  cityName!: string;

  @ApiProperty({
    description: 'UUID de la moneda en transversal_schema.currencies.',
    format: 'uuid',
  })
  currencyExternalId!: string;
}

export class PaginatedCitiesResponseDto {
  @ApiProperty({ type: [CityResponseDto] })
  items!: CityResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}

export class CreateCityBodyDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  countryName!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/)
  countryCode!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  stateName!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 3)
  @Matches(/^[A-Z0-9]{2,3}$/)
  stateCode?: string | null;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  cityName!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  currencyExternalId!: string;
}

export class UpdateCityBodyDto extends PartialType(CreateCityBodyDto) {}

export class ListCountriesQueryDto {
  @ApiPropertyOptional({
    description:
      'Filtra países cuyo nombre contiene esta subcadena (insensible a mayúsculas).',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  countryNameContains?: string;
}

export class CountryCatalogItemDto {
  @ApiProperty()
  countryName!: string;

  @ApiProperty({ description: 'ISO 3166-1 alpha-2' })
  countryCode!: string;
}

export class ListCitiesQueryDto {
  @ApiPropertyOptional({
    description:
      'Si no se envían `page` ni `limit`, se devuelven todas las ciudades que cumplan los filtros.',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/)
  countryCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  stateName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  cityNameContains?: string;
}
