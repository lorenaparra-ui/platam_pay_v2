/** Token de inyección Nest para el cliente AWS SQS (singleton por aplicación). */
export const SQS_CLIENT = Symbol('SQS_CLIENT');

/**
 * URLs de colas SQS resueltas desde variables de entorno (inyectar por app con useFactory).
 */
export const QUEUES_CONFIG = Symbol('QUEUES_CONFIG');

export type SqsQueuesUrlsConfig = Readonly<{
  outbound_queue_url: string;
  inbound_queue_url?: string;
  /** Cola dedicada a eventos upload-files (transversal-ms). */
  upload_files_queue_url?: string;
}>;
