export type FilesUploadedUrls = Readonly<{
    bank_certification_url?: string;
    logo_url?: string;
    co_branding_url?: string;
}>;
export declare class FilesUploadedCorrelationAwaiter {
    private readonly pending;
    private readonly early;
    wait(correlation_id: string, timeout_ms: number): Promise<FilesUploadedUrls>;
    complete(correlation_id: string, urls: FilesUploadedUrls): void;
}
