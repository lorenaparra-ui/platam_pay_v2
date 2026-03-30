import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  type Message,
  type SQSClient,
} from '@aws-sdk/client-sqs';
import type { SqsReceivedMessage } from './sqs-message.interface';

const sleep_ms = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export type SqsPollSettings = Readonly<{
  wait_time_seconds: number;
  max_number_of_messages: number;
  visibility_timeout_seconds: number;
}>;

export type MinimalLogger = Readonly<{
  log(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}>;

const INITIAL_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 30_000;

/**
 * Bucle de long-polling, borrado tras éxito, backoff exponencial ante fallos de red/API
 * y sin eliminar el mensaje si el dominio/aplicación indica reintento.
 */
export abstract class BaseSqsConsumer {
  private stopped = false;
  private poll_promise: Promise<void> | undefined;

  constructor(
    protected readonly sqs_client: SQSClient,
    protected readonly logger: MinimalLogger,
  ) {}

  /**
   * Inicia el worker (p. ej. desde `OnModuleInit` de Nest).
   */
  start(): void {
    if (this.poll_promise) {
      return;
    }
    const queue_url = this.resolve_queue_url();
    if (!queue_url) {
      this.logger.warn(this.inactive_reason_message());
      return;
    }
    this.logger.log(this.active_log_message(queue_url));
    this.poll_promise = this.poll_loop(queue_url);
  }

  /**
   * Detiene el bucle lo antes posible (p. ej. desde `OnModuleDestroy`).
   */
  stop(): void {
    this.stopped = true;
  }

  protected abstract resolve_queue_url(): string | undefined;

  protected abstract get_poll_settings(): SqsPollSettings;

  /**
   * Procesa el cuerpo recibido. `true` elimina el mensaje de la cola; `false` lo deja
   * para reintento tras expirar el timeout de visibilidad.
   */
  protected abstract handle(message: SqsReceivedMessage): Promise<boolean>;

  protected inactive_reason_message(): string {
    return 'Cola SQS de entrada no configurada; worker inactivo.';
  }

  protected active_log_message(queue_url: string): string {
    return `Worker SQS escuchando: ${queue_url}`;
  }

  private async poll_loop(queue_url: string): Promise<void> {
    let backoff_ms = INITIAL_BACKOFF_MS;

    while (!this.stopped) {
      try {
        const { wait_time_seconds, max_number_of_messages, visibility_timeout_seconds } =
          this.get_poll_settings();

        const response = await this.sqs_client.send(
          new ReceiveMessageCommand({
            QueueUrl: queue_url,
            MaxNumberOfMessages: max_number_of_messages,
            WaitTimeSeconds: wait_time_seconds,
            VisibilityTimeout: visibility_timeout_seconds,
            MessageAttributeNames: ['All'],
            AttributeNames: ['All'],
          }),
        );

        backoff_ms = INITIAL_BACKOFF_MS;

        const messages = response.Messages ?? [];
        for (const raw of messages) {
          await this.process_one(queue_url, raw);
        }
      } catch (err: unknown) {
        const text = err instanceof Error ? err.message : String(err);
        this.logger.error(`Error en ciclo ReceiveMessage: ${text}`);
        await sleep_ms(backoff_ms);
        backoff_ms = Math.min(backoff_ms * 2, MAX_BACKOFF_MS);
      }
    }
  }

  private async process_one(queue_url: string, raw: Message): Promise<void> {
    if (!raw.Body || !raw.ReceiptHandle) {
      return;
    }

    const message: SqsReceivedMessage = {
      body: raw.Body,
      receipt_handle: raw.ReceiptHandle,
      message_id: raw.MessageId,
    };

    let should_delete = false;
    try {
      should_delete = await this.handle(message);
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : String(err);
      this.logger.error(`Error no controlado al procesar mensaje: ${text}`);
      should_delete = false;
    }

    if (should_delete) {
      await this.sqs_client.send(
        new DeleteMessageCommand({
          QueueUrl: queue_url,
          ReceiptHandle: message.receipt_handle,
        }),
      );
    }
  }
}

export { BaseSqsConsumer as BaseConsumer };
