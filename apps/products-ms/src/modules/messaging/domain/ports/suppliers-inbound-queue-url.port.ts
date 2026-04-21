export const SUPPLIERS_INBOUND_QUEUE_URL_PORT = Symbol('SUPPLIERS_INBOUND_QUEUE_URL_PORT');

export interface SuppliersInboundQueueUrlPort {
  get_suppliers_inbound_queue_url(): string | undefined;
}
