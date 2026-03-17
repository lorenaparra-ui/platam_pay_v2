import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class FinancialInformationDto {
  @ApiProperty({ example: 100000000, minimum: 0 })
  @IsNumber()
  @Min(0)
  totalAssets: number;

  @ApiProperty({ example: 15000000, minimum: 0 })
  @IsNumber()
  @Min(0)
  monthlyIncome: number;

  @ApiProperty({ example: 8000000, minimum: 0 })
  @IsNumber()
  @Min(0)
  monthlyExpenses: number;

  @ApiPropertyOptional({ example: 5000000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyPurchases?: number;

  @ApiPropertyOptional({ example: 2000000, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  currentPurchases?: number;

  @ApiProperty({ example: 10000000, description: 'Monto solicitado (debe ser > 0)' })
  @IsNumber()
  @Min(0.01)
  requestedLoc: number;
}
