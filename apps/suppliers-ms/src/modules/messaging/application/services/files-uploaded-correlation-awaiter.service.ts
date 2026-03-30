import { Injectable } from '@nestjs/common';

export type FilesUploadedUrls = Readonly<{
  bank_certification_url?: string;
  logo_url?: string;
  co_branding_url?: string;
}>;

type Pending = Readonly<{
  resolve: (v: FilesUploadedUrls) => void;
  reject: (e: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}>;

/**
 * Enlaza correlación HTTP/saga ↔ respuesta asíncrona files-uploaded (misma instancia).
 * En múltiples réplicas hace falta un store compartido (p. ej. Redis).
 */
@Injectable()
export class FilesUploadedCorrelationAwaiter {
  private readonly pending = new Map<string, Pending>();
  private readonly early = new Map<string, FilesUploadedUrls>();

  wait(correlation_id: string, timeout_ms: number): Promise<FilesUploadedUrls> {
    const early = this.early.get(correlation_id);
    if (early !== undefined) {
      this.early.delete(correlation_id);
      return Promise.resolve(early);
    }

    return new Promise<FilesUploadedUrls>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(correlation_id);
        reject(new Error('PARTNER_FILES_UPLOAD_TIMEOUT'));
      }, timeout_ms);

      this.pending.set(correlation_id, { resolve, reject, timer });
    });
  }

  complete(correlation_id: string, urls: FilesUploadedUrls): void {
    const p = this.pending.get(correlation_id);
    if (p !== undefined) {
      clearTimeout(p.timer);
      this.pending.delete(correlation_id);
      p.resolve(urls);
      return;
    }
    this.early.set(correlation_id, urls);
  }
}
