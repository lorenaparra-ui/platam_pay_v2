/**
 * Puerto de dominio para almacenamiento de archivos.
 * La lógica de negocio depende de esta interfaz, no de implementaciones concretas (ej. AWS S3).
 */

export const FILE_STORAGE_PORT = 'FILE_STORAGE_PORT';

export interface UploadFilePayload {
  /** Clave/ ruta del objeto en el almacenamiento (ej. "documents/user-123/file.pdf") */
  key: string;
  /** Contenido del archivo */
  body: Buffer | Uint8Array;
  /** Tipo MIME (ej. "application/pdf") */
  content_type?: string;
  /** Metadatos opcionales */
  metadata?: Record<string, string>;
}

export interface UploadFileResult {
  key: string;
  /** Identificador del recurso (ej. URI o key) */
  location: string;
}

export interface GetSignedUrlOptions {
  /** Clave del objeto */
  key: string;
  /** Tiempo de expiración en segundos */
  expires_in_seconds: number;
  /** Verbo HTTP para la URL firmada (por defecto GET) */
  method?: 'GET' | 'PUT';
}

export interface FileStoragePort {
  /**
   * Sube un archivo al almacenamiento.
   */
  upload(payload: UploadFilePayload): Promise<UploadFileResult>;

  /**
   * Descarga el contenido de un archivo por su clave.
   */
  download(key: string): Promise<Buffer>;

  /**
   * Elimina un archivo por su clave.
   */
  delete(key: string): Promise<void>;

  /**
   * Genera una URL firmada para acceso temporal (lectura o escritura).
   */
  getSignedUrl(options: GetSignedUrlOptions): Promise<string>;
}
