import type { RemoteFileFetchPort } from '@modules/transversal/domain/ports/storage/remote-file-fetch.port';
import { UploadFilesValidationError } from '../exceptions/upload-files.validation.error';

const MAX_DECODED_BYTES = 12 * 1024 * 1024;

const DATA_URL_REGEX = /^data:([\w/+.-]+);base64,(.+)$/i;

export type DecodedFileInput = Readonly<{
  buffer: Buffer;
  content_type: string;
}>;

export async function decode_file_input(
  raw: string,
  remote_fetch: RemoteFileFetchPort,
): Promise<DecodedFileInput> {
  const trimmed = raw.trim();
  if (trimmed.length === 0) {
    throw new UploadFilesValidationError('archivo vacío', 'FILE_EMPTY');
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const { buffer, content_type } = await remote_fetch.fetch_as_buffer(trimmed);
      assert_max_size(buffer);
      return {
        buffer,
        content_type: content_type ?? 'application/octet-stream',
      };
    } catch {
      throw new UploadFilesValidationError('no se pudo obtener archivo remoto', 'FILE_FETCH_FAILED');
    }
  }

  const data_match = DATA_URL_REGEX.exec(trimmed);
  if (data_match) {
    const content_type = data_match[1].toLowerCase();
    const b64 = data_match[2].replace(/\s/g, '');
    const buffer = Buffer.from(b64, 'base64');
    if (buffer.length === 0) {
      throw new UploadFilesValidationError('base64 inválido', 'FILE_INVALID_BASE64');
    }
    assert_max_size(buffer);
    return { buffer, content_type };
  }

  const normalized_b64 = trimmed.replace(/\s/g, '');
  const buffer = Buffer.from(normalized_b64, 'base64');
  if (buffer.length === 0 || !is_likely_base64(normalized_b64)) {
    throw new UploadFilesValidationError('formato de archivo no soportado', 'FILE_UNSUPPORTED_FORMAT');
  }
  assert_max_size(buffer);
  return { buffer, content_type: 'application/octet-stream' };
}

function assert_max_size(buffer: Buffer): void {
  if (buffer.length > MAX_DECODED_BYTES) {
    throw new UploadFilesValidationError('archivo excede tamaño máximo permitido', 'FILE_TOO_LARGE');
  }
}

function is_likely_base64(s: string): boolean {
  if (s.length < 16) {
    return false;
  }
  return /^[A-Za-z0-9+/]+=*$/.test(s);
}

export function extension_for_content_type(content_type: string): string {
  const base = content_type.split(';')[0]?.trim().toLowerCase() ?? '';
  const map: Readonly<Record<string, string>> = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'application/pdf': '.pdf',
  };
  return map[base] ?? '.bin';
}
