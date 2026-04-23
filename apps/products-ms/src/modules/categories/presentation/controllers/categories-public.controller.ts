import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  PRODUCTS_REFERENCE_LOOKUP,
  type ProductsReferenceLookupPort,
} from '@common/ports/products-reference-lookup.port';
import { ListCategoriesByPartnerUseCase } from '@modules/categories/application/use-cases/list-categories-by-partner/list-categories-by-partner.use-case';
import { CategoryResponseDto } from '../dto/category-response.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesPublicController {
  constructor(
    private readonly list_categories_by_partner: ListCategoriesByPartnerUseCase,
    @Inject(PRODUCTS_REFERENCE_LOOKUP)
    private readonly reference_lookup: ProductsReferenceLookupPort,
  ) {}

  /**
   * Listado por `external_id` (UUID) del partner — uso típico desde onboarding con `[id]` en la URL.
   * Debe declararse antes de `partner/:partnerId` para no confundir el segmento con un número.
   */
  @Get('partner-external/:partnerExternalId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  async list_by_partner_external(
    @Param('partnerExternalId', new ParseUUIDPipe({ version: '4' }))
    partner_external_id: string,
  ): Promise<CategoryResponseDto[]> {
    const partner_id =
      await this.reference_lookup.get_partner_internal_id_by_external_id(
        partner_external_id,
      );
    if (partner_id === null) {
      throw new NotFoundException('partner not found');
    }
    const items = await this.list_categories_by_partner.execute({ partner_id });
    return items.map((item) => CategoryResponseDto.from(item));
  }

  @Get('partner/:partnerId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  async list_by_partner(
    @Param('partnerId', ParseIntPipe) partner_id: number,
  ): Promise<CategoryResponseDto[]> {
    const items = await this.list_categories_by_partner.execute({ partner_id });
    return items.map((item) => CategoryResponseDto.from(item));
  }
}
