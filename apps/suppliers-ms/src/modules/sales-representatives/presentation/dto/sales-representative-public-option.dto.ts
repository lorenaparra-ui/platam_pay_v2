import { ApiProperty } from '@nestjs/swagger';
import type { SalesRepresentativePublicFields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';

/** Respuesta mínima del listado público de representantes por partner (solo identificación y nombre). */
export class SalesRepresentativePublicOptionDto {
  @ApiProperty({ format: 'uuid' })
  externalId!: string;

  @ApiProperty({
    nullable: true,
    description: 'Nombre completo desde persona (first_name + last_name) del usuario vinculado',
  })
  userFullName!: string | null;

  @ApiProperty({ description: 'Representante por defecto del partner' })
  isDefault!: boolean;

  static from(fields: SalesRepresentativePublicFields): SalesRepresentativePublicOptionDto {
    const d = new SalesRepresentativePublicOptionDto();
    d.externalId = fields.external_id;
    d.userFullName = fields.user_full_name;
    d.isDefault = fields.is_default;
    return d;
  }
}
