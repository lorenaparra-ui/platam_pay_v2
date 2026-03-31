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
    let user_id: number | null = null;
    const user_ext = command.user_external_id;
    if (user_ext !== undefined && user_ext !== null && String(user_ext).trim().length > 0) {
      const resolved = await this.lookup.get_user_internal_id_by_external_id(user_ext);
      if (resolved === null) {
        throw new NotFoundException('user not found');
      }
      user_id = resolved;
    }

    let credit_application_internal_id: number | null = null;
    if (command.application_external_id !== undefined) {
      const app_id = await this.lookup.get_application_internal_id_by_external_id(
        command.application_external_id,
      );
      if (app_id === null) {
        throw new NotFoundException('application not found');
      }
      credit_application_internal_id = app_id;
    }

    const status_id = await this.lookup.get_contract_status_internal_id_by_external_id(
      command.status_external_id,
    );
    if (status_id === null) {
      throw new NotFoundException('status not found');
    }

    let contract_template_id: number | null = null;
    if (command.contract_template_external_id !== undefined) {
      const tid = await this.lookup.get_contract_template_internal_id_by_external_id(
        command.contract_template_external_id,
      );
      if (tid === null) {
        throw new NotFoundException('contract template not found');
      }
      contract_template_id = tid;
    } else {
      const defaulted = await this.lookup.get_default_contract_template_internal_id();
      if (defaulted === null) {
        throw new NotFoundException('default contract template not configured');
      }
      contract_template_id = defaulted;
    }

    const created = await this.contract_repository.create({
      external_id: command.external_id,
      user_id,
      contract_template_id,
      zapsign_token: command.zapsign_token ?? null,
      status_id,
      original_file_url: command.original_file_url ?? null,
      signed_file_url: command.signed_file_url ?? null,
      form_answers_json: command.form_answers_json ?? null,
      credit_application_internal_id,
    });

    return build_contract_public_response(created, this.lookup);
  }
}
