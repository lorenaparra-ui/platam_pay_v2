import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class CityResponseDto {
  @ApiProperty({
    description:
      'Identificador público de la ciudad (UUID). El id bigint interno no se expone.',
    format: 'uuid',
  })
  external_id!: string;

  @ApiProperty()
  country_name!: string;

  @ApiProperty({ description: 'ISO 3166-1 alpha-2' })
  country_code!: string;

  @ApiProperty()
  state_name!: string;

  @ApiPropertyOptional({ nullable: true })
  state_code!: string | null;

  @ApiProperty()
  city_name!: string;

  @ApiProperty({
    description: 'UUID de la moneda en transversal_schema.currencies.',
    format: 'uuid',
  })
  currency_external_id!: string;

  @ApiProperty()
  created_at!: Date;

  @ApiProperty()
  updated_at!: Date;
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
  country_name!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/)
  country_code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  state_name!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(2, 3)
  @Matches(/^[A-Z0-9]{2,3}$/)
  state_code?: string | null;

  @ApiProperty()
  @IsString()
  @MaxLength(120)
  city_name!: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  currency_external_id!: string;
}

export class UpdateCityBodyDto extends PartialType(CreateCityBodyDto) {}

export class ListCitiesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/)
  country_code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  state_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  city_name_contains?: string;
}
