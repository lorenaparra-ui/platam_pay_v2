import { IsEnum, IsObject, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TransversalEventType } from './transversal-outbound-event.dto';

/**
 * Mensaje recibido de la cola de entrada (mismo contrato que el outbound para simetría).
 */
export class TransversalInboundMessageDto {
  @IsUUID('4')
  correlation_id!: string;

  @IsEnum(TransversalEventType)
  event_type!: TransversalEventType;

  @IsObject()
  payload!: Record<string, unknown>;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  trace_id?: string;
}
