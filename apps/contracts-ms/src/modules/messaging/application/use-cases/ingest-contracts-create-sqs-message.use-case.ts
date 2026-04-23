import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { UseCase } from '@platam/shared';
import { ContractsSqsCreatePayloadDto } from '../dto/contracts-sqs-create-payload.dto';
import { CreateContractUseCase } from '@modules/contracts/application/use-cases/create-contract/create-contract.use-case';

export type IngestContractsCreateSqsCommand = Readonly<{
  body: string;
  delete_on_validation_error: boolean;
}>;

@Injectable()
export class IngestContractsCreateSqsMessageUseCase
  implements UseCase<IngestContractsCreateSqsCommand, boolean>
{
  private readonly logger = new Logger(IngestContractsCreateSqsMessageUseCase.name);

  constructor(private readonly create_contract: CreateContractUseCase) {}

  async execute(cmd: IngestContractsCreateSqsCommand): Promise<boolean> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(cmd.body) as unknown;
    } catch {
      this.logger.warn('Cuerpo de mensaje create-contract no es JSON válido; se dejará para reintento.');
      return cmd.delete_on_validation_error;
    }

    const dto = plainToInstance(ContractsSqsCreatePayloadDto, parsed as object, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto as object, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      this.logger.warn(`Mensaje create-contract inválido: ${message}`);
      return cmd.delete_on_validation_error;
    }

    try {
      await this.create_contract.execute({
        external_id: dto.external_id,
        user_external_id: dto.user_external_id,
        application_external_id: dto.application_external_id,
        contract_template_external_id: dto.contract_template_external_id,
        status_external_id: dto.status_external_id,
        zapsign_token: dto.zapsign_token,
        original_file_url: dto.original_file_url,
        signed_file_url: dto.signed_file_url,
        form_answers_json: dto.form_answers_json,
      });
      if (dto.correlation_id !== undefined) {
        this.logger.log(`create-contract procesado; correlation_id=${dto.correlation_id}`);
      }
      return true;
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error al procesar create-contract: ${text}`);
      return false;
    }
  }
}
