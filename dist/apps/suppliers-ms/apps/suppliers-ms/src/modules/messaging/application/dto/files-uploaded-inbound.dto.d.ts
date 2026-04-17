export declare class FilesUploadedItemDto {
    url: string;
    folder: string;
}
export declare class FilesUploadedPayloadDto {
    files: FilesUploadedItemDto[];
}
export declare class FilesUploadedInboundDto {
    event: string;
    correlation_id: string;
    payload: FilesUploadedPayloadDto;
}
