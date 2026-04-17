export declare class PaginationRequestDto {
    offset: number;
    limit: number;
}
export type PaginatedResponseDto<T> = Readonly<{
    items: readonly T[];
    total: number;
    offset: number;
    limit: number;
}>;
