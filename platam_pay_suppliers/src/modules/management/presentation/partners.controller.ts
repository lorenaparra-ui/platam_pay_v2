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
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { QueryFailedError } from "typeorm";
import { ChangePartnerStatusRequestDto } from "@partners/application/dto/change-partner-status-request.dto";
import { CreatePartnerRequestDto } from "@partners/application/dto/create-partner-request.dto";
import { CreatePartnerFullRequestDto } from "@partners/application/dto/create-partner-full-request.dto";
import { PartnerListQueryDto } from "@partners/application/dto/partner-list-query.dto";
import { PartnerResponseDto } from "@partners/application/dto/partner-response.dto";
import { UpdatePartnerRequestDto } from "@partners/application/dto/update-partner-request.dto";
import { ChangePartnerStatusUseCase } from "@partners/application/use-cases/change-partner-status.use-case";
import { CreatePartnerUseCase } from "@partners/application/use-cases/create-partner.use-case";
import { CreatePartnerEventDrivenUseCase } from "@partners/application/use-cases/create-partner-event-driven.use-case";
import { DeletePartnerByExternalIdUseCase } from "@partners/application/use-cases/delete-partner-by-external-id.use-case";
import { FindAllPartnersUseCase } from "@partners/application/use-cases/find-all-partners.use-case";
import { FindPartnerByExternalIdUseCase } from "@partners/application/use-cases/find-partner-by-external-id.use-case";
import { UpdatePartnerByExternalIdUseCase } from "@partners/application/use-cases/update-partner-by-external-id.use-case";
import { Partner } from "@partners/domain/models/partner.model";
import type { CreatePartnerPayload } from "@partners/domain/ports/partner.repository.port";

function toResponseDto(domain: Partner): PartnerResponseDto {
  const dto = new PartnerResponseDto();
  dto.externalId = domain.externalId;
  dto.businessId = domain.businessId;
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
    private readonly createPartnerEventDrivenUseCase: CreatePartnerEventDrivenUseCase,
    private readonly findAllPartnersUseCase: FindAllPartnersUseCase,
    private readonly findPartnerByExternalIdUseCase: FindPartnerByExternalIdUseCase,
    private readonly updatePartnerByExternalIdUseCase: UpdatePartnerByExternalIdUseCase,
    private readonly deletePartnerByExternalIdUseCase: DeletePartnerByExternalIdUseCase,
    private readonly changePartnerStatusUseCase: ChangePartnerStatusUseCase,
  ) {}

  @Post("full")
  @ApiOperation({ summary: "Crear partner (flujo completo event-driven)" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["data", "logo", "coBrandingLogo"],
      properties: {
        data: { type: "string", description: "JSON del CreatePartnerFullRequestDto" },
        logo: { type: "string", format: "binary" },
        coBrandingLogo: { type: "string", format: "binary" },
      },
    },
  })
  @ApiResponse({ status: 201, description: "Partner creado", type: PartnerResponseDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "logo", maxCount: 1 },
      { name: "coBrandingLogo", maxCount: 1 },
    ]),
  )
  async createFull(
    @Body("data") dataJson: string,
    @UploadedFiles()
    files: {
      logo?: Array<{ buffer: Buffer; mimetype: string; originalname: string }>;
      coBrandingLogo?: Array<{ buffer: Buffer; mimetype: string; originalname: string }>;
    },
  ): Promise<PartnerResponseDto> {
    const dto = JSON.parse(dataJson || "{}") as CreatePartnerFullRequestDto;
    if (!files?.logo?.[0] || !files?.coBrandingLogo?.[0]) {
      throw new BadRequestException("Se requieren los archivos logo y coBrandingLogo");
    }
    const logoFile = files.logo[0];
    const coBrandingFile = files.coBrandingLogo[0];
    const created = await this.runWithConstraintHandling(() =>
      this.createPartnerEventDrivenUseCase.execute(dto, {
        logo: {
          buffer: logoFile.buffer,
          mimetype: logoFile.mimetype ?? "image/png",
          originalname: logoFile.originalname ?? "logo",
        },
        coBrandingLogo: {
          buffer: coBrandingFile.buffer,
          mimetype: coBrandingFile.mimetype ?? "image/png",
          originalname: coBrandingFile.originalname ?? "cobranding",
        },
      }),
    );
    return toResponseDto(created);
  }

  @Post()
  @ApiOperation({ summary: "Crear partner (payload simple)" })
  @ApiBody({ type: CreatePartnerRequestDto })
  @ApiResponse({ status: 201, description: "Partner creado", type: PartnerResponseDto })
  async create(@Body() body: CreatePartnerRequestDto): Promise<PartnerResponseDto> {
    const payload: CreatePartnerPayload = {
      businessId: body.businessId,
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
      statusId: body.statusId,
    };
    const created = await this.runWithConstraintHandling(() =>
      this.createPartnerUseCase.execute(payload),
    );
    return toResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: "Listar partners" })
  @ApiQuery({ name: "search", required: false, description: "Busca por acrónimo" })
  @ApiResponse({ status: 200, description: "Lista de partners", type: PartnerResponseDto, isArray: true })
  async findAll(@Query() query: PartnerListQueryDto): Promise<PartnerResponseDto[]> {
    const partners = await this.findAllPartnersUseCase.execute(query.search);
    return partners.map(toResponseDto);
  }

  @Get(":externalId")
  @ApiOperation({ summary: "Obtener partner por externalId" })
  @ApiParam({ name: "externalId", description: "UUID del partner" })
  @ApiResponse({ status: 200, description: "Partner encontrado", type: PartnerResponseDto })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async findByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<PartnerResponseDto> {
    const partner = await this.findPartnerByExternalIdUseCase.execute(externalId);
    if (!partner) throw new NotFoundException("Partner not found");
    return toResponseDto(partner);
  }

  @Patch(":externalId")
  @ApiOperation({ summary: "Actualizar partner por externalId" })
  @ApiParam({ name: "externalId", description: "UUID del partner" })
  @ApiBody({ type: UpdatePartnerRequestDto })
  @ApiResponse({ status: 200, description: "Partner actualizado", type: PartnerResponseDto })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async updateByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: UpdatePartnerRequestDto,
  ): Promise<PartnerResponseDto> {
    const updated = await this.runWithConstraintHandling(() =>
      this.updatePartnerByExternalIdUseCase.execute(externalId, {
        businessId: body.businessId,
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
        statusId: body.statusId,
      }),
    );
    if (!updated) throw new NotFoundException("Partner not found");
    return toResponseDto(updated);
  }

  @Delete(":externalId")
  @HttpCode(204)
  @ApiOperation({ summary: "Eliminar partner por externalId" })
  @ApiParam({ name: "externalId", description: "UUID del partner" })
  @ApiResponse({ status: 204, description: "Partner eliminado" })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async deleteByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.deletePartnerByExternalIdUseCase.execute(externalId);
    if (!deleted) throw new NotFoundException("Partner not found");
  }

  @Patch(":externalId/status")
  @ApiOperation({ summary: "Activar o desactivar partner" })
  @ApiParam({ name: "externalId", description: "UUID del partner" })
  @ApiBody({ type: ChangePartnerStatusRequestDto })
  @ApiResponse({ status: 200, description: "Estado actualizado", type: PartnerResponseDto })
  @ApiResponse({ status: 404, description: "Partner no encontrado" })
  async changeStatus(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: ChangePartnerStatusRequestDto,
  ): Promise<PartnerResponseDto> {
    const updated = await this.changePartnerStatusUseCase.execute(externalId, body.statusCode);
    if (!updated) throw new NotFoundException("Partner not found");
    return toResponseDto(updated);
  }

  private async runWithConstraintHandling<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error) {
      const code = (error as { driverError?: { code?: unknown } }).driverError?.code;
      if (error instanceof QueryFailedError && typeof code === "string") {
        if (code === "23505") throw new ConflictException("Duplicated unique value");
        if (code === "23502") throw new BadRequestException("Missing required value");
        if (code === "23503") throw new BadRequestException("Invalid foreign key reference");
      }
      throw error;
    }
  }
}
