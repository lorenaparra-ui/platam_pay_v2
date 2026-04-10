import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Roles } from '@platam/shared';
import { PaginationQueryDto } from './pagination-query.dto';

export class RoleResponseDto {
  @ApiProperty({
    description:
      'Identificador público (UUID). Se usa en API; el id numérico interno no se expone.',
    format: 'uuid',
  })
  external_id!: string;

  @ApiProperty({ enum: Roles })
  name!: Roles;

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
  @ApiProperty({ enum: Roles })
  @IsEnum(Roles)
  name!: Roles;

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
