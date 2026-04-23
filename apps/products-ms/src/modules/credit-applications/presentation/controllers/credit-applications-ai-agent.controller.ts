import { Body, Controller, HttpCode, HttpStatus, Logger, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiAcceptedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AiAgentResultDto, AiAgentResultResponseDto } from '../dto/ai-agent-result.dto';

/**
 * Callback receptor del resultado del Agente AI.
 *
 * Sin JWT — la seguridad M2M (shared secret / API Key) se define cuando FastAPI
 * tenga contrato estable. Por ahora el endpoint acepta el payload, lo loguea
 * y devuelve 202. El dispatch del resultado (aprobar / rechazar / review) se
 * conectará aquí cuando se retire StubAiAgentAdapter.
 *
 * Referencia: HU-06 — Plan Alterno (sesión 6 placeholder).
 */
@ApiTags('credit-applications')
@Controller('credit-applications')
export class CreditApplicationsAiAgentController {
  private readonly logger = new Logger(CreditApplicationsAiAgentController.name);

  @Post(':externalId/ai-result')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Callback del Agente AI — resultado del estudio automatizado (M2M, sin JWT)',
    description:
      'Endpoint interno. Recibe el resultado del agente AI (FastAPI) una vez completado el análisis. ' +
      'PENDIENTE: seguridad M2M (API Key / shared secret) y dispatch de resultado.',
  })
  @ApiAcceptedResponse({ type: AiAgentResultResponseDto })
  async receive_result(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body() dto: AiAgentResultDto,
  ): Promise<AiAgentResultResponseDto> {
    this.logger.log(
      `[AiAgentCallback][ext_id=${external_id}][recommendation=${dto.recommendation}] resultado recibido (stub — dispatch pendiente)`,
    );
    return new AiAgentResultResponseDto(true);
  }
}
