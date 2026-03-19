import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter } from "node:events";
import type {
  DomainEventEnvelope,
  EventBusPort,
} from "@common/ports/event-bus.port";

const MAX_LISTENERS = 50;

@Injectable()
export class EventEmitterEventBusAdapter implements EventBusPort {
  private readonly logger = new Logger(EventEmitterEventBusAdapter.name);
  private readonly emitter = new EventEmitter();

  constructor() {
    this.emitter.setMaxListeners(MAX_LISTENERS);
  }

  publish<T>(event: DomainEventEnvelope<T>): void {
    this.logger.debug(
      `Publishing event: ${event.name} correlation_id=${event.correlation_id ?? "n/a"}`,
    );
    this.emitter.emit(event.name, event);
  }

  subscribe(
    eventName: string,
    handler: (event: DomainEventEnvelope) => void | Promise<void>,
  ): () => void {
    const wrapped = async (event: DomainEventEnvelope) => {
      try {
        await handler(event);
      } catch (err) {
        this.logger.error(
          `Handler error for ${eventName}: ${err instanceof Error ? err.message : String(err)}`,
        );
        throw err;
      }
    };
    this.emitter.on(eventName, wrapped);
    return () => this.emitter.off(eventName, wrapped);
  }

  waitFor<T>(
    eventName: string,
    correlationId: string,
    options?: { timeoutMs?: number },
  ): Promise<DomainEventEnvelope<T>> {
    const timeoutMs = options?.timeoutMs ?? 60_000;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.emitter.off(eventName, listener);
        reject(new Error(`Timeout waiting for ${eventName} correlation_id=${correlationId}`));
      }, timeoutMs);

      const listener = (event: DomainEventEnvelope<T>) => {
        if ((event as { payload?: { correlation_id?: string }; correlation_id?: string }).correlation_id === correlationId
            || (event as { payload?: { correlation_id?: string } }).payload?.correlation_id === correlationId) {
          clearTimeout(timeout);
          this.emitter.off(eventName, listener);
          resolve(event);
        }
      };
      this.emitter.on(eventName, listener);
    });
  }
}
