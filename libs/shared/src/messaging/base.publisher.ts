import { SendMessageCommand, type SQSClient, type SendMessageCommandInput } from '@aws-sdk/client-sqs';
import { SqsPublishFailedError } from './sqs-publish-failed.error';

/**
 * Envío genérico a SQS: serialización del comando AWS, errores y extensión por adaptadores de módulo.
 */
export abstract class BaseSqsPublisher {
  constructor(protected readonly sqs_client: SQSClient) {}

  /**
   * Punto de extensión para FIFO (`MessageGroupId`, deduplicación, etc.) antes de enviar.
   */
  protected enrich_send_input(input: SendMessageCommandInput): SendMessageCommandInput {
    return input;
  }

  protected async send_message(input: SendMessageCommandInput): Promise<void> {
    const to_send = this.enrich_send_input(input);
    try {
      await this.sqs_client.send(new SendMessageCommand(to_send));
    } catch (cause: unknown) {
      const text = cause instanceof Error ? cause.message : String(cause);
      throw new SqsPublishFailedError(`Fallo SendMessage en SQS: ${text}`, cause);
    }
  }
}

export { BaseSqsPublisher as BasePublisher };
