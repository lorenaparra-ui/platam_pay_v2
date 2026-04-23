import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { AiAgentAnalysisRecommendation } from '@platam/shared';
import {
  AiAgentAnalysis,
  type CreateAiAgentAnalysisProps,
} from '@modules/credit-applications/domain/models/ai-agent-analysis.models';
import type { AiAgentAnalysisRepository } from '@modules/credit-applications/domain/ports/ai-agent-analysis.repository.port';

type RawRow = {
  id: string;
  external_id: string;
  credit_application_id: string;
  analysis_result: Record<string, unknown>;
  recommendation: string;
  confidence_score: string | null;
  analyzed_at: Date;
  html_url_agent_analysis: string | null;
  agent_recommended_loc: string | null;
  created_at: Date;
  updated_at: Date;
};

function map_row(r: RawRow): AiAgentAnalysis {
  return new AiAgentAnalysis(
    Number(r.id),
    r.external_id,
    Number(r.credit_application_id),
    r.analysis_result,
    r.recommendation as AiAgentAnalysisRecommendation,
    r.confidence_score,
    r.analyzed_at,
    r.html_url_agent_analysis,
    r.agent_recommended_loc,
    r.created_at,
    r.updated_at,
  );
}

@Injectable()
export class TypeormAiAgentAnalysisRepository implements AiAgentAnalysisRepository {
  constructor(
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async create(props: CreateAiAgentAnalysisProps): Promise<AiAgentAnalysis> {
    const rows = await this.ds.query<RawRow[]>(
      `INSERT INTO products_schema.ai_agent_analysis
         (credit_application_id, analysis_result, recommendation, confidence_score, analyzed_at, html_url_agent_analysis, agent_recommended_loc)
       VALUES ($1, $2::jsonb, $3::products_schema.ai_agent_analysis_recommendation, $4, $5, $6, $7)
       RETURNING *`,
      [
        props.credit_application_id,
        JSON.stringify(props.analysis_result),
        props.recommendation,
        props.confidence_score,
        props.analyzed_at,
        props.html_url_agent_analysis,
        props.agent_recommended_loc,
      ],
    );
    return map_row(rows[0]);
  }

  async find_by_credit_application_id(
    credit_application_id: number,
  ): Promise<AiAgentAnalysis | null> {
    const rows = await this.ds.query<RawRow[]>(
      `SELECT * FROM products_schema.ai_agent_analysis
       WHERE credit_application_id = $1
       ORDER BY id DESC LIMIT 1`,
      [credit_application_id],
    );
    return rows[0] ? map_row(rows[0]) : null;
  }
}
