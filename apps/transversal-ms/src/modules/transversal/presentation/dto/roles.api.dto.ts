import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Roles } from '@platam/shared';

export class RoleResponseDto {
  @ApiProperty({
    description:
      'Identificador público (UUID). Se usa en API; el id numérico interno no se expone.',
    format: 'uuid',
  })
  externalId!: string;

  @ApiProperty({ enum: Roles })
  name!: Roles;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
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

export class ListRolesQueryDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  nameContains?: string;
}
