import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class RoleResponseDto {
  @ApiProperty({
    description:
      'Identificador público (UUID). Se usa en API; el id numérico interno no se expone.',
    format: 'uuid',
  })
  external_id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  created_at!: Date;

  @ApiProperty()
  updated_at!: Date;
}

export class PaginatedRolesResponseDto {
  @ApiProperty({ type: [RoleResponseDto] })
  items!: RoleResponseDto[];

  @ApiProperty()
  total!: number;

  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;
}

export class CreateRoleBodyDto {
  @ApiProperty()
  @IsString()
  @MaxLength(80)
  name!: string;

  @ApiPropertyOptional({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class UpdateRoleBodyDto extends PartialType(CreateRoleBodyDto) {}

export class ListRolesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name_contains?: string;
}
