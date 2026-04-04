import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProcessZapSignWebhookUseCase } from '../application/use-cases/process-zapsign-webhook/process-zapsign-webhook.use-case';

@ApiTags('webhooks')
@Controller('webhooks')
export class ZapSignWebhookController {
  constructor(private readonly process_webhook: ProcessZapSignWebhookUseCase) {}

  @Post('zapsign')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Webhook ZapSign',
    description:
      'Recibe el payload de firma completada. Actualiza `signed_file_url` y anexa metadatos bajo `form_answers_json.zapsign_webhook`. ' +
      'Si `ZAPSIGN_WEBHOOK_SECRET` está definido en el servidor, debe enviarse el mismo valor en el header `X-Zapsign-Webhook-Secret`.',
  })
  @ApiHeader({
    name: 'X-Zapsign-Webhook-Secret',
    required: false,
    description: 'Obligatorio cuando el servidor tiene ZAPSIGN_WEBHOOK_SECRET configurado.',
  })
  @ApiBody({ schema: { type: 'object', additionalProperties: true } })
  async handle_zapsign(
    @Body() body: unknown,
    @Headers('x-zapsign-webhook-secret') webhook_secret?: string,
  ): Promise<void> {
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      throw new BadRequestException('body inválido');
    }
    await this.process_webhook.execute(body as Record<string, unknown>, webhook_secret);
  }
}
