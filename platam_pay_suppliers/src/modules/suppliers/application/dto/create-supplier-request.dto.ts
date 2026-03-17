import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, MinLength } from "class-validator";

export class CreateSupplierRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  businessId: number;

  @ApiPropertyOptional({ description: "Cuenta bancaria (se almacena cifrada)" })
  @IsOptional()
  @IsString()
  bankAccount?: string | null;
}
