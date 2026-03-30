export const PARTNER_ONBOARDING_FILES_PORT = Symbol('PARTNER_ONBOARDING_FILES_PORT');

export type PartnerOnboardingUploadedFile = Readonly<{
  originalname: string;
  mimetype: string;
  size: number;
  /** Presente cuando multipart usa almacenamiento en memoria (base64 crudo para upload-files). */
  content_base64?: string;
}>;

export interface PartnerOnboardingFilesPort {
  resolve_urls(input: Readonly<{
    correlation_id: string;
    /** Clave idempotente por intento de saga (p. ej. external_id de la saga). */
    idempotency_key: string;
    bank_certification: PartnerOnboardingUploadedFile | undefined;
    logo: PartnerOnboardingUploadedFile | undefined;
    co_branding: PartnerOnboardingUploadedFile | undefined;
    /**
     * Subcarpeta S3 por archivo (transversal-ms), bajo
     * `partner-onboarding/{partner}/{idempotency}/`.
     */
    file_folders?: Readonly<{
      bank_certification?: string;
      logo?: string;
      co_branding?: string;
    }>;
  }>): Promise<Readonly<{
    bank_certification_url: string;
    logo_url: string;
    co_branding_url: string;
  }>>;
}
