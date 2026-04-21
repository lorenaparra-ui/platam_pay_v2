import { Controller, Get, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartnerState } from '@platam/shared';
import { GetPartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case';
import { GetPartnerByExternalIdRequest } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.request';
import { ListSalesRepresentativesUseCase } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case';
import { ListSalesRepresentativesRequest } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request';
import { SalesRepresentativePublicOptionDto } from './dto/sales-representative-public-option.dto';

/**
 * Lectura pública de representantes por partner (sin Bearer).
 * Solo disponible si el partner existe y está `active`.
 */
@ApiTags('sales-representatives')
@Controller('sales-representatives')
export class SalesRepresentativesPublicController {
  constructor(
    private readonly get_partner: GetPartnerByExternalIdUseCase,
    private readonly list_sales_representatives: ListSalesRepresentativesUseCase,
  ) {}

  @Get('partner/:partner_external_id')
  @ApiOperation({
    summary: 'Listar representantes de ventas del partner (público)',
    description:
      'Solo disponible si el partner existe y está `active`. Incluye todos los representantes del partner, también los marcados como `is_default`. Respuesta con `externalId`, `userFullName` e `isDefault`.',
  })
  @ApiOkResponse({
    description: 'Lista de representantes',
    type: [SalesRepresentativePublicOptionDto],
  })
  async list_by_partner_public(
    @Param('partner_external_id', new ParseUUIDPipe({ version: '4' }))
    partner_external_id: string,
  ): Promise<SalesRepresentativePublicOptionDto[]> {
    await this.assert_active_partner(partner_external_id);
    const rows = await this.list_sales_representatives.execute(
      new ListSalesRepresentativesRequest(partner_external_id, true),
    );
    return rows.map(SalesRepresentativePublicOptionDto.from);
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
