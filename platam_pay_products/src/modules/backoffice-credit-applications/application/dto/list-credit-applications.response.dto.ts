import { ApiProperty } from "@nestjs/swagger";
import { CreditApplicationListItemResponseDto } from "./credit-application-list-item.response.dto";

export class CreditApplicationsPaginationDto {
  @ApiProperty({ example: true })
  has_more: boolean;

  @ApiProperty({ example: 20 })
  page_size: number;

  @ApiProperty({
    nullable: true,
    example:
      "eyJzb3J0QnlWYWx1ZSI6IjIwMjYtMDMtMTBUMTI6MDA6MDAuMDAwWiIsImlkIjo4MTJ9",
  })
  next_cursor: string | null;
}

export class ListCreditApplicationsResponseDto {
  @ApiProperty({ type: CreditApplicationListItemResponseDto, isArray: true })
  items: CreditApplicationListItemResponseDto[];

  @ApiProperty({ type: CreditApplicationsPaginationDto })
  pagination: CreditApplicationsPaginationDto;
}
