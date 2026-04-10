import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { AiAgentAnalysisRecommendation } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CreditApplicationEntity } from './credit-application.entity';

@Entity({ name: 'ai_agent_analysis', schema: 'products_schema' })
export class AiAgentAnalysisEntity extends BaseExternalIdEntity {
  @OneToOne(() => CreditApplicationEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'credit_application_id', referencedColumnName: 'id' })
  creditApplication: CreditApplicationEntity;

  @RelationId((a: AiAgentAnalysisEntity) => a.creditApplication)
  creditApplicationId: number;

  @Column({ name: 'analysis_result', type: 'jsonb' })
  analysisResult: Record<string, unknown>;

  @Column({
    name: 'recommendation',
    type: 'enum',
    enum: AiAgentAnalysisRecommendation,
    enumName: 'ai_agent_analysis_recommendation',
  })
  recommendation: AiAgentAnalysisRecommendation;

  @Column({
    name: 'confidence_score',
    type: 'decimal',
    precision: 5,
    scale: 4,
    nullable: true,
  })
  confidenceScore: string | null;

  @Column({ name: 'analyzed_at', type: 'timestamptz' })
  analyzedAt: Date;
}
