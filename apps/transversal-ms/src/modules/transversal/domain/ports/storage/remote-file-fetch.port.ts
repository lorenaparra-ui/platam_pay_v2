/**
 * Obtiene bytes remotos cuando el productor envía una URL en lugar de base64.
 */
export interface RemoteFileFetchPort {
  fetch_as_buffer(url: string): Promise<Readonly<{ buffer: Buffer; content_type?: string }>>;
}
