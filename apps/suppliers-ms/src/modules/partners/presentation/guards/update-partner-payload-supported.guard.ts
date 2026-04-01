import { HttpException, HttpStatus } from '@nestjs/common';
import type { UpdatePartnerPayloadDto } from '../dto/update-partner-payload.dto';

function object_has_defined_values(obj: object | undefined | null): boolean {
  if (obj === null || obj === undefined) {
    return false;
  }
  return Object.values(obj).some((v) => v !== undefined);
}

/**
 * El repositorio de partner solo soporta campos de la entidad partner.
 * Otras secciones quedan para evolución futura (negocio, facility, etc.).
 */
export function assert_update_partner_payload_supported(
  dto: UpdatePartnerPayloadDto,
): void {
  const unsupported: string[] = [];
  if (object_has_defined_values(dto.operatingUser)) {
    unsupported.push('operatingUser');
  }
  if (object_has_defined_values(dto.business)) {
    unsupported.push('business');
  }
  if (object_has_defined_values(dto.bankAccount)) {
    unsupported.push('bankAccount');
  }
  if (object_has_defined_values(dto.creditFacility)) {
    unsupported.push('creditFacility');
  }
  if (dto.category !== undefined && dto.category.length > 0) {
    unsupported.push('category');
  }
  if (unsupported.length > 0) {
    throw new HttpException(
      `Actualización no implementada para: ${unsupported.join(', ')}. Solo se persisten campos de la sección partner (camelCase) y URLs de logo/coBranding vía multipart.`,
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}

export function update_payload_has_partner_changes(
  dto: UpdatePartnerPayloadDto,
): boolean {
  return object_has_defined_values(dto.partner);
}
