import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTRACT_REPOSITORY } from '@modules/contracts/contracts.tokens';
import type { ContractRepository } from '@modules/contracts/domain/ports/contract.repository.port';
import {
  SIGNATURE_PROVIDER,
  type SignatureProviderPort,
} from '@modules/contracts/domain/ports/signature-provider.port';

@Injectable()
export class ProcessZapSignWebhookUseCase {
  constructor(
    @Inject(SIGNATURE_PROVIDER)
    private readonly signature_provider: SignatureProviderPort,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contract_repository: ContractRepository,
    private readonly config_service: ConfigService,
  ) {}

  async execute(
    payload: Record<string, unknown>,
    webhook_secret_header: string | undefined,
  ): Promise<void> {
    const expected = this.config_service.get<string>(
      'config.signature.zapsign.webhook_secret',
    );
    if (expected !== undefined && expected.length > 0) {
      const got = (webhook_secret_header ?? '').trim();
      if (got !== expected) {
        throw new UnauthorizedException('webhook secret inválido');
      }
    }

    const normalized = this.signature_provider.normalize_signed_webhook(payload);
    if (normalized === null) {
      throw new BadRequestException('payload de webhook no reconocido');
    }

    const contract = await this.contract_repository.find_by_zapsign_token(
      normalized.provider_document_token,
    );
    if (contract === null) {
      throw new NotFoundException('contrato no encontrado para el token de documento');
    }

    const prev_form = contract.form_answers_json ?? {};
    const webhook_envelope: Record<string, unknown> = {
      signed_at: normalized.signed_at.toISOString(),
      provider_signer_token: normalized.provider_signer_token,
      sign_url: normalized.sign_url,
      ip_address: normalized.ip_address,
      geo_latitude: normalized.geo_latitude,
      geo_longitude: normalized.geo_longitude,
      document_photo_url: normalized.document_photo_url,
      document_verse_photo_url: normalized.document_verse_photo_url,
      selfie_photo_url: normalized.selfie_photo_url,
      signature_image_url: normalized.signature_image_url,
    };

    await this.contract_repository.update_by_external_id(contract.external_id, {
      signed_file_url: normalized.signed_file_url ?? contract.signed_file_url,
      form_answers_json: {
        ...prev_form,
        zapsign_webhook: webhook_envelope,
      },
    });
  }
}
