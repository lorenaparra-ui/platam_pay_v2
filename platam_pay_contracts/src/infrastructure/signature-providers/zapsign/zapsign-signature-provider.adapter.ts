import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type {
  CreateSignatureDocumentInput,
  CreateSignatureDocumentResult,
  SignatureDocumentSnapshot,
  SignatureDocumentSnapshotSigner,
  SignatureProviderPort,
  SignatureWebhookNormalizedEvent,
} from "@contracts/domain/ports/signature-provider.port";

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

  constructor(private readonly configService: ConfigService) {}

  async createDocumentFromTemplate(
    input: CreateSignatureDocumentInput,
  ): Promise<CreateSignatureDocumentResult> {
    const baseUrl = this.configService.get<string>(
      "config.signature.zapsign.baseUrl",
    );
    const apiToken = this.configService.get<string>(
      "config.signature.zapsign.apiToken",
    );

    if (!baseUrl || !apiToken) {
      throw new Error("Configuracion incompleta para ZapSign");
    }

    const response = await fetch(`${baseUrl}/models/create-doc/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        // Endpoint oficial para crear documentos via plantilla (DOCX).
        name: `pp_contract_${input.templateId}_${Date.now()}`,
        sandbox: input.sandbox,
        folder_path: input.folderPath,
        signer_name: input.signerName,
        signer_email: input.signerEmail,
        signer_phone_country: input.signerPhoneCountry,
        signer_phone_number: input.signerPhoneNumber,
        template_id: input.templateId,
        // El endpoint de plantilla usa "data" para reemplazos dinamicos.
        data: input.replacements.map((replacement) => ({
          de: replacement.from,
          para: replacement.to,
        })),
        // Compatibilidad defensiva para templates que aceptan "replacements".
        replacements: input.replacements.map((replacement) => ({
          de: replacement.from,
          para: replacement.to,
        })),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`ZapSign error ${response.status}: ${body}`);
      throw new Error("Error al crear contrato en proveedor de firma");
    }

    const result = (await response.json()) as ZapSignCreateDocResponse;
    const signer = result.signers?.[0];
    if (!result.token || !signer?.token) {
      throw new Error("Respuesta invalida del proveedor de firma");
    }

    return {
      providerDocumentToken: result.token,
      originalFileUrl: result.original_file ?? null,
      signer: {
        providerSignerToken: signer.token,
        signUrl: signer.sign_url ?? null,
      },
      rawResponse: result as unknown as Record<string, unknown>,
    };
  }

  async cancelDocument(providerDocumentToken: string): Promise<void> {
    const baseUrl = this.configService.get<string>(
      "config.signature.zapsign.baseUrl",
    );
    const apiToken = this.configService.get<string>(
      "config.signature.zapsign.apiToken",
    );
    if (!baseUrl || !apiToken) {
      throw new Error("Configuracion incompleta para ZapSign");
    }

    const response = await fetch(`${baseUrl}/docs/${providerDocumentToken}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (!response.ok && response.status !== 404) {
      throw new Error("Error al cancelar contrato en proveedor de firma");
    }
  }

  async getDocumentSnapshot(
    providerDocumentToken: string,
  ): Promise<SignatureDocumentSnapshot | null> {
    const baseUrl = this.configService.get<string>(
      "config.signature.zapsign.baseUrl",
    );
    const apiToken = this.configService.get<string>(
      "config.signature.zapsign.apiToken",
    );
    if (!baseUrl || !apiToken) {
      throw new Error("Configuracion incompleta para ZapSign");
    }

    const response = await fetch(`${baseUrl}/docs/${providerDocumentToken}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      const body = await response.text();
      this.logger.error(`ZapSign get doc error ${response.status}: ${body}`);
      throw new Error("Error al consultar contrato en proveedor de firma");
    }

    const result = (await response.json()) as ZapSignDocumentResponse;
    const signers = this.extractSnapshotSigners(result);
    return {
      providerDocumentToken: result.token ?? providerDocumentToken,
      documentStatus: result.status ?? null,
      signedFileUrl: result.signed_file ?? null,
      signers,
      rawPayload: result as unknown as Record<string, unknown>,
    };
  }

  normalizeSignedWebhook(
    payload: Record<string, unknown>,
  ): SignatureWebhookNormalizedEvent | null {
    const documentToken = this.pickString(payload, "token");
    const signedFileUrl = this.pickString(payload, "signed_file");
    const signers = payload.signers;
    if (!Array.isArray(signers) || signers.length === 0 || !documentToken) {
      return null;
    }

    const firstSigner = signers[0] as Record<string, unknown>;
    const signerToken = this.pickString(firstSigner, "token");
    const signedAtRaw =
      this.pickStringMany(firstSigner, ["signed_at", "signedAt"]) ??
      this.pickStringMany(payload, ["signed_at", "signedAt", "event_date"]);
    if (!signerToken || !signedAtRaw) {
      return null;
    }

    const nestedGeolocation = this.pickObject(firstSigner, "geolocation");
    const geoLatitude =
      this.pickStringMany(firstSigner, ["geo_latitude", "latitude"]) ??
      (nestedGeolocation ? this.pickStringMany(nestedGeolocation, ["latitude"]) : null);
    const geoLongitude =
      this.pickStringMany(firstSigner, ["geo_longitude", "longitude"]) ??
      (nestedGeolocation ? this.pickStringMany(nestedGeolocation, ["longitude"]) : null);

    return {
      providerDocumentToken: documentToken,
      providerSignerToken: signerToken,
      signedAt: new Date(signedAtRaw),
      signedFileUrl: signedFileUrl ?? null,
      signUrl:
        this.pickStringMany(firstSigner, ["sign_url", "signUrl"]) ??
        signedFileUrl ??
        this.pickStringMany(payload, ["signed_file", "signedFile"]),
      ipAddress: this.pickStringMany(firstSigner, ["ip", "ip_address", "ipAddress"]),
      geoLatitude,
      geoLongitude,
      documentPhotoUrl: this.pickString(firstSigner, "document_photo_url"),
      documentVersePhotoUrl: this.pickString(
        firstSigner,
        "document_verse_photo_url",
      ),
      selfiePhotoUrl: this.pickString(firstSigner, "selfie_photo_url"),
      signatureImageUrl: this.pickString(firstSigner, "signature_image"),
      rawPayload: payload,
    };
  }

  private extractSnapshotSigners(
    payload: ZapSignDocumentResponse,
  ): SignatureDocumentSnapshotSigner[] {
    if (!Array.isArray(payload.signers)) {
      return [];
    }

    const snapshotSigners: SignatureDocumentSnapshotSigner[] = [];
    for (const signerRaw of payload.signers) {
      const signer = signerRaw as Record<string, unknown>;
      const token = this.pickStringMany(signer, ["token"]);
      if (!token) continue;
      snapshotSigners.push({
        providerSignerToken: token,
        signUrl: this.pickStringMany(signer, ["sign_url", "signUrl"]),
        signedAt: this.parseDateOrNull(
          this.pickStringMany(signer, ["signed_at", "signedAt"]),
        ),
        ipAddress: this.pickStringMany(signer, ["ip", "ip_address", "ipAddress"]),
        geoLatitude: this.pickStringMany(signer, ["geo_latitude", "latitude"]),
        geoLongitude: this.pickStringMany(signer, ["geo_longitude", "longitude"]),
        documentPhotoUrl: this.pickStringMany(signer, [
          "document_photo_url",
          "documentPhotoUrl",
        ]),
        documentVersePhotoUrl: this.pickStringMany(signer, [
          "document_verse_photo_url",
          "documentVersePhotoUrl",
        ]),
        selfiePhotoUrl: this.pickStringMany(signer, ["selfie_photo_url", "selfiePhotoUrl"]),
        signatureImageUrl: this.pickStringMany(signer, ["signature_image", "signatureImage"]),
      });
    }

    return snapshotSigners;
  }

  private pickString(
    source: Record<string, unknown>,
    key: string,
  ): string | null {
    const value = source[key];
    return typeof value === "string" ? value : null;
  }

  private pickStringMany(
    source: Record<string, unknown>,
    keys: string[],
  ): string | null {
    for (const key of keys) {
      const value = source[key];
      if (typeof value === "string" && value.trim().length > 0) {
        return value;
      }
    }
    return null;
  }

  private pickObject(
    source: Record<string, unknown>,
    key: string,
  ): Record<string, unknown> | null {
    const value = source[key];
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return null;
    }
    return value as Record<string, unknown>;
  }

  private parseDateOrNull(raw: string | null): Date | null {
    if (!raw) return null;
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
}
