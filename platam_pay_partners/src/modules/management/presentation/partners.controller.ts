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
import { CreatePartnerCategoryRequestDto } from "@partner-categories/application/dto/create-partner-category-request.dto";
import { ChangePartnerStatusRequestDto } from "../application/dto/change-partner-status-request.dto";
import { CreatePartnerRequestDto } from "../application/dto/create-partner-request.dto";
import { PartnerListQueryDto } from "../application/dto/partner-list-query.dto";
import { PartnerResponseDto } from "../application/dto/partner-response.dto";
import { RegeneratePartnerApiKeyResponseDto } from "../application/dto/regenerate-partner-api-key-response.dto";
import { UpdatePartnerRequestDto } from "../application/dto/update-partner-request.dto";
import { ChangePartnerStatusUseCase } from "../application/use-cases/change-partner-status.use-case";
import { CreatePartnerUseCase } from "../application/use-cases/create-partner.use-case";
import { DeletePartnerByExternalIdUseCase } from "../application/use-cases/delete-partner-by-external-id.use-case";
import { FindAllPartnersUseCase } from "../application/use-cases/find-all-partners.use-case";
import { FindPartnerByExternalIdUseCase } from "../application/use-cases/find-partner-by-external-id.use-case";
import { RegeneratePartnerApiKeyUseCase } from "../application/use-cases/regenerate-partner-api-key.use-case";
import { UpdatePartnerByExternalIdUseCase } from "../application/use-cases/update-partner-by-external-id.use-case";
import { Partner } from "../domain/models/partner.model";
import {
  type CreatePartnerCategoryPayload,
  type CreatePartnerPayload,
} from "../domain/ports/partner.repository.port";

function toResponseDto(domain: Partner): PartnerResponseDto {
  const dto = new PartnerResponseDto();
  dto.externalId = domain.externalId;
  dto.countryCode = domain.countryCode;
  dto.companyName = domain.companyName;
  dto.tradeName = domain.tradeName;
  dto.acronym = domain.acronym;
  dto.logoUrl = domain.logoUrl;
  dto.coBrandingLogoUrl = domain.coBrandingLogoUrl;
  dto.primaryColor = domain.primaryColor;
  dto.secondaryColor = domain.secondaryColor;
  dto.lightColor = domain.lightColor;
  dto.salesRepRoleName = domain.salesRepRoleName;
  dto.salesRepRoleNamePlural = domain.salesRepRoleNamePlural;
  dto.notificationEmail = domain.notificationEmail;
  dto.webhookUrl = domain.webhookUrl;
  dto.sendSalesRepVoucher = domain.sendSalesRepVoucher;
  dto.disbursementNotificationEmail = domain.disbursementNotificationEmail;
  dto.defaultRepId = domain.defaultRepId;
  dto.defaultCategoryId = domain.defaultCategoryId;
  dto.statusId = domain.statusId;
  dto.createdAt = domain.createdAt.toISOString();
  dto.updatedAt = domain.updatedAt.toISOString();
  return dto;
}

@ApiTags("partners")
@Controller("partners/register")
export class PartnersController {
  constructor(
    private readonly createPartnerUseCase: CreatePartnerUseCase,
    private readonly findAllPartnersUseCase: FindAllPartnersUseCase,
    private readonly findPartnerByExternalIdUseCase: FindPartnerByExternalIdUseCase,
    private readonly updatePartnerByExternalIdUseCase: UpdatePartnerByExternalIdUseCase,
    private readonly deletePartnerByExternalIdUseCase: DeletePartnerByExternalIdUseCase,
    private readonly changePartnerStatusUseCase: ChangePartnerStatusUseCase,
    private readonly regeneratePartnerApiKeyUseCase: RegeneratePartnerApiKeyUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear partner" })
  @ApiBody({ type: CreatePartnerRequestDto })
  @ApiResponse({
    status: 201,
    description: "Partner creado",
    type: PartnerResponseDto,
  })
  async create(
    @Body() body: CreatePartnerRequestDto,
  ): Promise<PartnerResponseDto> {
    const payload: CreatePartnerPayload = {
      countryCode: body.countryCode,
      companyName: body.companyName,
      tradeName: body.tradeName,
      acronym: body.acronym,
      logoUrl: body.logoUrl ?? null,
      coBrandingLogoUrl: body.coBrandingLogoUrl ?? null,
      primaryColor: body.primaryColor ?? null,
      secondaryColor: body.secondaryColor ?? null,
      lightColor: body.lightColor ?? null,
      salesRepRoleName: body.salesRepRoleName ?? null,
      salesRepRoleNamePlural: body.salesRepRoleNamePlural ?? null,
      notificationEmail: body.notificationEmail ?? null,
      webhookUrl: body.webhookUrl ?? null,
      sendSalesRepVoucher: body.sendSalesRepVoucher ?? false,
      disbursementNotificationEmail: body.disbursementNotificationEmail ?? null,
      defaultRepId: body.defaultRepId ?? null,
      defaultCategoryId: body.defaultCategoryId,
      statusId: body.statusId,
      categories: this.mapCategories(body.categories),
      defaultCategoryIndex: body.defaultCategoryIndex,
    };

    const created = await this.executeWithUniqueConstraintHandling(() =>
      this.createPartnerUseCase.execute(payload),
    );

    return toResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: "Listar partners" })
  @ApiQuery({
    name: "search",
    required: false,
    description: "Busca partners por razon social",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de partners",
    type: PartnerResponseDto,
    isArray: true,
  })
  async findAll(
    @Query() query: PartnerListQueryDto,
  ): Promise<PartnerResponseDto[]> {
    const partners = await this.findAllPartnersUseCase.execute(query.search);
    return partners.map(toResponseDto);
  }

  @Get(":externalId")
  @ApiOperation({ summary: "Obtener partner por externalId" })
  @ApiParam({ name: "externalId", description: "UUID publico del partner" })
  @ApiResponse({
    status: 200,
    description: "Partner encontrado",
    type: PartnerResponseDto,
  })
  @ApiResponse({ status: 400, description: "Formato UUID invalido" })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  findByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<PartnerResponseDto> {
    return this.findByExternalIdHandler(externalId);
  }

  private async findByExternalIdHandler(
    externalId: string,
  ): Promise<PartnerResponseDto> {
    const partner =
      await this.findPartnerByExternalIdUseCase.execute(externalId);
    if (!partner) {
      throw new NotFoundException("Partner not found");
    }

    return toResponseDto(partner);
  }

  @Patch(":externalId")
  @ApiOperation({ summary: "Actualizar partner por externalId" })
  @ApiParam({ name: "externalId", description: "UUID publico del partner" })
  @ApiBody({ type: UpdatePartnerRequestDto })
  @ApiResponse({
    status: 200,
    description: "Partner actualizado",
    type: PartnerResponseDto,
  })
  @ApiResponse({ status: 400, description: "Formato UUID invalido" })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async updateByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: UpdatePartnerRequestDto,
  ): Promise<PartnerResponseDto> {
    const updated = await this.executeWithUniqueConstraintHandling(() =>
      this.updatePartnerByExternalIdUseCase.execute(externalId, {
        countryCode: body.countryCode,
        companyName: body.companyName,
        tradeName: body.tradeName,
        acronym: body.acronym,
        logoUrl: body.logoUrl,
        coBrandingLogoUrl: body.coBrandingLogoUrl,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        lightColor: body.lightColor,
        salesRepRoleName: body.salesRepRoleName,
        salesRepRoleNamePlural: body.salesRepRoleNamePlural,
        notificationEmail: body.notificationEmail,
        webhookUrl: body.webhookUrl,
        sendSalesRepVoucher: body.sendSalesRepVoucher,
        disbursementNotificationEmail: body.disbursementNotificationEmail,
        defaultRepId: body.defaultRepId,
        defaultCategoryId: body.defaultCategoryId,
        statusId: body.statusId,
      }),
    );

    if (!updated) {
      throw new NotFoundException("Partner not found");
    }

    return toResponseDto(updated);
  }

  @Delete(":externalId")
  @HttpCode(204)
  @ApiOperation({ summary: "Eliminar partner por externalId" })
  @ApiParam({ name: "externalId", description: "UUID publico del partner" })
  @ApiResponse({ status: 204, description: "Partner eliminado" })
  @ApiResponse({ status: 400, description: "Formato UUID invalido" })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async deleteByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted =
      await this.deletePartnerByExternalIdUseCase.execute(externalId);
    if (!deleted) {
      throw new NotFoundException("Partner not found");
    }
  }

  @Patch(":externalId/status")
  @ApiOperation({ summary: "Activar o desactivar partner" })
  @ApiParam({ name: "externalId", description: "UUID publico del partner" })
  @ApiBody({ type: ChangePartnerStatusRequestDto })
  @ApiResponse({
    status: 200,
    description: "Estado del partner actualizado",
    type: PartnerResponseDto,
  })
  @ApiResponse({ status: 400, description: "Body invalido o UUID invalido" })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async changeStatus(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: ChangePartnerStatusRequestDto,
  ): Promise<PartnerResponseDto> {
    const updated = await this.changePartnerStatusUseCase.execute(
      externalId,
      body.statusCode,
    );
    if (!updated) {
      throw new NotFoundException("Partner not found");
    }

    return toResponseDto(updated);
  }

  @Post(":externalId/api-key/regenerate")
  @ApiOperation({ summary: "Regenerar API key del partner" })
  @ApiParam({ name: "externalId", description: "UUID publico del partner" })
  @ApiResponse({
    status: 201,
    description: "API key regenerada (valor visible solo una vez)",
    type: RegeneratePartnerApiKeyResponseDto,
  })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async regenerateApiKey(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<RegeneratePartnerApiKeyResponseDto> {
    const { updated, apiKey } =
      await this.regeneratePartnerApiKeyUseCase.execute(externalId);
    if (!updated) {
      throw new NotFoundException("Partner not found");
    }

    return { apiKey };
  }

  private mapCategories(
    categories?: CreatePartnerCategoryRequestDto[],
  ): CreatePartnerPayload["categories"] {
    return categories?.map(
      (category): CreatePartnerCategoryPayload => ({
        name: category.name,
        discountPercentage: category.discountPercentage,
        interestRate: category.interestRate,
        disbursementFeePercent: category.disbursementFeePercent ?? null,
        minimumDisbursementFee: category.minimumDisbursementFee ?? null,
        delayDays: category.delayDays,
        termDays: category.termDays,
      }),
    );
  }

  private async executeWithUniqueConstraintHandling<T>(
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

      throw error;
    }
  }
}
