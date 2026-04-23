/**
 * Puerto de aplicación: URL de la cola outbound transversal (sin Nest ni variables de entorno).
 */
export const TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT = Symbol('TRANSVERSAL_OUTBOUND_QUEUE_URL_PORT');

export interface TransversalOutboundQueueUrlPort {
  get_outbound_queue_url(): string;
}
