export declare const PARTNER_ONBOARDING_FILES_PORT: unique symbol;
export type PartnerOnboardingUploadedFile = Readonly<{
    originalname: string;
    mimetype: string;
    size: number;
    content_base64?: string;
}>;
export interface PartnerOnboardingFilesPort {
    resolve_urls(input: Readonly<{
        correlation_id: string;
        idempotency_key: string;
        bank_certification: PartnerOnboardingUploadedFile | undefined;
        logo: PartnerOnboardingUploadedFile | undefined;
        co_branding: PartnerOnboardingUploadedFile | undefined;
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
