import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class SalesRepOpinionDto {
  @ApiProperty({ example: '2 años' })
  @IsString()
  relationshipDuration: string;

  @ApiProperty({ example: 8, minimum: 1, maximum: 10 })
  @IsNumber()
  @Min(1)
  @Max(10)
  confidenceScore: number;

  @ApiProperty({ example: 15000000, description: 'LOC recomendado (> 0)' })
  @IsNumber()
  @Min(0.01)
  recommendedLoc: number;
}
