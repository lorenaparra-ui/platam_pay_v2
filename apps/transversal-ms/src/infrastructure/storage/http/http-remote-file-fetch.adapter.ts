import { Injectable, Logger } from '@nestjs/common';
import type { RemoteFileFetchPort } from '@modules/transversal/domain/ports/storage/remote-file-fetch.port';

const MAX_BYTES = 15 * 1024 * 1024;

@Injectable()
export class HttpRemoteFileFetchAdapter implements RemoteFileFetchPort {
  private readonly logger = new Logger(HttpRemoteFileFetchAdapter.name);

  async fetch_as_buffer(url: string): Promise<Readonly<{ buffer: Buffer; content_type?: string }>> {
    const parsed = this.parse_http_url(url);
    if (!parsed) {
      throw new Error('REMOTE_FETCH_INVALID_URL');
    }

    const response = await fetch(parsed.toString(), {
      redirect: 'follow',
      signal: AbortSignal.timeout(60_000),
    });

    if (!response.ok) {
      this.logger.warn(`remote_fetch_failed status=${String(response.status)}`);
      throw new Error('REMOTE_FETCH_FAILED');
    }

    const length_header = response.headers.get('content-length');
    if (length_header) {
      const n = Number(length_header);
      if (Number.isFinite(n) && n > MAX_BYTES) {
        throw new Error('REMOTE_FETCH_TOO_LARGE');
      }
    }

    const array_buffer = await response.arrayBuffer();
    if (array_buffer.byteLength > MAX_BYTES) {
      throw new Error('REMOTE_FETCH_TOO_LARGE');
    }

    const buffer = Buffer.from(array_buffer);
    const content_type = response.headers.get('content-type') ?? undefined;

    return { buffer, content_type: content_type?.split(';')[0]?.trim() };
  }

  private parse_http_url(url: string): URL | null {
    try {
      const u = new URL(url);
      if (u.protocol !== 'http:' && u.protocol !== 'https:') {
        return null;
      }
      return u;
    } catch {
      return null;
    }
  }
}
