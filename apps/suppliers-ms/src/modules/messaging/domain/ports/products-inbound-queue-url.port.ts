export const PRODUCTS_INBOUND_QUEUE_URL_PORT = Symbol('PRODUCTS_INBOUND_QUEUE_URL_PORT');

export interface ProductsInboundQueueUrlPort {
  get_products_inbound_queue_url(): string | undefined;
}
