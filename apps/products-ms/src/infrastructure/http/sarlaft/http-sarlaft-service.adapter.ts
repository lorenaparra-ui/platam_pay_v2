import { Injectable, Logger } from '@nestjs/common';
import { SarlaftCheckStatuses } from '@platam/shared';
import type {
  SarlaftCheckParams,
  SarlaftCheckResult,
  SarlaftServicePort,
} from '@modules/credit-applications/domain/ports/sarlaft-service.port';
import { CognitoAuthAdapter } from '../cognito/cognito-auth.adapter';

type SarlaftJobResponse = {
  success: boolean;
  job_id: string;
  status: string;
};

type SarlaftJobResult = {
  success: boolean;
  job_id: string;
  status: string;
  output?: {
    riesgo_global: string;
    requiere_verificacion_manual: boolean;
    alertas: string[];
    listas_consultadas: Record<string, {
      vinculante: boolean;
      encontrado: boolean;
      nivel_riesgo: string;
      detalles: unknown[];
      total_matches?: number;
    }>;
  };
};

const DOC_TYPE_MAP: Record<string, string> = {
  citizenship: 'CC',
  passport: 'PA',
  other: 'CC',
};

@Injectable()
export class HttpSarlaftServiceAdapter implements SarlaftServicePort {
  private readonly logger = new Logger(HttpSarlaftServiceAdapter.name);

  constructor(private readonly cognito: CognitoAuthAdapter) {}

  async check(params: SarlaftCheckParams): Promise<SarlaftCheckResult> {
    const base_url = process.env.SCRAPING_API_BASE_URL;
    const poll_interval = parseInt(process.env.SCRAPING_POLL_INTERVAL_MS ?? '5000', 10);
    const max_retries = parseInt(process.env.SCRAPING_POLL_MAX_RETRIES ?? '20', 10);

    if (!base_url) throw new Error('SCRAPING_API_BASE_URL no configurado');

    const token = await this.cognito.get_token();
    const doc_type = DOC_TYPE_MAP[params.doc_type] ?? 'CC';

    const create_res = await fetch(`${base_url}/v1/sarlaft/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombres: params.first_name,
        documento: params.doc_number,
        tipo_documento: doc_type,
        force_refresh: params.force_refresh ?? false,
      }),
    });

    if (!create_res.ok) {
      throw new Error(`[SARLAFT] POST /jobs falló: ${create_res.status}`);
    }

    const { job_id } = (await create_res.json()) as SarlaftJobResponse;
    this.logger.log(`[SARLAFT][job_id=${job_id}] job creado`);

    return this.poll(base_url, token, job_id, poll_interval, max_retries);
  }

  private async poll(
    base_url: string,
    token: string,
    job_id: string,
    interval_ms: number,
    max_retries: number,
  ): Promise<SarlaftCheckResult> {
    for (let attempt = 1; attempt <= max_retries; attempt++) {
      await new Promise((r) => setTimeout(r, interval_ms));

      const token_now = await this.cognito.get_token();
      const res = await fetch(`${base_url}/v1/sarlaft/jobs/${job_id}`, {
        headers: { Authorization: `Bearer ${token_now}` },
      });

      if (!res.ok) {
        throw new Error(`[SARLAFT] GET /jobs/${job_id} falló: ${res.status}`);
      }

      const body = (await res.json()) as SarlaftJobResult;

      if (body.status === 'done' && body.output) {
        return this.map_result(body.output);
      }

      if (body.status === 'failed') {
        throw new Error(`[SARLAFT] job ${job_id} terminó en failed`);
      }

      this.logger.log(`[SARLAFT][job_id=${job_id}][attempt=${attempt}] status=${body.status}`);
    }

    throw new Error(`[SARLAFT] job ${job_id} timeout tras ${max_retries} intentos`);
  }

  private map_result(output: NonNullable<SarlaftJobResult['output']>): SarlaftCheckResult {
    const listas = output.listas_consultadas;
    const has_match = Object.values(listas).some((l) => l.encontrado);
    const is_blocked = Object.values(listas).some((l) => l.vinculante && l.encontrado);

    let status: SarlaftCheckStatuses;
    if (is_blocked) {
      status = SarlaftCheckStatuses.BLOCKED;
    } else if (output.requiere_verificacion_manual) {
      status = SarlaftCheckStatuses.ALERT;
    } else {
      status = SarlaftCheckStatuses.CLEAN;
    }

    const detail =
      output.alertas.length > 0 ? output.alertas.join('; ') : null;

    return {
      has_match,
      status,
      sources: listas as unknown as Record<string, unknown>,
      detail,
    };
  }
}
