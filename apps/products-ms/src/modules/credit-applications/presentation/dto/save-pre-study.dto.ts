import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SavePreStudyDto {
  @ApiPropertyOptional({ nullable: true, description: 'Score crediticio (decimal como string)' })
  @IsOptional()
  @IsString()
  creditScore?: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'Decisión del estudio (ej: approved, rejected, review)' })
  @IsOptional()
  @IsString()
  creditDecision?: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'Perfil de riesgo (ej: low, medium, high)' })
  @IsOptional()
  @IsString()
  riskProfile?: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'Informe del analista en texto libre' })
  @IsOptional()
  @IsString()
  analystReport?: string | null;

  @ApiPropertyOptional({ nullable: true, description: 'Fecha del estudio (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  creditStudyDate?: string | null;
}
