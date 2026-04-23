import { Injectable, Logger } from '@nestjs/common';
import { AiAgentAnalysisRecommendation } from '@platam/shared';
import type {
  AiAgentAnalysisParams,
  AiAgentAnalysisResult,
  AiAgentServicePort,
} from '@modules/credit-applications/domain/ports/ai-agent-service.port';

@Injectable()
export class StubAiAgentAdapter implements AiAgentServicePort {
  private readonly logger = new Logger(StubAiAgentAdapter.name);

  async analyze(params: AiAgentAnalysisParams): Promise<AiAgentAnalysisResult> {
    const forced = process.env.AI_AGENT_MOCK_RECOMMENDATION;
    const approve_threshold = parseInt(process.env.AI_AGENT_MOCK_APPROVE_THRESHOLD ?? '700', 10);
    const review_threshold = parseInt(process.env.AI_AGENT_MOCK_REVIEW_THRESHOLD ?? '450', 10);

    let recommendation: AiAgentAnalysisRecommendation;

    if (forced && Object.values(AiAgentAnalysisRecommendation).includes(forced as AiAgentAnalysisRecommendation)) {
      recommendation = forced as AiAgentAnalysisRecommendation;
    } else if (params.credit_score >= approve_threshold) {
      recommendation = AiAgentAnalysisRecommendation.AUTO_APPROVE;
    } else if (params.credit_score >= review_threshold) {
      recommendation = AiAgentAnalysisRecommendation.HITL;
    } else {
      recommendation = AiAgentAnalysisRecommendation.AUTO_REJECT;
    }

    this.logger.log(
      `[StubAiAgent][app=${params.credit_application_external_id}][score=${params.credit_score}][rec=${recommendation}]`,
    );

    return {
      recommendation,
      html_url_agent_analysis: null,
      json_agent_analysis: {
        stub: true,
        credit_score: params.credit_score,
        recommendation,
      },
      agent_recommended_loc: null,
    };
  }
}
