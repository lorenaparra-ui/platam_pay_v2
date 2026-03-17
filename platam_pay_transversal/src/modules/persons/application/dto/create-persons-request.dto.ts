import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePersonsRequestDto {
  @ApiProperty({ example: 123, description: 'ID interno del usuario asociado' })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    example: 'CO',
    required: false,
    nullable: true,
    description: 'Codigo de pais ISO alpha-2',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  countryCode?: string;

  @ApiProperty({ example: 'Juan', description: 'Nombres de la persona' })
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiProperty({ example: 'Perez', description: 'Apellidos de la persona' })
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({ example: 'CC', description: 'Tipo de documento' })
  @IsString()
  @MaxLength(100)
  docType: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Numero de documento unico',
  })
  @IsString()
  docNumber: string;

  @ApiProperty({
    example: '2021-09-03',
    required: false,
    nullable: true,
    description: 'Fecha de expedicion del documento',
  })
  @IsOptional()
  @IsDateString()
  docIssueDate?: string;

  @ApiProperty({
    example: '1990-01-20',
    required: false,
    nullable: true,
    description: 'Fecha de nacimiento',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @ApiProperty({
    example: 'female',
    required: false,
    nullable: true,
    description: 'Genero',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  gender?: string;

  @ApiProperty({
    example: '+573001112233',
    required: false,
    nullable: true,
    description: 'Telefono',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: 'Calle 1 # 2-3',
    required: false,
    nullable: true,
    description: 'Direccion residencial',
  })
  @IsOptional()
  @IsString()
  residentialAddress?: string;

  @ApiProperty({
    example: 'Carrera 9 # 10-11',
    required: false,
    nullable: true,
    description: 'Direccion de negocio',
  })
  @IsOptional()
  @IsString()
  businessAddress?: string;

  @ApiProperty({
    example: 987,
    required: false,
    nullable: true,
    description: 'ID interno de ciudad',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  cityId?: number;
}
