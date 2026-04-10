import { BaseSqsIdempotencyEntity } from './base-sqs-idempotency.entity';
export type UploadFilesIdempotencyResult = ReadonlyArray<Readonly<{
    url: string;
    folder: string;
}>>;
export declare class UploadFilesIdempotencyEntity extends BaseSqsIdempotencyEntity {
    result: UploadFilesIdempotencyResult | null;
}
