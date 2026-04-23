import { ApiProperty } from '@nestjs/swagger';
import { UserState } from '@platam/shared';
import type { SalesRepresentativePublicFields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';

export class SalesRepresentativeResponseDto {
  @ApiProperty()
  internalId!: number;

  @ApiProperty({ format: 'uuid' })
  externalId!: string;

  @ApiProperty({ format: 'uuid' })
  partnerExternalId!: string;

  @ApiProperty({ format: 'uuid', nullable: true })
  userExternalId!: string | null;

  @ApiProperty({
    nullable: true,
    description: 'Nombre completo desde persona (first_name + last_name) del usuario vinculado',
  })
  userFullName!: string | null;

  @ApiProperty({ nullable: true, description: 'Nombre para mostrar (persona o email)' })
  userDisplayName!: string | null;

  @ApiProperty({ nullable: true })
  userRoleName!: string | null;

  @ApiProperty({ enum: UserState, nullable: true })
  userState!: UserState | null;

  @ApiProperty({ description: 'Representante por defecto del partner' })
  isDefault!: boolean;

  static from(fields: SalesRepresentativePublicFields): SalesRepresentativeResponseDto {
    const d = new SalesRepresentativeResponseDto();
    d.internalId = fields.internal_id;
    d.externalId = fields.external_id;
    d.partnerExternalId = fields.partner_external_id;
    d.userExternalId = fields.user_external_id;
    d.userFullName = fields.user_full_name;
    d.userDisplayName = fields.user_display_name;
    d.userRoleName = fields.user_role_name;
    d.userState = fields.user_state;
    d.isDefault = fields.is_default;
    return d;
  }
}
