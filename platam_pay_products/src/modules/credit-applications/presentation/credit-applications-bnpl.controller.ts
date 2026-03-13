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
import type { CreditApplicationBnpl } from "../domain/models/credit-application-bnpl.model";
import { CreateCreditApplicationBnplRequestDto } from "../application/dto/create-credit-application-bnpl-request.dto";
import { CreditApplicationBnplResponseDto } from "../application/dto/credit-application-bnpl-response.dto";
import { UpdateCreditApplicationBnplRequestDto } from "../application/dto/update-credit-application-bnpl-request.dto";
import { CreateCreditApplicationBnplUseCase } from "../application/use-cases/create-credit-application-bnpl.use-case";
import { DeleteCreditApplicationBnplUseCase } from "../application/use-cases/delete-credit-application-bnpl.use-case";
import { GetAllCreditApplicationsBnplUseCase } from "../application/use-cases/get-all-credit-applications-bnpl.use-case";
import { GetCreditApplicationBnplByExternalIdUseCase } from "../application/use-cases/get-credit-application-bnpl-by-external-id.use-case";
import { UpdateCreditApplicationBnplUseCase } from "../application/use-cases/update-credit-application-bnpl.use-case";

function toResponseDto(
  domain: CreditApplicationBnpl,
): CreditApplicationBnplResponseDto {
  const dto = new CreditApplicationBnplResponseDto();
  dto.externalId = domain.externalId;
  dto.userId = domain.userId;
  dto.userProductId = domain.userProductId;
  dto.partnerId = domain.partnerId;
  dto.partnerCategoryId = domain.partnerCategoryId;
  dto.salesRepId = domain.salesRepId;
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

@ApiTags("credit-applications-bnpl")
@Controller("credit-applications-bnpl")
export class CreditApplicationsBnplController {
  constructor(
    private readonly createUseCase: CreateCreditApplicationBnplUseCase,
    private readonly getAllUseCase: GetAllCreditApplicationsBnplUseCase,
    private readonly getByExternalIdUseCase: GetCreditApplicationBnplByExternalIdUseCase,
    private readonly updateUseCase: UpdateCreditApplicationBnplUseCase,
    private readonly deleteUseCase: DeleteCreditApplicationBnplUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear solicitud de crédito BNPL" })
  @ApiBody({ type: CreateCreditApplicationBnplRequestDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Solicitud creada",
    type: CreditApplicationBnplResponseDto,
  })
  async create(
    @Body() body: CreateCreditApplicationBnplRequestDto,
  ): Promise<CreditApplicationBnplResponseDto> {
    const created = await this.createUseCase.run(body);
    return toResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: "Listar solicitudes de crédito BNPL" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Lista de solicitudes",
    type: CreditApplicationBnplResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CreditApplicationBnplResponseDto[]> {
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
    type: CreditApplicationBnplResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Solicitud no encontrada",
  })
  async findByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<CreditApplicationBnplResponseDto> {
    const item = await this.getByExternalIdUseCase.run(externalId);
    if (!item) {
      throw new NotFoundException("Solicitud de crédito BNPL no encontrada");
    }
    return toResponseDto(item);
  }

  @Patch(":externalId")
  @ApiOperation({ summary: "Actualizar solicitud por externalId" })
  @ApiParam({
    name: "externalId",
    description: "UUID público de la solicitud",
  })
  @ApiBody({ type: UpdateCreditApplicationBnplRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Solicitud actualizada",
    type: CreditApplicationBnplResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Solicitud no encontrada",
  })
  async updateByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: UpdateCreditApplicationBnplRequestDto,
  ): Promise<CreditApplicationBnplResponseDto> {
    const updated = await this.updateUseCase.run(externalId, body);
    if (!updated) {
      throw new NotFoundException("Solicitud de crédito BNPL no encontrada");
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
      throw new NotFoundException("Solicitud de crédito BNPL no encontrada");
    }
  }
}
