/**
 * Puerto de almacenamiento (hexagonal). Sin AWS SDK en dominio/aplicación.
 */
export interface StoragePort {
  upload(params: {
    bucket: string;
    file: Buffer;
    path: string;
    content_type?: string;
  }): Promise<string>;
}
