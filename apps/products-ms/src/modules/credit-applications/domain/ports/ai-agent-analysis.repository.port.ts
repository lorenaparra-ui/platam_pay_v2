import type { AiAgentAnalysis, CreateAiAgentAnalysisProps } from '../models/ai-agent-analysis.models';

export interface AiAgentAnalysisRepository {
  create(props: CreateAiAgentAnalysisProps): Promise<AiAgentAnalysis>;
  find_by_credit_application_id(credit_application_id: number): Promise<AiAgentAnalysis | null>;
}
