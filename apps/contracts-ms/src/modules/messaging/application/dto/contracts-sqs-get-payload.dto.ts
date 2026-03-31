import { IsOptional, IsUUID } from 'class-validator';

/** Cuerpo JSON esperado en CONTRACTS_SQS_GET_CONTRACT_QUEUE_URL. */
export class ContractsSqsGetPayloadDto {
  @IsOptional()
  @IsUUID('4')
  correlation_id?: string;

  @IsUUID('4')
  contract_external_id!: string;
}
