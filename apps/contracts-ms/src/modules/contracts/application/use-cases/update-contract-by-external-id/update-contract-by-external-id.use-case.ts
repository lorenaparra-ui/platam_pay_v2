import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import { build_contract_public_response } from '@modules/contracts/application/mapping/contract-public-fields.builder';
import type { UpdateContractProps } from '@modules/contracts/domain/models/contract.models';
import type { UpdateContractCommand } from './update-contract.command';

@Injectable()
export class UpdateContractByExternalIdUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
    @Inject(CONTRACT_REFERENCE_LOOKUP)
    private readonly lookup: ContractReferenceLookupPort,
  ) {}

  async execute(external_id: string, command: UpdateContractCommand) {
    const patch: UpdateContractProps = {};

    if (command.application_external_id !== undefined) {
      if (command.application_external_id === null) {
        patch.application_id = null;
      } else {
        const app_id = await this.lookup.get_application_internal_id_by_external_id(
          command.application_external_id,
        );
        if (app_id === null) {
          throw new NotFoundException('application not found');
        }
        patch.application_id = app_id;
      }
    }

    if (command.status_external_id !== undefined) {
      const status_id = await this.lookup.get_contract_status_internal_id_by_external_id(
        command.status_external_id,
      );
      if (status_id === null) {
        throw new NotFoundException('status not found');
      }
      patch.status_id = status_id;
    }

    if (command.zapsign_token !== undefined) {
      patch.zapsign_token = command.zapsign_token;
    }
    if (command.original_file_url !== undefined) {
      patch.original_file_url = command.original_file_url;
    }
    if (command.signed_file_url !== undefined) {
      patch.signed_file_url = command.signed_file_url;
    }
    if (command.form_answers_json !== undefined) {
      patch.form_answers_json = command.form_answers_json;
    }

    const updated = await this.contract_repository.update_by_external_id(external_id, patch);
    if (updated === null) {
      throw new NotFoundException('contract not found');
    }
    return build_contract_public_response(updated, this.lookup);
  }
}
