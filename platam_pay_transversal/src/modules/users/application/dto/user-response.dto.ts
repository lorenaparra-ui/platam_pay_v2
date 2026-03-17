import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID público del usuario',
  })
  externalId: string;

  @ApiProperty({
    example: 'f3ea53d8-209c-4ea1-9bb5-c0ce6f7d6f0c',
    description: 'UUID de Cognito',
  })
  cognitoSub: string;

  @ApiProperty({
    example: 'user@platam.com',
    description: 'Email único del usuario',
  })
  email: string;

  @ApiProperty({
    example: '+573001112233',
    nullable: true,
    description: 'Teléfono único del usuario',
  })
  phone: string | null;

  @ApiProperty({
    example: 2,
    nullable: true,
    description: 'Rol interno del usuario',
  })
  roleId: number | null;

  @ApiProperty({
    example: 1,
    description: 'Estado interno del usuario',
  })
  statusId: number;

  @ApiProperty({
    example: '2026-02-19T14:25:00.000Z',
    nullable: true,
    description: 'Último login del usuario',
  })
  lastLoginAt: string | null;

  @ApiProperty({
    example: '2026-02-19T14:25:00.000Z',
    description: 'Fecha de creación',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-02-19T14:25:00.000Z',
    description: 'Fecha de actualización',
  })
  updatedAt: string;
}
