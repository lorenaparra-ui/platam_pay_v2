import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { UseCase } from '@platam/shared';
import { ContractsSqsGetPayloadDto } from '../dto/contracts-sqs-get-payload.dto';
import { GetContractByExternalIdUseCase } from '@modules/contracts/application/use-cases/get-contract-by-external-id/get-contract-by-external-id.use-case';

export type IngestContractsGetSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

/**
 * get-contract vía cola: valida y delega en el mismo caso de uso que HTTP.
 * No publica el resultado en otra cola (extensión futura: evento outbound).
 */
@Injectable()
export class IngestContractsGetSqsMessageUseCase
  implements UseCase<IngestContractsGetSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestContractsGetSqsMessageUseCase.name);

  constructor(private readonly get_contract: GetContractByExternalIdUseCase) {}

  async execute(cmd: IngestContractsGetSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(cmd.body) as unknown;
    } catch {
      this.logger.warn('Cuerpo de mensaje get-contract no es JSON válido; se dejará para reintento.');
      return cmd.delete_on_validation_error;
    }

    const dto = plainToInstance(ContractsSqsGetPayloadDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto as object, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(`Mensaje get-contract inválido: ${message}`);
      return cmd.delete_on_validation_error;
    }

    try {
      const row = await this.get_contract.execute(dto.contract_external_id);
      const log_id = dto.correlation_id ?? 'sin_correlation';
      this.logger.log(
        `get-contract ok; correlation_id=${log_id} contract_external_id=${row.external_id} internal_id=${row.id}`,
      );
      return true;
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error al procesar get-contract: ${text}`);
      return false;
    }
  }
}
