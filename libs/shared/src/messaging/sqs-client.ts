import { SQSClient, type SQSClientConfig } from '@aws-sdk/client-sqs';

export type CreateSqsClientOptions = Readonly<{
  region: string;
  endpoint?: string;
  credentials?: SQSClientConfig['credentials'];
  /**
   * Si es `false`, el SDK usa el endpoint regional del cliente para las operaciones
   * en lugar del host embebido en `QueueUrl` (evita confusiones con emuladores o URLs heredadas).
   */
  use_queue_url_as_endpoint?: boolean;
}>;

/**
 * Fábrica del cliente SQS (un único `SQSClient` por proceso vía proveedor Nest `useFactory`).
 */
export function create_sqs_client(options: CreateSqsClientOptions): SQSClient {
  const config: SQSClientConfig = {
    region: options.region,
    ...(options.endpoint ? { endpoint: options.endpoint } : {}),
    ...(options.credentials ? { credentials: options.credentials } : {}),
  };
  return new SQSClient(config);
}
