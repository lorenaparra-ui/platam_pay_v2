import { Expose } from 'class-transformer';
import { IsEnum, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TransversalEventType } from './transversal-outbound-event.dto';

/**
 * Mensaje recibido de la cola de entrada (mismo contrato que el outbound para simetría).
 */
export class TransversalInboundMessageDto {
  @Expose({ name: 'correlation_id' })
  @IsUUID('4')
  correlationId!: string;

  @Expose({ name: 'event_type' })
  @IsEnum(TransversalEventType)
  eventType!: TransversalEventType;

  @Expose()
  @IsObject()
  payload!: Record<string, unknown>;

  @Expose({ name: 'trace_id' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  traceId?: string;
}
