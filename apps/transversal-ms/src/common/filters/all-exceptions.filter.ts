import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const raw = exception.getResponse();
      const message = this.client_message(status, raw);

      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(
          `HTTP ${String(status)} ${request.method} ${this.safe_path(request)}`,
        );
      }

      response.status(status).json({
        status_code: status,
        message,
      });
      return;
    }

    this.logger.error(
      `Unhandled ${request.method} ${this.safe_path(request)} (${exception instanceof Error ? exception.name : 'unknown'})`,
    );
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status_code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Error interno del servidor',
    });
  }

  private safe_path(request: Request): string {
    return (request.originalUrl ?? request.url ?? '').split('?')[0];
  }

  private client_message(status: number, raw: string | object): string {
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      return 'Error interno del servidor';
    }
    if (status === HttpStatus.TOO_MANY_REQUESTS) {
      return 'Demasiadas solicitudes';
    }
    if (typeof raw === 'string') {
      return raw;
    }
    const body = raw as { message?: string | string[] };
    if (Array.isArray(body.message)) {
      return body.message[0] ?? 'Error';
    }
    if (typeof body.message === 'string') {
      return body.message;
    }
    return 'Error';
  }
}
