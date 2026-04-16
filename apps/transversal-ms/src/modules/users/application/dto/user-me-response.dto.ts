import { ApiProperty } from '@nestjs/swagger';

export class UserMeHierarchyDto {
  @ApiProperty({ nullable: true, example: '20' })
  parentId!: string | null;

  @ApiProperty({
    nullable: true,
    example: null,
    description: 'Reservado cuando exista vínculo explícito usuario–partner en BD.',
  })
  partnerId!: string | null;
}

export class UserMeProfileDto {
  @ApiProperty({ format: 'uuid' })
  externalId!: string;

  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiProperty({ example: 'Juan Pérez' })
  fullName!: string;

  @ApiProperty({
    description: 'Código de rol de catálogo (alineado con Cognito / `Roles`).',
    example: 'PARTNER_OPERATIONS',
  })
  role!: string;

  @ApiProperty({ type: () => UserMeHierarchyDto })
  hierarchy!: UserMeHierarchyDto;
}

export class UserMeResponseDto {
  @ApiProperty({ type: () => UserMeProfileDto })
  user!: UserMeProfileDto;

  @ApiProperty({ type: [String], example: ['CLIENT_VIEW', 'ORDER_CREATE'] })
  permissions!: string[];
}
