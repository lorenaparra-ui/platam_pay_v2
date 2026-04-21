import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import twilio from 'twilio';
import { AuthorizeCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/authorize-credit-application/authorize-credit-application.use-case';
import { AuthorizeCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/authorize-credit-application/authorize-credit-application.request';

@ApiTags('webhooks')
@Controller('webhooks/twilio')
export class TwilioWebhookController {
  private readonly logger = new Logger(TwilioWebhookController.name);

  constructor(
    private readonly authorize: AuthorizeCreditApplicationUseCase,
  ) {}

  /**
   * Recibe el webhook de Twilio cuando el cliente pulsa "Autorizar Consulta" en WhatsApp.
   * El external_id de la solicitud viaja en ButtonPayload (variable {{4}} de la plantilla Content API).
   */
  @Post('whatsapp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Webhook Twilio — botón "Autorizar Consulta" (WhatsApp)',
    description:
      'Valida la firma X-Twilio-Signature y ejecuta la autorización de la solicitud identificada por ButtonPayload.',
  })
  async handle(
    @Req() req: Request,
    @Headers('x-twilio-signature') signature: string | undefined,
    @Body() body: Record<string, string>,
  ): Promise<string> {
    this.validate_signature(req, signature, body);

    const button_payload: string | undefined = body['ButtonPayload'];
    if (!button_payload || button_payload.trim().length === 0) {
      this.logger.warn('[TwilioWebhook][step=missing_button_payload]');
      return '<Response/>';
    }

    const external_id = button_payload.trim();
    this.logger.log(`[TwilioWebhook][step=received][externalId=${external_id}]`);

    const result = await this.authorize.execute(
      new AuthorizeCreditApplicationRequest(external_id),
    );

    this.logger.log(
      `[TwilioWebhook][step=completed][externalId=${external_id}][result=${result.result}]`,
    );

    return '<Response/>';
  }

  private validate_signature(
    req: Request,
    signature: string | undefined,
    body: Record<string, string>,
  ): void {
    const auth_token = process.env.TWILIO_AUTH_TOKEN;
    if (!auth_token) {
      throw new BadRequestException('Twilio auth token no configurado');
    }

    if (!signature) {
      throw new UnauthorizedException('Falta cabecera X-Twilio-Signature');
    }

    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const is_valid = twilio.validateRequest(auth_token, signature, url, body);

    if (!is_valid) {
      this.logger.warn(`[TwilioWebhook][step=invalid_signature][url=${url}]`);
      throw new UnauthorizedException('Firma Twilio inválida');
    }
  }
}
