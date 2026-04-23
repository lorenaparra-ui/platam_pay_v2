import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  CreateSignatureDocumentInput,
  CreateSignatureDocumentResult,
  SignatureDocumentSnapshot,
  SignatureDocumentSnapshotSigner,
  SignatureProviderPort,
  SignatureWebhookNormalizedEvent,
} from '@modules/contracts/domain/ports/signature-provider.port';

interface ZapSignSignerResponse {
  token?: string;
  sign_url?: string;
  signed_at?: string | null;
  ip?: string | null;
  geo_latitude?: string | null;
  geo_longitude?: string | null;
  document_photo_url?: string | null;
  document_verse_photo_url?: string | null;
  selfie_photo_url?: string | null;
  signature_image?: string | null;
}

interface ZapSignCreateDocResponse {
  token?: string;
  original_file?: string;
  signed_file?: string | null;
  signers?: ZapSignSignerResponse[];
}

interface ZapSignDocumentResponse extends ZapSignCreateDocResponse {
  status?: string;
}

@Injectable()
export class ZapSignSignatureProviderAdapter implements SignatureProviderPort {
  private readonly logger = new Logger(ZapSignSignatureProviderAdapter.name);

  constructor(private readonly config_service: ConfigService) {}

  async create_document_from_template(
    input: CreateSignatureDocumentInput,
  ): Promise<CreateSignatureDocumentResult> {
    const base_url = this.config_service.get<string>('config.signature.zapsign.base_url');
    const api_token = this.config_service.get<string>('config.signature.zapsign.api_token');

    if (!base_url?.trim() || !api_token?.trim()) {
      throw new Error('Configuración incompleta para ZapSign (base_url / api_token)');
    }

    const url = `${base_url.replace(/\/$/, '')}/models/create-doc/`;
    const body = {
      name: `pp_contract_${input.template_id}_${Date.now()}`,
      sandbox: input.sandbox,
      folder_path: input.folder_path,
      signer_name: input.signer_name,
      signer_email: input.signer_email,
      signer_phone_country: input.signer_phone_country,
      signer_phone_number: input.signer_phone_number,
      template_id: input.template_id,
      data: input.replacements.map((r) => ({ de: r.from, para: r.to })),
      replacements: input.replacements.map((r) => ({ de: r.from, para: r.to })),
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${api_token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      this.logger.error(`ZapSign create-doc HTTP ${response.status}`);
      throw new Error('Error al crear documento en proveedor de firma');
    }

    const result = (await response.json()) as ZapSignCreateDocResponse;
    const signer = result.signers?.[0];
    if (!result.token || !signer?.token) {
      throw new Error('Respuesta inválida del proveedor de firma');
    }

    return {
      provider_document_token: result.token,
      original_file_url: result.original_file ?? null,
      signer: {
        provider_signer_token: signer.token,
        sign_url: signer.sign_url ?? null,
      },
      raw_response: result as unknown as Record<string, unknown>,
    };
  }

  async cancel_document(provider_document_token: string): Promise<void> {
    const base_url = this.config_service.get<string>('config.signature.zapsign.base_url');
    const api_token = this.config_service.get<string>('config.signature.zapsign.api_token');
    if (!base_url?.trim() || !api_token?.trim()) {
      throw new Error('Configuración incompleta para ZapSign');
    }

    const url = `${base_url.replace(/\/$/, '')}/docs/${encodeURIComponent(provider_document_token)}/`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${api_token}` },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error('Error al cancelar documento en proveedor de firma');
    }
  }

  async get_document_snapshot(
    provider_document_token: string,
  ): Promise<SignatureDocumentSnapshot | null> {
    const base_url = this.config_service.get<string>('config.signature.zapsign.base_url');
    const api_token = this.config_service.get<string>('config.signature.zapsign.api_token');
    if (!base_url?.trim() || !api_token?.trim()) {
      throw new Error('Configuración incompleta para ZapSign');
    }

    const url = `${base_url.replace(/\/$/, '')}/docs/${encodeURIComponent(provider_document_token)}/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${api_token}` },
    });

    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      this.logger.error(`ZapSign get-doc HTTP ${response.status}`);
      throw new Error('Error al consultar documento en proveedor de firma');
    }

    const result = (await response.json()) as ZapSignDocumentResponse;
    const signers = this.extract_snapshot_signers(result);
    return {
      provider_document_token: result.token ?? provider_document_token,
      document_status: result.status ?? null,
      signed_file_url: result.signed_file ?? null,
      signers,
      raw_payload: result as unknown as Record<string, unknown>,
    };
  }

  normalize_signed_webhook(
    payload: Record<string, unknown>,
  ): SignatureWebhookNormalizedEvent | null {
    const document_token = this.pick_string(payload, 'token');
    const signed_file_url = this.pick_string(payload, 'signed_file');
    const signers = payload['signers'];
    if (!Array.isArray(signers) || signers.length === 0 || !document_token) {
      return null;
    }

    const first_signer = signers[0] as Record<string, unknown>;
    const signer_token = this.pick_string(first_signer, 'token');
    const signed_at_raw =
      this.pick_string_many(first_signer, ['signed_at', 'signedAt']) ??
      this.pick_string_many(payload, ['signed_at', 'signedAt', 'event_date']);
    if (!signer_token || !signed_at_raw) {
      return null;
    }

    const nested_geo = this.pick_object(first_signer, 'geolocation');
    const geo_latitude =
      this.pick_string_many(first_signer, ['geo_latitude', 'latitude']) ??
      (nested_geo ? this.pick_string_many(nested_geo, ['latitude']) : null);
    const geo_longitude =
      this.pick_string_many(first_signer, ['geo_longitude', 'longitude']) ??
      (nested_geo ? this.pick_string_many(nested_geo, ['longitude']) : null);

    return {
      provider_document_token: document_token,
      provider_signer_token: signer_token,
      signed_at: new Date(signed_at_raw),
      signed_file_url: signed_file_url ?? null,
      sign_url:
        this.pick_string_many(first_signer, ['sign_url', 'signUrl']) ??
        signed_file_url ??
        this.pick_string_many(payload, ['signed_file', 'signedFile']),
      ip_address: this.pick_string_many(first_signer, ['ip', 'ip_address', 'ipAddress']),
      geo_latitude,
      geo_longitude,
      document_photo_url: this.pick_string(first_signer, 'document_photo_url'),
      document_verse_photo_url: this.pick_string(first_signer, 'document_verse_photo_url'),
      selfie_photo_url: this.pick_string(first_signer, 'selfie_photo_url'),
      signature_image_url: this.pick_string(first_signer, 'signature_image'),
      raw_payload: payload,
    };
  }

  private extract_snapshot_signers(
    payload: ZapSignDocumentResponse,
  ): SignatureDocumentSnapshotSigner[] {
    if (!Array.isArray(payload.signers)) {
      return [];
    }

    const out: SignatureDocumentSnapshotSigner[] = [];
    for (const signer_raw of payload.signers) {
      const signer = signer_raw as Record<string, unknown>;
      const token = this.pick_string_many(signer, ['token']);
      if (!token) continue;
      out.push({
        provider_signer_token: token,
        sign_url: this.pick_string_many(signer, ['sign_url', 'signUrl']),
        signed_at: this.parse_date_or_null(
          this.pick_string_many(signer, ['signed_at', 'signedAt']),
        ),
        ip_address: this.pick_string_many(signer, ['ip', 'ip_address', 'ipAddress']),
        geo_latitude: this.pick_string_many(signer, ['geo_latitude', 'latitude']),
        geo_longitude: this.pick_string_many(signer, ['geo_longitude', 'longitude']),
        document_photo_url: this.pick_string_many(signer, [
          'document_photo_url',
          'documentPhotoUrl',
        ]),
        document_verse_photo_url: this.pick_string_many(signer, [
          'document_verse_photo_url',
          'documentVersePhotoUrl',
        ]),
        selfie_photo_url: this.pick_string_many(signer, ['selfie_photo_url', 'selfiePhotoUrl']),
        signature_image_url: this.pick_string_many(signer, ['signature_image', 'signatureImage']),
      });
    }
    return out;
  }

  private pick_string(source: Record<string, unknown>, key: string): string | null {
    const value = source[key];
    return typeof value === 'string' ? value : null;
  }

  private pick_string_many(
    source: Record<string, unknown>,
    keys: readonly string[],
  ): string | null {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }
    return null;
  }

  private pick_object(
    source: Record<string, unknown>,
    key: string,
  ): Record<string, unknown> | null {
    const value = source[key];
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return null;
    }
    return value as Record<string, unknown>;
  }

  private parse_date_or_null(raw: string | null): Date | null {
    if (!raw) return null;
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
}
