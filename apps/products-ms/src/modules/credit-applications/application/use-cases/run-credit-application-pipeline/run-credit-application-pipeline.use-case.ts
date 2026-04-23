import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreditApplicationStatus, ExperianQueryStatus, ExperianQueryTypes, SarlaftCheckStatuses, WebQueryType } from '@platam/shared';
import {
  CREDIT_APPLICATION_REPOSITORY,
  SARLAFT_CHECK_REPOSITORY,
  WEB_QUERY_REPOSITORY,
  EXPERIAN_QUERY_REPOSITORY,
  AI_AGENT_ANALYSIS_REPOSITORY,
  SARLAFT_SERVICE,
  WEB_SCRAPING_SERVICE,
  EXPERIAN_SERVICE,
  AI_AGENT_SERVICE,
  GOOGLE_CHAT_NOTIFIER,
} from '@modules/credit-applications/credit-applications.tokens';
import type { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import type { SarlaftCheckRepository } from '@modules/credit-applications/domain/ports/sarlaft-check.repository.port';
import type { WebQueryRepository } from '@modules/credit-applications/domain/ports/web-query.repository.port';
import type { ExperianQueryRepository } from '@modules/credit-applications/domain/ports/experian-query.repository.port';
import type { AiAgentAnalysisRepository } from '@modules/credit-applications/domain/ports/ai-agent-analysis.repository.port';
import type { SarlaftServicePort } from '@modules/credit-applications/domain/ports/sarlaft-service.port';
import type { WebScrapingServicePort } from '@modules/credit-applications/domain/ports/web-scraping-service.port';
import type { ExperianServicePort } from '@modules/credit-applications/domain/ports/experian-service.port';
import type { AiAgentServicePort } from '@modules/credit-applications/domain/ports/ai-agent-service.port';
import type { GoogleChatNotifierPort } from '@modules/credit-applications/domain/ports/google-chat-notifier.port';
import {
  CLIENT_REGISTRATION_PORT,
  type ClientRegistrationPort,
} from '@modules/credit-applications/application/ports/client-registration.port';
import type { RunCreditApplicationPipelineCommand } from './run-credit-application-pipeline.command';

@Injectable()
export class RunCreditApplicationPipelineUseCase {
  private readonly logger = new Logger(RunCreditApplicationPipelineUseCase.name);

  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_app_repo: CreditApplicationRepository,
    @Inject(CLIENT_REGISTRATION_PORT)
    private readonly client_registration: ClientRegistrationPort,
    @Inject(SARLAFT_CHECK_REPOSITORY)
    private readonly sarlaft_repo: SarlaftCheckRepository,
    @Inject(WEB_QUERY_REPOSITORY)
    private readonly web_query_repo: WebQueryRepository,
    @Inject(EXPERIAN_QUERY_REPOSITORY)
    private readonly experian_repo: ExperianQueryRepository,
    @Inject(AI_AGENT_ANALYSIS_REPOSITORY)
    private readonly ai_analysis_repo: AiAgentAnalysisRepository,
    @Inject(SARLAFT_SERVICE)
    private readonly sarlaft_service: SarlaftServicePort,
    @Inject(WEB_SCRAPING_SERVICE)
    private readonly web_scraping: WebScrapingServicePort,
    @Inject(EXPERIAN_SERVICE)
    private readonly experian_service: ExperianServicePort,
    @Inject(AI_AGENT_SERVICE)
    private readonly ai_agent: AiAgentServicePort,
    @Inject(GOOGLE_CHAT_NOTIFIER)
    private readonly chat: GoogleChatNotifierPort,
  ) {}

  async execute(command: RunCreditApplicationPipelineCommand): Promise<void> {
    const ext_id = command.creditApplicationExternalId;
    this.logger.log(`[Pipeline][ext_id=${ext_id}][step=start]`);

    const application = await this.credit_app_repo.find_by_external_id(ext_id);
    if (!application) {
      this.logger.error(`[Pipeline][ext_id=${ext_id}] solicitud no encontrada — pipeline abortado`);
      return;
    }

    if (application.person_id === null) {
      this.logger.error(`[Pipeline][ext_id=${ext_id}] person_id nulo — pipeline abortado`);
      return;
    }

    const person = await this.client_registration.get_person_for_pipeline(application.person_id);
    if (!person) {
      this.logger.error(`[Pipeline][ext_id=${ext_id}] persona no encontrada — pipeline abortado`);
      return;
    }

    // ── Paso 1: Verificación de duplicados ────────────────────────────────────

    const duplicate = await this.credit_app_repo.find_active_by_person_identity(
      person.doc_number,
      person.phone,
      person.email,
    );

    if (duplicate && duplicate.internal_id !== application.internal_id) {
      this.logger.warn(`[Pipeline][ext_id=${ext_id}][step=duplicate][duplicateId=${duplicate.external_id}]`);
      await this.credit_app_repo.update_by_external_id(ext_id, { status: CreditApplicationStatus.DUPLICATE });
      return;
    }

    // ── Paso 2: SARLAFT ───────────────────────────────────────────────────────

    let sarlaft_blocked = false;
    try {
      const sarlaft_result = await this.sarlaft_service.check({
        doc_number: person.doc_number,
        doc_type: person.doc_type,
        first_name: person.first_name,
      });

      await this.sarlaft_repo.create({
        credit_application_id: application.internal_id,
        person_id: person.internal_id,
        business_id: application.business_id,
        has_match: sarlaft_result.has_match,
        status: sarlaft_result.status,
        consulted_at: new Date(),
        sources: sarlaft_result.sources,
        detail: sarlaft_result.detail,
      });

      this.logger.log(`[Pipeline][ext_id=${ext_id}][step=sarlaft][status=${sarlaft_result.status}]`);

      if (sarlaft_result.status === SarlaftCheckStatuses.BLOCKED) {
        sarlaft_blocked = true;
        await this.credit_app_repo.update_by_external_id(ext_id, {
          status: CreditApplicationStatus.SARLAFT_MATCH,
        });
        await this.chat.notify_compliance(
          `⛔ SARLAFT MATCH — solicitud ${ext_id} | persona ${person.doc_number} | estado: BLOQUEADO`,
        );
        return;
      }

      if (sarlaft_result.status === SarlaftCheckStatuses.ALERT) {
        await this.chat.notify_compliance(
          `⚠️ SARLAFT ALERTA — solicitud ${ext_id} | persona ${person.doc_number} | requiere revisión manual`,
        );
      }
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Pipeline][ext_id=${ext_id}][step=sarlaft_error] ${text}`);
      await this.chat.notify_technical(`❌ SARLAFT error — solicitud ${ext_id}: ${text}`);
      return;
    }

    if (sarlaft_blocked) return;

    // ── Paso 3: BDME ──────────────────────────────────────────────────────────

    try {
      const bdme_result = await this.web_scraping.query_bdme({
        doc_number: person.doc_number,
        doc_type: person.doc_type,
      });

      await this.web_query_repo.create({
        credit_application_id: application.internal_id,
        query_type: WebQueryType.BDME,
        person_id: person.internal_id,
        consulted_at: new Date(),
        query_result: bdme_result.query_result,
      });

      this.logger.log(`[Pipeline][ext_id=${ext_id}][step=bdme][ok]`);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Pipeline][ext_id=${ext_id}][step=bdme_error] ${text}`);
      await this.chat.notify_technical(`❌ BDME error — solicitud ${ext_id}: ${text}`);
      return;
    }

    // ── Paso 4: Rama Judicial ────────────────────────────────────────────────

    try {
      const last_name_parts = person.last_name.split(' ');
      const apellido1 = last_name_parts[0] ?? '';
      const apellido2 = last_name_parts[1] ?? '';

      const rj_result = await this.web_scraping.query_rama_judicial({
        first_name: person.first_name,
        apellido1,
        apellido2,
        doc_number: person.doc_number,
      });

      await this.web_query_repo.create({
        credit_application_id: application.internal_id,
        query_type: WebQueryType.RAMA_JUDICIAL,
        person_id: person.internal_id,
        consulted_at: new Date(),
        query_result: rj_result.query_result,
      });

      this.logger.log(`[Pipeline][ext_id=${ext_id}][step=rama_judicial][ok]`);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Pipeline][ext_id=${ext_id}][step=rama_judicial_error] ${text}`);
      await this.chat.notify_technical(`❌ Rama Judicial error — solicitud ${ext_id}: ${text}`);
      return;
    }

    // ── Paso 5: Experian HCPN ────────────────────────────────────────────────

    let credit_score = 0;
    let credit_report: Record<string, unknown> = {};

    try {
      const experian_result = await this.experian_service.query_hcpn({
        doc_number: person.doc_number,
        last_name: person.last_name,
      });

      credit_score = experian_result.credit_score;
      credit_report = experian_result.credit_report;

      await this.experian_repo.create({
        credit_application_id: application.internal_id,
        person_id: person.internal_id,
        business_id: application.business_id,
        query_type: ExperianQueryTypes.HCPN,
        credit_report: experian_result.credit_report,
        credit_score: String(experian_result.credit_score),
        consulted_at: new Date(),
        status: ExperianQueryStatus.COMPLETED,
        error_message: null,
      });

      this.logger.log(`[Pipeline][ext_id=${ext_id}][step=experian][score=${credit_score}]`);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Pipeline][ext_id=${ext_id}][step=experian_error] ${text}`);

      await this.experian_repo.create({
        credit_application_id: application.internal_id,
        person_id: person.internal_id,
        business_id: application.business_id,
        query_type: ExperianQueryTypes.HCPN,
        credit_report: null,
        credit_score: null,
        consulted_at: new Date(),
        status: ExperianQueryStatus.ERROR,
        error_message: text,
      });

      await this.credit_app_repo.update_by_external_id(ext_id, {
        status: CreditApplicationStatus.EXPERIAN_QUERY_ERROR,
      });
      await this.chat.notify_technical(`❌ Experian error — solicitud ${ext_id}: ${text}`);
      return;
    }

    // ── Paso 6: Agente AI ─────────────────────────────────────────────────────

    let ai_recommendation: string;

    try {
      const ai_result = await this.ai_agent.analyze({
        credit_application_external_id: ext_id,
        credit_score,
        credit_report,
      });

      ai_recommendation = ai_result.recommendation;

      await this.ai_analysis_repo.create({
        credit_application_id: application.internal_id,
        analysis_result: ai_result.json_agent_analysis,
        recommendation: ai_result.recommendation,
        confidence_score: null,
        analyzed_at: new Date(),
        html_url_agent_analysis: ai_result.html_url_agent_analysis,
        agent_recommended_loc: ai_result.agent_recommended_loc !== null
          ? String(ai_result.agent_recommended_loc)
          : null,
      });

      this.logger.log(`[Pipeline][ext_id=${ext_id}][step=ai_agent][recommendation=${ai_recommendation}]`);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`[Pipeline][ext_id=${ext_id}][step=ai_agent_error] ${text}`);
      await this.credit_app_repo.update_by_external_id(ext_id, {
        status: CreditApplicationStatus.AI_AGENT_ERROR,
      });
      await this.chat.notify_technical(`❌ Agente AI error — solicitud ${ext_id}: ${text}`);
      return;
    }

    // ── Paso 7: Despachar resultado ───────────────────────────────────────────

    await this.dispatch_result(ext_id, ai_recommendation, credit_score);
  }

  private async dispatch_result(
    ext_id: string,
    recommendation: string,
    credit_score: number,
  ): Promise<void> {
    switch (recommendation) {
      case 'auto_approve':
        await this.credit_app_repo.update_by_external_id(ext_id, {
          status: CreditApplicationStatus.APPROVED_PENDING_SIGNATURE,
          credit_score: String(credit_score),
          approval_date: new Date(),
        });
        this.logger.log(`[Pipeline][ext_id=${ext_id}][step=result][status=approved_pending_signature]`);
        break;

      case 'auto_reject':
        await this.credit_app_repo.update_by_external_id(ext_id, {
          status: CreditApplicationStatus.REJECTED,
          credit_score: String(credit_score),
          rejection_reason: 'auto_reject_ai_agent',
        });
        this.logger.log(`[Pipeline][ext_id=${ext_id}][step=result][status=rejected]`);
        break;

      case 'hitl':
        await this.credit_app_repo.update_by_external_id(ext_id, {
          status: CreditApplicationStatus.UNDER_REVIEW,
          credit_score: String(credit_score),
        });
        await this.chat.notify_analysts(
          `📋 HITL — solicitud ${ext_id} requiere revisión manual del analista (score: ${credit_score})`,
        );
        this.logger.log(`[Pipeline][ext_id=${ext_id}][step=result][status=under_review]`);
        break;

      case 'interview':
        await this.credit_app_repo.update_by_external_id(ext_id, {
          status: CreditApplicationStatus.IN_INTERVIEW,
          credit_score: String(credit_score),
        });
        this.logger.log(`[Pipeline][ext_id=${ext_id}][step=result][status=in_interview]`);
        break;

      default:
        this.logger.warn(`[Pipeline][ext_id=${ext_id}][step=result] recomendación desconocida: ${recommendation}`);
        break;
    }
  }
}
