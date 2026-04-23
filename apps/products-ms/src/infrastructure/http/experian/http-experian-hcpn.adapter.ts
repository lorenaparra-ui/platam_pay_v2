import { Injectable, Logger } from '@nestjs/common';
import { SignatureV4 } from '@smithy/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import type {
  ExperianHcpnParams,
  ExperianHcpnResult,
  ExperianServicePort,
} from '@modules/credit-applications/domain/ports/experian-service.port';

type ExperianResponse = {
  message: string;
  result: {
    Informes: {
      Informe: {
        Score?: {
          '@puntaje': string;
        };
        [key: string]: unknown;
      };
    };
  };
  score_decision: string;
  url: string;
};

@Injectable()
export class HttpExperianHcpnAdapter implements ExperianServicePort {
  private readonly logger = new Logger(HttpExperianHcpnAdapter.name);

  async query_hcpn(params: ExperianHcpnParams): Promise<ExperianHcpnResult> {
    const endpoint_url = process.env.EXPERIAN_HCPN_URL;
    const region = process.env.EXPERIAN_AWS_REGION ?? 'us-east-1';

    if (!endpoint_url) throw new Error('EXPERIAN_HCPN_URL no configurado');

    const url = new URL(endpoint_url);
    const body = JSON.stringify({
      id: params.doc_number,
      last_name: params.last_name,
      platform: 'ppay',
    });

    const signer = new SignatureV4({
      credentials: defaultProvider(),
      region,
      service: 'execute-api',
      sha256: Sha256,
    });

    const signed = await signer.sign({
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname,
      protocol: url.protocol,
      headers: {
        host: url.hostname,
        'content-type': 'application/json',
        'content-length': String(Buffer.byteLength(body)),
      },
      body,
    });

    const response = await fetch(endpoint_url, {
      method: 'POST',
      headers: signed.headers as Record<string, string>,
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`[Experian HCPN] HTTP ${response.status}: ${text}`);
    }

    const data = (await response.json()) as ExperianResponse;
    this.logger.log('[Experian HCPN] respuesta recibida');

    const score_str = data.result?.Informes?.Informe?.Score?.['@puntaje'];
    const credit_score = score_str ? parseFloat(score_str) : 0;

    return {
      credit_report: data.result as unknown as Record<string, unknown>,
      credit_score,
    };
  }
}
