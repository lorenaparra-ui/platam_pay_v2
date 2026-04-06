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
  /** Cola alta usuario+persona partner (transversal-ms). */
  create_partner_user_queue_url?: string;
  /** Cola alta usuario+persona (mismo contrato create-partner-user) p. ej. representante legal. */
  create_person_queue_url?: string;
  /**
   * Cola donde suppliers-ms (u otros) reciben callbacks como files-uploaded.
   * Opcional; si no se define, se usa inbound_queue_url y luego outbound.
   */
  suppliers_callback_queue_url?: string;
  /**
   * contracts-ms: cola dedicada a comandos create-contract (cuerpo JSON validado en el consumer).
   */
  contracts_create_inbound_queue_url?: string;
  /**
   * contracts-ms: cola dedicada a comandos get-contract (por external_id).
   */
  contracts_get_inbound_queue_url?: string;
  /**
   * notifications-ms: cola de jobs de notificación (email / SMS / WhatsApp).
   */
  notifications_inbound_queue_url?: string;
}>;
