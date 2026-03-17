import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'f3ea53d8-209c-4ea1-9bb5-c0ce6f7d6f0c',
    description: 'UUID de Cognito',
  })
  @IsUUID('4')
  cognitoSub: string;

  @ApiProperty({
    example: 'user@platam.com',
    description: 'Email único del usuario',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: '+573001112233',
    description: 'Teléfono único del usuario',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @ApiPropertyOptional({
    example: 2,
    description: 'Id interno del rol',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  roleId?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Id interno del estado',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  statusId?: number;

  @ApiPropertyOptional({
    example: '2026-02-23T18:00:00.000Z',
    description: 'Fecha del último login (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  lastLoginAt?: string;
}
