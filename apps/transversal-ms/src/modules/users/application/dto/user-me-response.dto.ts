import { ApiProperty } from '@nestjs/swagger';

export class UserMeHierarchyDto {
  @ApiProperty({ nullable: true, example: '20', description: 'Id interno del usuario padre en la jerarquía.' })
  parentId!: string | null;

  @ApiProperty({
    nullable: true,
    example: '7',
    description:
      'Id interno del partner en BD (suppliers_schema.partners.id). ' +
      'Presente para roles PartnerRoles (PARTNER_ADMIN, PARTNER_OPERATIONS, CUSTOMER, SALES_MANAGER, SALES_REPRESENTATIVE). ' +
      'null para roles back-office o si el usuario no tiene vínculo de partner registrado.',
  })
  partnerId!: string | null;

  @ApiProperty({
    nullable: true,
    format: 'uuid',
    example: null,
    description:
      'external_id UUID del registro en suppliers_schema.sales_representatives. ' +
      'Presente únicamente cuando role = SALES_REPRESENTATIVE y existe fila en esa tabla. ' +
      'null en cualquier otro caso.',
  })
  salesRepExternalId!: string | null;
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
