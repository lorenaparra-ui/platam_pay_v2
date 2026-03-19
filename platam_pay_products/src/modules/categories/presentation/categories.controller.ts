import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import type { Category } from "../domain/models/category.model";
import { CreateCategoryRequestDto } from "../application/dto/create-category-request.dto";
import { UpdateCategoryRequestDto } from "../application/dto/update-category-request.dto";
import { CategoryResponseDto } from "../application/dto/category-response.dto";
import { CreateCategoryUseCase } from "../application/use-cases/create-category.use-case";
import { GetCategoryByExternalIdUseCase } from "../application/use-cases/get-category-by-external-id.use-case";
import { ListCategoriesByCreditFacilityIdUseCase } from "../application/use-cases/list-categories-by-credit-facility-id.use-case";
import { UpdateCategoryUseCase } from "../application/use-cases/update-category.use-case";
import { DeleteCategoryUseCase } from "../application/use-cases/delete-category.use-case";

function to_response(d: Category): CategoryResponseDto {
  const dto = new CategoryResponseDto();
  dto.external_id = d.external_id;
  dto.credit_facility_id = d.credit_facility_id;
  dto.partner_id = d.partner_id;
  dto.name = d.name;
  dto.discount_percentage = d.discount_percentage;
  dto.interest_rate = d.interest_rate;
  dto.disbursement_fee_percent = d.disbursement_fee_percent;
  dto.minimum_disbursement_fee = d.minimum_disbursement_fee;
  dto.delay_days = d.delay_days;
  dto.term_days = d.term_days;
  dto.status_id = d.status_id;
  dto.created_at = d.created_at.toISOString();
  dto.updated_at = d.updated_at.toISOString();
  return dto;
}

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly create_uc: CreateCategoryUseCase,
    private readonly get_by_external_uc: GetCategoryByExternalIdUseCase,
    private readonly list_by_cf_uc: ListCategoriesByCreditFacilityIdUseCase,
    private readonly update_uc: UpdateCategoryUseCase,
    private readonly delete_uc: DeleteCategoryUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear categoría" })
  @ApiBody({ type: CreateCategoryRequestDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: CategoryResponseDto })
  async create(
    @Body() body: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const created = await this.create_uc.run({
      credit_facility_id: body.credit_facility_id,
      partner_id: body.partner_id ?? null,
      name: body.name,
      delay_days: body.delay_days,
      disbursement_fee_percent: body.disbursement_fee_percent ?? null,
      discount_percentage: body.discount_percentage,
      interest_rate: body.interest_rate,
      minimum_disbursement_fee: body.minimum_disbursement_fee ?? null,
      term_days: body.term_days,
      status_id: body.status_id,
    });
    return to_response(created);
  }

  @Get("by-credit-facility/:creditFacilityId")
  @ApiOperation({ summary: "Listar categorías por línea de crédito (id interno)" })
  @ApiParam({ name: "creditFacilityId" })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryResponseDto, isArray: true })
  async list_by_credit_facility(
    @Param("creditFacilityId", ParseIntPipe) credit_facility_id: number,
  ): Promise<CategoryResponseDto[]> {
    const list = await this.list_by_cf_uc.run(credit_facility_id);
    return list.map(to_response);
  }

  @Get(":externalId")
  @ApiOperation({ summary: "Obtener categoría por external_id (UUID)" })
  @ApiParam({ name: "externalId" })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async get_one(
    @Param("externalId", ParseUUIDPipe) external_id: string,
  ): Promise<CategoryResponseDto> {
    const item = await this.get_by_external_uc.run(external_id);
    if (!item) {
      throw new NotFoundException("Categoría no encontrada");
    }
    return to_response(item);
  }

  @Patch(":externalId")
  @ApiOperation({ summary: "Actualizar categoría" })
  @ApiParam({ name: "externalId" })
  @ApiBody({ type: UpdateCategoryRequestDto })
  @ApiResponse({ status: HttpStatus.OK, type: CategoryResponseDto })
  async update(
    @Param("externalId", ParseUUIDPipe) external_id: string,
    @Body() body: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const updated = await this.update_uc.run(external_id, {
      partner_id: body.partner_id,
      name: body.name,
      delay_days: body.delay_days,
      disbursement_fee_percent: body.disbursement_fee_percent,
      discount_percentage: body.discount_percentage,
      interest_rate: body.interest_rate,
      minimum_disbursement_fee: body.minimum_disbursement_fee,
      term_days: body.term_days,
      status_id: body.status_id,
    });
    if (!updated) {
      throw new NotFoundException("Categoría no encontrada");
    }
    return to_response(updated);
  }

  @Delete(":externalId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Eliminar categoría" })
  @ApiParam({ name: "externalId" })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async remove(
    @Param("externalId", ParseUUIDPipe) external_id: string,
  ): Promise<void> {
    const ok = await this.delete_uc.run(external_id);
    if (!ok) {
      throw new NotFoundException("Categoría no encontrada");
    }
  }
}
