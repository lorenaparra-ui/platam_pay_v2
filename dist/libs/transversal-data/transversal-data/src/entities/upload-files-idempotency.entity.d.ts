export declare class UploadFilesIdempotencyEntity {
    id: string;
    idempotency_key: string;
    correlation_id: string;
    result_files: {
        url: string;
        folder: string;
    }[] | null;
    created_at: Date;
}
