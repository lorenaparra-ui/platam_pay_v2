import type { AiAgentAnalysisRecommendation } from '@platam/shared';

export class AiAgentAnalysis {
  constructor(
    readonly internal_id: number,
    readonly external_id: string,
    readonly credit_application_id: number,
    readonly analysis_result: Record<string, unknown>,
    readonly recommendation: AiAgentAnalysisRecommendation,
    readonly confidence_score: string | null,
    readonly analyzed_at: Date,
    readonly html_url_agent_analysis: string | null,
    readonly agent_recommended_loc: string | null,
    readonly created_at: Date,
    readonly updated_at: Date,
  ) {}
}

export interface CreateAiAgentAnalysisProps {
  credit_application_id: number;
  analysis_result: Record<string, unknown>;
  recommendation: AiAgentAnalysisRecommendation;
  confidence_score: string | null;
  analyzed_at: Date;
  html_url_agent_analysis: string | null;
  agent_recommended_loc: string | null;
}
