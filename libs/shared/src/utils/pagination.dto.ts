import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  limit = 20;
}

export type PaginatedResponseDto<T> = Readonly<{
  items: readonly T[];
  total: number;
  offset: number;
  limit: number;
}>;
