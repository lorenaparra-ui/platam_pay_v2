import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { NotFoundException } from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import type { CreditApplication } from "../domain/models/credit-application.model";
import { CreateCreditApplicationRequestDto } from "../application/dto/create-credit-application-request.dto";
import { CreditApplicationResponseDto } from "../application/dto/credit-application-response.dto";
import { UpdateCreditApplicationRequestDto } from "../application/dto/update-credit-application-request.dto";
import { CreateCreditApplicationUseCase } from "../application/use-cases/create-credit-application.use-case";
import { DeleteCreditApplicationUseCase } from "../application/use-cases/delete-credit-application.use-case";
import { GetAllCreditApplicationsUseCase } from "../application/use-cases/get-all-credit-applications.use-case";
import { GetCreditApplicationByExternalIdUseCase } from "../application/use-cases/get-credit-application-by-external-id.use-case";
import { UpdateCreditApplicationUseCase } from "../application/use-cases/update-credit-application.use-case";

function toResponseDto(
  domain: CreditApplication,
): CreditApplicationResponseDto {
  const dto = new CreditApplicationResponseDto();
  dto.externalId = domain.externalId;
  dto.personId = domain.personId;
  dto.partnerId = domain.partnerId;
  dto.partnerCategoryId = domain.partnerCategoryId;
  dto.businessId = domain.businessId;
  dto.numberOfLocations = domain.numberOfLocations;
  dto.numberOfEmployees = domain.numberOfEmployees;
  dto.businessSeniority = domain.businessSeniority;
  dto.sectorExperience = domain.sectorExperience;
  dto.businessFlagshipM2 = domain.businessFlagshipM2;
  dto.businessHasRent = domain.businessHasRent;
  dto.businessRentAmount = domain.businessRentAmount;
  dto.monthlyIncome = domain.monthlyIncome;
  dto.monthlyExpenses = domain.monthlyExpenses;
  dto.monthlyPurchases = domain.monthlyPurchases;
  dto.currentPurchases = domain.currentPurchases;
  dto.totalAssets = domain.totalAssets;
  dto.requestedCreditLine = domain.requestedCreditLine;
  dto.isCurrentClient = domain.isCurrentClient;
  dto.statusId = domain.statusId;
  dto.submissionDate = domain.submissionDate?.toISOString() ?? null;
  dto.approvalDate = domain.approvalDate?.toISOString() ?? null;
  dto.rejectionReason = domain.rejectionReason;
  dto.creditStudyDate = domain.creditStudyDate?.toISOString() ?? null;
  dto.creditScore = domain.creditScore;
  dto.creditDecision = domain.creditDecision;
  dto.approvedCreditLine = domain.approvedCreditLine;
  dto.analystReport = domain.analystReport;
  dto.riskProfile = domain.riskProfile;
  dto.privacyPolicyAccepted = domain.privacyPolicyAccepted;
  dto.privacyPolicyDate = domain.privacyPolicyDate?.toISOString() ?? null;
  dto.createdAt = domain.createdAt.toISOString();
  dto.updatedAt = domain.updatedAt.toISOString();
  return dto;
}

@ApiTags("credit-applications")
@Controller("credit-applications")
export class CreditApplicationsController {
  constructor(
    private readonly createUseCase: CreateCreditApplicationUseCase,
    private readonly getAllUseCase: GetAllCreditApplicationsUseCase,
    private readonly getByExternalIdUseCase: GetCreditApplicationByExternalIdUseCase,
    private readonly updateUseCase: UpdateCreditApplicationUseCase,
    private readonly deleteUseCase: DeleteCreditApplicationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear solicitud de crédito" })
  @ApiBody({ type: CreateCreditApplicationRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Solicitud creada",
    type: CreditApplicationResponseDto,
  })
  async create(
    @Body() body: CreateCreditApplicationRequestDto,
  ): Promise<CreditApplicationResponseDto> {
    const created = await this.createUseCase.run(body);
    return toResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: "Listar solicitudes de crédito" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de solicitudes",
    type: CreditApplicationResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CreditApplicationResponseDto[]> {
    const list = await this.getAllUseCase.run();
    return list.map(toResponseDto);
  }

  @Get(":externalId")
  @ApiOperation({ summary: "Obtener solicitud por externalId" })
  @ApiParam({
    name: "externalId",
    description: "UUID público de la solicitud",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Solicitud encontrada",
    type: CreditApplicationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Solicitud no encontrada",
  })
  async findByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<CreditApplicationResponseDto> {
    const item = await this.getByExternalIdUseCase.run(externalId);
    if (!item) {
      throw new NotFoundException("Solicitud de crédito no encontrada");
    }
    return toResponseDto(item);
  }

  @Patch(":externalId")
  @ApiOperation({ summary: "Actualizar solicitud por externalId" })
  @ApiParam({
    name: "externalId",
    description: "UUID público de la solicitud",
  })
  @ApiBody({ type: UpdateCreditApplicationRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Solicitud actualizada",
    type: CreditApplicationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Solicitud no encontrada",
  })
  async updateByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: UpdateCreditApplicationRequestDto,
  ): Promise<CreditApplicationResponseDto> {
    const updated = await this.updateUseCase.run(externalId, body);
    if (!updated) {
      throw new NotFoundException("Solicitud de crédito no encontrada");
    }
    return toResponseDto(updated);
  }

  @Delete(":externalId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Eliminar solicitud por externalId" })
  @ApiParam({
    name: "externalId",
    description: "UUID público de la solicitud",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Solicitud eliminada",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Solicitud no encontrada",
  })
  async deleteByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.deleteUseCase.run(externalId);
    if (!deleted) {
      throw new NotFoundException("Solicitud de crédito no encontrada");
    }
  }
}
