export declare const PARTNER_LOGO_STORAGE_PORT = "PARTNER_LOGO_STORAGE_PORT";
export interface UploadLogoPayload {
    key: string;
    body: Buffer;
    content_type?: string;
}
export interface UploadLogoResult {
    key: string;
    location: string;
}
export interface PartnerLogoStoragePort {
    upload(payload: UploadLogoPayload): Promise<UploadLogoResult>;
}
