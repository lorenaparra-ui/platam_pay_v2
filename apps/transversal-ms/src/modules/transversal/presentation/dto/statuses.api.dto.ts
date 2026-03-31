import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class StatusResponseDto {
  @ApiProperty({ format: 'uuid' })
  external_id!: string;

  @ApiProperty()
  entity_type!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  display_name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  is_active!: boolean;

  @ApiProperty()
  created_at!: Date;

  @ApiProperty()
  updated_at!: Date;
}

export class PaginatedStatusesResponseDto {
  @ApiProperty({ type: [StatusResponseDto] })
  items!: StatusResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}

export class CreateStatusBodyDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  entity_type!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  code!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  display_name!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateStatusBodyDto extends PartialType(CreateStatusBodyDto) {}

export class ListStatusesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  entity_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  code_contains?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  display_name_contains?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === '') {
      return undefined;
    }
    if (value === true || value === 'true') {
      return true;
    }
    if (value === false || value === 'false') {
      return false;
    }
    return undefined;
  })
  @IsBoolean()
  is_active?: boolean;
}
