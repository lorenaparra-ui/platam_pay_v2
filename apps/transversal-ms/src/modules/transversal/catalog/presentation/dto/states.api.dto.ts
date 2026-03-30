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

export class StateResponseDto {
  @ApiProperty({
    description:
      'Identificador público del estado/departamento (UUID). El id bigint interno no se expone.',
    format: 'uuid',
  })
  external_id!: string;

  @ApiProperty({ description: 'ISO 3166-1 alpha-2' })
  country_code!: string;

  @ApiProperty()
  state_name!: string;

  @ApiPropertyOptional({ nullable: true })
  state_code!: string | null;

  @ApiProperty()
  created_at!: Date;

  @ApiProperty()
  updated_at!: Date;
}

export class PaginatedStatesResponseDto {
  @ApiProperty({ type: [StateResponseDto] })
  items!: StateResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}

export class CreateStateBodyDto {
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
}

export class UpdateStateBodyDto extends PartialType(CreateStateBodyDto) {}

export class ListStatesQueryDto extends PaginationQueryDto {
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
  state_name_contains?: string;
}
