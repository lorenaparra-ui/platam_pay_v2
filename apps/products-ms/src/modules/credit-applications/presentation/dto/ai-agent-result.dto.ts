import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AiAgentAnalysisRecommendation } from '@platam/shared';

export class AiAgentResultDto {
  @ApiProperty({ enum: AiAgentAnalysisRecommendation })
  @IsEnum(AiAgentAnalysisRecommendation)
  @IsNotEmpty()
  recommendation!: AiAgentAnalysisRecommendation;

  @ApiPropertyOptional({ description: 'Análisis completo del agente (JSON libre)' })
  @IsOptional()
  @IsObject()
  json_agent_analysis?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'URL del reporte HTML generado por el agente' })
  @IsOptional()
  @IsString()
  html_url_agent_analysis?: string;

  @ApiPropertyOptional({ description: 'Línea de crédito recomendada por el agente (COP)' })
  @IsOptional()
  @IsNumber()
  agent_recommended_loc?: number;
}

export class AiAgentResultResponseDto {
  @ApiProperty({ example: true })
  accepted: boolean;

  constructor(accepted: boolean) {
    this.accepted = accepted;
  }
}
