import { Injectable, Logger } from '@nestjs/common';
import type {
  BdmeQueryParams,
  BdmeQueryResult,
  WebScrapingServicePort,
  RamaJudicialQueryParams,
  RamaJudicialQueryResult,
} from '@modules/credit-applications/domain/ports/web-scraping-service.port';
import { CognitoAuthAdapter } from '../cognito/cognito-auth.adapter';

type JobCreateResponse = { success: boolean; job_id: string; status: string };
type JobPollResponse = { success: boolean; job_id: string; status: string; output?: Record<string, unknown> };

const DOC_TYPE_MAP: Record<string, string> = {
  citizenship: 'CC',
  passport: 'PA',
  other: 'CC',
};

@Injectable()
export class HttpWebScrapingServiceAdapter implements WebScrapingServicePort {
  private readonly logger = new Logger(HttpWebScrapingServiceAdapter.name);

  constructor(private readonly cognito: CognitoAuthAdapter) {}

  async query_bdme(params: BdmeQueryParams): Promise<BdmeQueryResult> {
    const base_url = this.get_base_url();
    const token = await this.cognito.get_token();
    const doc_type = DOC_TYPE_MAP[params.doc_type] ?? 'CC';

    const create_res = await fetch(`${base_url}/v1/bdme/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        numero_id: params.doc_number,
        tipo: doc_type,
        motivo: 'contractual',
        descargar_pdf: false,
      }),
    });

    if (!create_res.ok) {
      throw new Error(`[BDME] POST /jobs falló: ${create_res.status}`);
    }

    const { job_id } = (await create_res.json()) as JobCreateResponse;
    this.logger.log(`[BDME][job_id=${job_id}] job creado`);

    const output = await this.poll('bdme', job_id);
    return { query_result: output };
  }

  async query_rama_judicial(params: RamaJudicialQueryParams): Promise<RamaJudicialQueryResult> {
    const base_url = this.get_base_url();
    const token = await this.cognito.get_token();

    const create_res = await fetch(`${base_url}/v1/rama-judicial/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tipo_persona: 'natural',
        nombres: params.first_name,
        apellido1: params.apellido1,
        apellido2: params.apellido2,
        numero_documento: params.doc_number,
        solo_recientes: true,
        max_paginas: 2,
        pausa_entre_paginas: 0.2,
      }),
    });

    if (!create_res.ok) {
      throw new Error(`[RAMA_JUDICIAL] POST /jobs falló: ${create_res.status}`);
    }

    const { job_id } = (await create_res.json()) as JobCreateResponse;
    this.logger.log(`[RAMA_JUDICIAL][job_id=${job_id}] job creado`);

    const output = await this.poll('rama-judicial', job_id);
    return { query_result: output };
  }

  private async poll(service: string, job_id: string): Promise<Record<string, unknown>> {
    const base_url = this.get_base_url();
    const interval_ms = parseInt(process.env.SCRAPING_POLL_INTERVAL_MS ?? '5000', 10);
    const max_retries = parseInt(process.env.SCRAPING_POLL_MAX_RETRIES ?? '20', 10);

    for (let attempt = 1; attempt <= max_retries; attempt++) {
      await new Promise((r) => setTimeout(r, interval_ms));

      const token = await this.cognito.get_token();
      const res = await fetch(`${base_url}/v1/${service}/jobs/${job_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`[${service.toUpperCase()}] GET /jobs/${job_id} falló: ${res.status}`);
      }

      const body = (await res.json()) as JobPollResponse;

      if (body.status === 'done' && body.output) {
        return body.output;
      }

      if (body.status === 'failed') {
        throw new Error(`[${service.toUpperCase()}] job ${job_id} terminó en failed`);
      }

      this.logger.log(`[${service.toUpperCase()}][job_id=${job_id}][attempt=${attempt}] status=${body.status}`);
    }

    throw new Error(`[${service.toUpperCase()}] job ${job_id} timeout tras ${max_retries} intentos`);
  }

  private get_base_url(): string {
    const url = process.env.SCRAPING_API_BASE_URL;
    if (!url) throw new Error('SCRAPING_API_BASE_URL no configurado');
    return url;
  }
}
