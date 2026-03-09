import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { QueryFailedError } from "typeorm";
import { CreatePartnerCategoryRequestDto } from "../application/dto/create-partner-category-request.dto";
import { PartnerCategoryListQueryDto } from "../application/dto/partner-category-list-query.dto";
import { FindCategoriesByPartnerUseCase } from "../application/use-cases/find-categories-by-partner.use-case";
import { CreatePartnerCategoryUseCase } from "../application/use-cases/create-partner-category.use-case";
import { FindAllPartnerCategoriesUseCase } from "../application/use-cases/find-all-partner-categories.use-case";
import { FindPartnerCategoryByExternalIdUseCase } from "../application/use-cases/find-partner-category-by-external-id.use-case";
import { UpdatePartnerCategoryByExternalIdUseCase } from "../application/use-cases/update-partner-category-by-external-id.use-case";
import { DeletePartnerCategoryByExternalIdUseCase } from "../application/use-cases/delete-partner-category-by-external-id.use-case";
import { UpdatePartnerCategoryRequestDto } from "../application/dto/update-partner-category-request.dto";
import { PartnerCategory } from "../domain/models/partner-category.model";
import { PartnerCategoryResponseDto } from "../application/dto/partner-category-response.dto";

function toResponseDto(domain: PartnerCategory): PartnerCategoryResponseDto {
  const dto = new PartnerCategoryResponseDto();
  dto.externalId = domain.externalId;
  dto.partnerId = domain.partnerId;
  dto.name = domain.name;
  dto.discountPercentage = domain.discountPercentage;
  dto.interestRate = domain.interestRate;
  dto.disbursementFeePercent = domain.disbursementFeePercent;
  dto.minimumDisbursementFee = domain.minimumDisbursementFee;
  dto.delayDays = domain.delayDays;
  dto.termDays = domain.termDays;
  dto.statusId = domain.statusId;
  dto.createdAt = domain.createdAt.toISOString();
  dto.updatedAt = domain.updatedAt.toISOString();
  return dto;
}

@ApiTags("partner-categories")
@Controller("partner-categories")
export class PartnerCategoriesController {
  constructor(
    private readonly createPartnerCategoryUseCase: CreatePartnerCategoryUseCase,
    private readonly findAllPartnerCategoriesUseCase: FindAllPartnerCategoriesUseCase,
    private readonly findPartnerCategoryByExternalIdUseCase: FindPartnerCategoryByExternalIdUseCase,
    private readonly updatePartnerCategoryByExternalIdUseCase: UpdatePartnerCategoryByExternalIdUseCase,
    private readonly deletePartnerCategoryByExternalIdUseCase: DeletePartnerCategoryByExternalIdUseCase,
    private readonly findCategoriesByPartnerUseCase: FindCategoriesByPartnerUseCase,
  ) {}

  @Post("register")
  @ApiOperation({ summary: "Crear categoria de partner" })
  @ApiBody({ type: CreatePartnerCategoryRequestDto })
  @ApiResponse({
    status: 201,
    description: "Categoria creada",
    type: PartnerCategoryResponseDto,
  })
  async create(
    @Body() body: CreatePartnerCategoryRequestDto,
  ): Promise<PartnerCategoryResponseDto> {
    const created = await this.executeWithConstraintHandling(() =>
      this.createPartnerCategoryUseCase.execute({
        partnerExternalId: body.partnerExternalId,
        name: body.name,
        discountPercentage: body.discountPercentage,
        interestRate: body.interestRate,
        disbursementFeePercent: body.disbursementFeePercent ?? null,
        minimumDisbursementFee: body.minimumDisbursementFee ?? null,
        delayDays: body.delayDays,
        termDays: body.termDays,
        statusId: body.statusId,
      }),
    );
    if (!created) {
      throw new NotFoundException("Partner not found");
    }

    return toResponseDto(created);
  }

  @Get("register")
  @ApiOperation({ summary: "Listar categorias de partner" })
  @ApiQuery({
    name: "partnerExternalId",
    required: false,
    description: "Filtra por UUID publico del partner",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de categorias",
    type: PartnerCategoryResponseDto,
    isArray: true,
  })
  async findAll(
    @Query() query: PartnerCategoryListQueryDto,
  ): Promise<PartnerCategoryResponseDto[]> {
    const categories = await this.findAllPartnerCategoriesUseCase.execute(
      query.partnerExternalId,
    );
    return categories.map(toResponseDto);
  }

  @Get("register/:externalId")
  @ApiOperation({ summary: "Obtener categoria por externalId" })
  @ApiParam({ name: "externalId", description: "UUID publico de la categoria" })
  @ApiResponse({
    status: 200,
    description: "Categoria encontrada",
    type: PartnerCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: "Categoria no encontrada" })
  async findByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<PartnerCategoryResponseDto> {
    const category =
      await this.findPartnerCategoryByExternalIdUseCase.execute(externalId);
    if (!category) {
      throw new NotFoundException("Partner category not found");
    }

    return toResponseDto(category);
  }

  @Patch("register/:externalId")
  @ApiOperation({ summary: "Actualizar categoria por externalId" })
  @ApiParam({ name: "externalId", description: "UUID publico de la categoria" })
  @ApiBody({ type: UpdatePartnerCategoryRequestDto })
  @ApiResponse({
    status: 200,
    description: "Categoria actualizada",
    type: PartnerCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: "Categoria no encontrada" })
  async updateByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: UpdatePartnerCategoryRequestDto,
  ): Promise<PartnerCategoryResponseDto> {
    const updated = await this.executeWithConstraintHandling(() =>
      this.updatePartnerCategoryByExternalIdUseCase.execute(externalId, {
        name: body.name,
        discountPercentage: body.discountPercentage,
        interestRate: body.interestRate,
        disbursementFeePercent: body.disbursementFeePercent,
        minimumDisbursementFee: body.minimumDisbursementFee,
        delayDays: body.delayDays,
        termDays: body.termDays,
        statusId: body.statusId,
      }),
    );
    if (!updated) {
      throw new NotFoundException("Partner category not found");
    }

    return toResponseDto(updated);
  }

  @Delete("register/:externalId")
  @HttpCode(204)
  @ApiOperation({ summary: "Eliminar categoria por externalId" })
  @ApiParam({ name: "externalId", description: "UUID publico de la categoria" })
  @ApiResponse({ status: 204, description: "Categoria eliminada" })
  @ApiResponse({ status: 404, description: "Categoria no encontrada" })
  async deleteByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted =
      await this.deletePartnerCategoryByExternalIdUseCase.execute(externalId);
    if (!deleted) {
      throw new NotFoundException("Partner category not found");
    }
  }

  @Get("partner/:partnerExternalId")
  @ApiOperation({ summary: "Listar categorias de un partner" })
  @ApiParam({
    name: "partnerExternalId",
    description: "UUID publico del partner",
  })
  @ApiResponse({
    status: 200,
    description: "Categorias del partner",
    type: PartnerCategoryResponseDto,
    isArray: true,
  })
  async findByPartner(
    @Param("partnerExternalId", ParseUUIDPipe) partnerExternalId: string,
  ): Promise<PartnerCategoryResponseDto[]> {
    const categories =
      await this.findCategoriesByPartnerUseCase.execute(partnerExternalId);
    return categories.map(toResponseDto);
  }

  private async executeWithConstraintHandling<T>(
    action: () => Promise<T>,
  ): Promise<T> {
    try {
      return await action();
    } catch (error) {
      const driverErrorCode = (error as { driverError?: { code?: unknown } })
        .driverError?.code;

      if (
        error instanceof QueryFailedError &&
        typeof driverErrorCode === "string" &&
        driverErrorCode === "23505"
      ) {
        throw new ConflictException("Duplicated unique value");
      }

      if (
        error instanceof QueryFailedError &&
        typeof driverErrorCode === "string" &&
        driverErrorCode === "23502"
      ) {
        throw new BadRequestException("Missing required value");
      }

      if (
        error instanceof QueryFailedError &&
        typeof driverErrorCode === "string" &&
        driverErrorCode === "23503"
      ) {
        throw new BadRequestException("Invalid foreign key reference");
      }

      throw error;
    }
  }
}
