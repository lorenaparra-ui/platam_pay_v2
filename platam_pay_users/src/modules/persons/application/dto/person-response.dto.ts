import { ApiProperty } from '@nestjs/swagger';

export class PersonResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID publico de la persona',
  })
  externalId: string;

  @ApiProperty({
    example: 'CO',
    nullable: true,
    description: 'Codigo de pais ISO alpha-2',
  })
  countryCode: string | null;

  @ApiProperty({ example: 'Juan', description: 'Nombres' })
  firstName: string;

  @ApiProperty({ example: 'Perez', description: 'Apellidos' })
  lastName: string;

  @ApiProperty({ example: 'CC', description: 'Tipo de documento' })
  docType: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Numero de documento unico',
  })
  docNumber: string;

  @ApiProperty({
    example: '2021-09-03',
    nullable: true,
    description: 'Fecha de expedicion del documento',
  })
  docIssueDate: string | null;

  @ApiProperty({
    example: '1990-01-20',
    nullable: true,
    description: 'Fecha de nacimiento',
  })
  birthDate: string | null;

  @ApiProperty({
    example: 'female',
    nullable: true,
    description: 'Genero de la persona',
  })
  gender: string | null;

  @ApiProperty({
    example: '+573001112233',
    nullable: true,
    description: 'Telefono',
  })
  phone: string | null;

  @ApiProperty({
    example: 'Calle 1 # 2-3',
    nullable: true,
    description: 'Direccion de residencia',
  })
  residentialAddress: string | null;

  @ApiProperty({
    example: 'Carrera 9 # 10-11',
    nullable: true,
    description: 'Direccion de negocio',
  })
  businessAddress: string | null;

  @ApiProperty({
    example: '2026-02-19T14:25:00.000Z',
    description: 'Fecha de creacion',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-02-19T14:25:00.000Z',
    description: 'Fecha de actualizacion',
  })
  updatedAt: string;
}
