import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class CreatePurchaseOrderRequestDto {
  @ApiProperty({ example: "user-uuid-from-users-service" })
  @IsString()
  userId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  supplierId: number;

  @ApiProperty({ example: "150000.50" })
  @IsString()
  amount: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  documentUrl?: string | null;
}
