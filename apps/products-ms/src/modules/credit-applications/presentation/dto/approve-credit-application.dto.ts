import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ApproveCreditApplicationDto {
  @ApiProperty({ description: 'Cupo aprobado en centavos (COP)' })
  @IsNumber()
  @Min(0)
  approvedCreditLine!: number;

  @ApiPropertyOptional({ nullable: true, description: 'Informe del analista' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  analystReport?: string | null;
}
