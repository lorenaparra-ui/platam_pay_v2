import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  NotImplementedException,
  Param,
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
import { CreatePartnerRequestDto } from "../application/dto/create-partner-request.dto";
import { PartnerResponseDto } from "../application/dto/partner-response.dto";
import { UpdatePartnerRequestDto } from "../application/dto/update-partner-request.dto";
import { Partner } from "../domain/models/partner.model";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
} from "../domain/ports/partner.repository.port";

type PartnerCrudPort = PartnerRepositoryPort & {
  create: (payload: Record<string, unknown>) => Promise<Partner>;
  updateByExternalId: (
    externalId: string,
    payload: Record<string, unknown>,
  ) => Promise<Partner | null>;
  deleteByExternalId: (externalId: string) => Promise<boolean>;
};

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
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
  ) {}

  private getCrudRepository(): PartnerCrudPort {
    const repository = this.repository as Partial<PartnerCrudPort>;
    if (
      typeof repository.create !== "function" ||
      typeof repository.updateByExternalId !== "function" ||
      typeof repository.deleteByExternalId !== "function"
    ) {
      throw new NotImplementedException(
        "CRUD methods are not implemented in PartnerRepositoryPort adapter",
      );
    }
    return repository as PartnerCrudPort;
  }

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
    const created = await this.getCrudRepository().create({
      countryCode: body.countryCode ?? null,
      companyName: body.companyName,
      tradeName: body.tradeName ?? null,
      acronym: body.acronym ?? null,
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
      defaultCategoryId: body.defaultCategoryId ?? null,
      statusId: body.statusId,
    });

    return toResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: "Listar partners" })
  @ApiResponse({
    status: 200,
    description: "Lista de partners",
    type: PartnerResponseDto,
    isArray: true,
  })
  async findAll(): Promise<PartnerResponseDto[]> {
    const partners = await this.repository.findAll();
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
    const partner = await this.repository.findByExternalId(externalId);
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
    const updated = await this.getCrudRepository().updateByExternalId(
      externalId,
      {
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
      },
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
      await this.getCrudRepository().deleteByExternalId(externalId);
    if (!deleted) {
      throw new NotFoundException("Partner not found");
    }
  }
}
