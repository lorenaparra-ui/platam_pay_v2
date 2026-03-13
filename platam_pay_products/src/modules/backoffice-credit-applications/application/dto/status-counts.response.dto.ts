import { ApiProperty } from "@nestjs/swagger";
import {
  CREDIT_APPLICATION_STATUS_CODES,
  type CreditApplicationStatusCode,
} from "../../domain/models/credit-application-status-code.model";

export class CreditApplicationStatusCountItemDto {
  @ApiProperty({ enum: CREDIT_APPLICATION_STATUS_CODES })
  status_code: CreditApplicationStatusCode;

  @ApiProperty({ example: 12 })
  total: number;
}

export class CreditApplicationStatusCountsResponseDto {
  @ApiProperty({ example: 47 })
  total: number;

  @ApiProperty({ type: CreditApplicationStatusCountItemDto, isArray: true })
  counts: CreditApplicationStatusCountItemDto[];
}
