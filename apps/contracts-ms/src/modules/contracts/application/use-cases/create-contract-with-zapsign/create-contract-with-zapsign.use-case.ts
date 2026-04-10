import { Inject, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTRACT_REFERENCE_LOOKUP } from '@common/ports/contract-reference-lookup.port';
import type { ContractReferenceLookupPort } from '@common/ports/contract-reference-lookup.port';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import {
  SIGNATURE_PROVIDER,
  type SignatureProviderPort,
} from '@modules/contracts/domain/ports/signature-provider.port';
import { build_contract_public_response } from '@modules/contracts/application/mapping/contract-public-fields.builder';
import { build_zapsign_replacements } from '@modules/contracts/application/mapping/zapsign-replacements.builder';

export interface CreateContractWithZapsignInput {
  readonly external_id?: string;
  readonly user_external_id?: string;
  readonly application_external_id?: string;
  readonly contract_template_external_id?: string;
  readonly status_external_id: string;
  readonly signer_name: string;
  readonly signer_email: string;
  readonly signer_phone_country: string;
  readonly signer_phone_number: string;
  readonly sandbox?: boolean;
  readonly folder_path?: string;
  readonly template_data?: Record<string, unknown>;
  readonly replacements?: ReadonlyArray<{ from: string; to: string }>;
  readonly form_answers_json?: Record<string, unknown> | null;
}

@Injectable()
export class CreateContractWithZapsignUseCase {
  constructor(
    @Inject(SIGNATURE_PROVIDER)
    private readonly signature_provider: SignatureProviderPort,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
    @Inject(CONTRACT_REFERENCE_LOOKUP)
    private readonly lookup: ContractReferenceLookupPort,
    private readonly config_service: ConfigService,
  ) {}

  async execute(input: CreateContractWithZapsignInput) {
    let user_id: number | null = null;
    const user_ext = input.user_external_id;
    if (user_ext !== undefined && user_ext !== null && String(user_ext).trim().length > 0) {
      const resolved = await this.lookup.get_user_internal_id_by_external_id(user_ext);
      if (resolved === null) {
        throw new NotFoundException('user not found');
      }
      user_id = resolved;
    }

    let credit_application_internal_id: number | null = null;
    if (input.application_external_id !== undefined) {
      const app_id = await this.lookup.get_application_internal_id_by_external_id(
        input.application_external_id,
      );
      if (app_id === null) {
        throw new NotFoundException('application not found');
      }
      credit_application_internal_id = app_id;
    }

    const status = await this.lookup.get_contract_catalog_status_by_external_id(
      input.status_external_id,
    );
    if (status === null) {
      throw new NotFoundException('status not found');
    }

    let contract_template_id: number | null = null;
    if (input.contract_template_external_id !== undefined) {
      const tid = await this.lookup.get_contract_template_internal_id_by_external_id(
        input.contract_template_external_id,
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

    const zapsign_template_ref =
      await this.lookup.get_zapsign_template_ref_by_internal_id(contract_template_id);
    if (zapsign_template_ref === null) {
      throw new BadRequestException(
        'La plantilla no tiene zapsign_template_ref configurado en base de datos',
      );
    }

    const dynamic_replacements = build_zapsign_replacements(
      input.template_data,
      input.replacements,
    );
    if (dynamic_replacements.length === 0) {
      throw new BadRequestException(
        'Debe enviar template_data y/o replacements para sustituir variables en la plantilla',
      );
    }

    const sandbox =
      input.sandbox ??
      (this.config_service.get<boolean>('config.signature.zapsign.sandbox_default') ?? true);
    const folder_path =
      input.folder_path?.trim() ||
      this.config_service.get<string>('config.signature.zapsign.folder_path_default') ||
      '/';

    const signature_result = await this.signature_provider.create_document_from_template({
      template_id: zapsign_template_ref,
      folder_path,
      sandbox,
      signer_name: input.signer_name,
      signer_email: input.signer_email,
      signer_phone_country: input.signer_phone_country,
      signer_phone_number: input.signer_phone_number,
      replacements: dynamic_replacements,
    });

    const zapsign_envelope: Record<string, unknown> = {
      create_response: signature_result.raw_response,
      signer_token: signature_result.signer.provider_signer_token,
      sign_url: signature_result.signer.sign_url,
    };

    const merged_form: Record<string, unknown> | null =
      input.form_answers_json === undefined || input.form_answers_json === null
        ? { zapsign: zapsign_envelope }
        : { ...input.form_answers_json, zapsign: zapsign_envelope };

    const created = await this.contract_repository.create({
      external_id: input.external_id,
      user_id,
      contract_template_id,
      zapsign_token: signature_result.provider_document_token,
      status,
      original_file_url: signature_result.original_file_url,
      signed_file_url: null,
      form_answers_json: merged_form,
      credit_application_internal_id,
    });

    return build_contract_public_response(created, this.lookup);
  }
}
