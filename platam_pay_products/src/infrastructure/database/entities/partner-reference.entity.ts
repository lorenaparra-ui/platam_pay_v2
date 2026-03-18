import { Entity, PrimaryColumn } from "typeorm";

/**
 * Referencia mínima a la tabla `partners` (ownership en suppliers).
 * Permite FK desde `categories` sin acoplar el dominio de partners en este servicio.
 */
@Entity({ name: "partners" })
export class PartnerReferenceEntity {
  @PrimaryColumn({ name: "id", type: "bigint" })
  id: number;
}
