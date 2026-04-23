import type { AiAgentAnalysisRecommendation } from '@platam/shared';

export interface AiAgentAnalysisParams {
  credit_application_external_id: string;
  credit_score: number;
  credit_report: Record<string, unknown>;
}

export interface AiAgentAnalysisResult {
  recommendation: AiAgentAnalysisRecommendation;
  html_url_agent_analysis: string | null;
  json_agent_analysis: Record<string, unknown>;
  agent_recommended_loc: number | null;
}

export interface AiAgentServicePort {
  analyze(params: AiAgentAnalysisParams): Promise<AiAgentAnalysisResult>;
}
