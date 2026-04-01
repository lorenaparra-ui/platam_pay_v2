import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Columnas comunes de toda tabla de idempotencia SQS.
 *
 * Convención de esquema (por tabla concreta que extienda esta clase):
 *   - id                BIGSERIAL PK
 *   - idempotency_key   varchar(512) UNIQUE NOT NULL
 *   - correlation_id    uuid NOT NULL
 *   - result            jsonb NULL  ← null = en proceso; not-null = completado
 *   - created_at        timestamptz NOT NULL DEFAULT now()
 *
 * Cada entidad hija debe declarar @Entity({ schema, name }) y puede tipar
 * `result` con el genérico concreto que corresponda.
 */
export abstract class BaseSqsIdempotencyEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'idempotency_key', type: 'varchar', length: 512, unique: true })
  idempotency_key!: string;

  @Column({ name: 'correlation_id', type: 'uuid' })
  correlation_id!: string;

  /**
   * Almacena el resultado como JSONB.
   * - null  → mensaje en curso (aún no completado).
   * - valor → mensaje procesado exitosamente (puede servirse como caché).
   *
   * El tipo concreto debe ser sobreescrito por la clase hija.
   */
  @Column({ name: 'result', type: 'jsonb', nullable: true })
  result!: unknown | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;
}
