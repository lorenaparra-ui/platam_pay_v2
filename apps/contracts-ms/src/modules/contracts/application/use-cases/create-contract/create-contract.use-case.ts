import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import { build_contract_public_response } from '@modules/contracts/application/mapping/contract-public-fields.builder';
import type { CreateContractCommand } from './create-contract.command';

@Injectable()
export class CreateContractUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
    @Inject(CONTRACT_REFERENCE_LOOKUP)
    private readonly lookup: ContractReferenceLookupPort,
  ) {}

  async execute(command: CreateContractCommand) {
    const user_id = await this.lookup.get_user_internal_id_by_external_id(
      command.user_external_id,
    );
    if (user_id === null) {
      throw new NotFoundException('user not found');
    }

    let application_id: number | null = null;
    if (command.application_external_id !== undefined) {
      const app_id = await this.lookup.get_application_internal_id_by_external_id(
        command.application_external_id,
      );
      if (app_id === null) {
        throw new NotFoundException('application not found');
      }
      application_id = app_id;
    }

    const status_id = await this.lookup.get_contract_status_internal_id_by_external_id(
      command.status_external_id,
    );
    if (status_id === null) {
      throw new NotFoundException('status not found');
    }

    const created = await this.contract_repository.create({
      external_id: command.external_id,
      user_id,
      application_id,
      zapsign_token: command.zapsign_token ?? null,
      status_id,
      original_file_url: command.original_file_url ?? null,
      signed_file_url: command.signed_file_url ?? null,
      form_answers_json: command.form_answers_json ?? null,
    });

    return build_contract_public_response(created, this.lookup);
  }
}
