import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartnerState } from '@platam/shared';
import { GetPartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case';
import { GetPartnerByExternalIdRequest } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.request';
import { ListSalesRepresentativesUseCase } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case';
import { ListSalesRepresentativesRequest } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request';
import { PartnerPublicCamelResponseDto } from './dto/partner-public-camel-response.dto';
import { SalesRepresentativeResponseDto } from '@modules/sales-representatives/presentation/dto/sales-representative-response.dto';

/**
 * Lectura pública de partner por `external_id` (sin roles de back-office).
 * Solo expone partners con `state === active`.
 * Las operaciones administrativas siguen en {@link PartnersController}.
 */
@ApiTags('partners')
@Controller('partners')
export class PartnersPublicController {
  constructor(
    private readonly get_partner: GetPartnerByExternalIdUseCase,
    private readonly list_sales_representatives: ListSalesRepresentativesUseCase,
  ) {}

  /**
   * Debe declararse antes de `@Get(':id')` para que el segmento fijo no sea capturado como id.
   */
  @Get(':id/sales-representatives')
  @ApiOperation({
    summary: 'Listar representantes de ventas del partner (público)',
    description:
      'Solo disponible si el partner existe y está `active`. Misma forma que GET /sales-representatives?partner_external_id=.',
  })
  @ApiOkResponse({
    description: 'Lista de representantes',
    type: [SalesRepresentativeResponseDto],
  })
  async list_sales_representatives_by_partner(
    @Param('id', new ParseUUIDPipe({ version: '4' })) partner_external_id: string,
  ): Promise<SalesRepresentativeResponseDto[]> {
    await this.assert_active_partner(partner_external_id);
    return this.list_sales_representatives.execute(
      new ListSalesRepresentativesRequest(partner_external_id),
    );
  }

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

  private async assert_active_partner(partner_external_id: string): Promise<void> {
    const res = await this.get_partner.execute(
      new GetPartnerByExternalIdRequest(partner_external_id),
    );
    if (res.state !== PartnerState.ACTIVE) {
      throw new NotFoundException('partner not found');
    }
  }
}
