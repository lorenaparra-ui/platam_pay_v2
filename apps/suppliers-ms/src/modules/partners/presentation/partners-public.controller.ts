import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartnerState } from '@platam/shared';
import { GetPartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case';
import { GetPartnerByExternalIdRequest } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.request';
import { PartnerPublicCamelResponseDto } from './dto/partner-public-camel-response.dto';

/**
 * Lectura pública de partner por `external_id` (sin roles de back-office).
 * Solo expone partners con `state === active`.
 * Las operaciones administrativas siguen en {@link PartnersController}.
 */
@ApiTags('partners')
@Controller('partners')
export class PartnersPublicController {
  constructor(private readonly get_partner: GetPartnerByExternalIdUseCase) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener partner por external_id (público)',
    description:
      'Retorna el partner solo si `state` es **active**; en caso contrario 404. Campos públicos en camelCase.',
  })
  @ApiOkResponse({
    description: 'Partner encontrado',
    type: PartnerPublicCamelResponseDto,
  })
  async get_by_external_id(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PartnerPublicCamelResponseDto> {
    const res = await this.get_partner.execute(new GetPartnerByExternalIdRequest(id));
    if (res.state !== PartnerState.ACTIVE) {
      throw new NotFoundException('partner not found');
    }
    return PartnerPublicCamelResponseDto.from(res);
  }
}
