import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { OnboardingRepositoryPort } from 'src/modules/transversal/domain/ports/onboarding.repository.port';
import { ONBOARDING_REPOSITORY } from 'src/modules/transversal/domain/ports/onboarding.repository.port';
import { Onboarding } from 'src/modules/transversal/domain/models/onboarding.model';
import { CreateOnboardingRequestDto } from './dto/create-onboarding-request.dto';
import { OnboardingResponseDto } from './dto/onboarding-response.dto';
import { UpdateOnboardingRequestDto } from './dto/update-onboarding-request.dto';

function toResponseDto(
  domain: Onboarding,
): OnboardingResponseDto {
  const dto = new OnboardingResponseDto();
  dto.externalId = domain.externalId;
  dto.userId = domain.userId;
  dto.userProductId = domain.userProductId;
  dto.partnerId = domain.partnerId;
  dto.partnerCategoryId = domain.partnerCategoryId;
  dto.salesRepId = domain.salesRepId;
  dto.businessName = domain.businessName;
  dto.businessRelationId = domain.businessRelationId;
  dto.businessTypeName = domain.businessTypeName;
  dto.businessTypeCode = domain.businessTypeCode;
  dto.businessAddress = domain.businessAddress;
  dto.businessCity = domain.businessCity;
  dto.businessRentAmount = domain.businessRentAmount;
  dto.numberOfLocations = domain.numberOfLocations;
  dto.numberOfEmployees = domain.numberOfEmployees;
  dto.businessSeniorityId = domain.businessSeniorityId;
  dto.sectorExperience = domain.sectorExperience;
  dto.relationshipToBusiness = domain.relationshipToBusiness;
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

function toNullableDate(
  value: string | Date | null | undefined,
): Date | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  return value instanceof Date ? value : new Date(value);
}

@ApiTags('onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    @Inject(ONBOARDING_REPOSITORY)
    private readonly repository: OnboardingRepositoryPort,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Crear registro de onboarding',
    description:
      'Crea un nuevo registro de onboarding y retorna su representación pública por externalId.',
  })
  @ApiBody({ type: CreateOnboardingRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Registro creado',
    type: OnboardingResponseDto,
  })
  async create(
    @Body() body: CreateOnboardingRequestDto,
  ): Promise<OnboardingResponseDto> {
    const created = await this.repository.create({
      ...body,
      submissionDate: toNullableDate(body.submissionDate),
      approvalDate: toNullableDate(body.approvalDate),
      creditStudyDate: toNullableDate(body.creditStudyDate),
      privacyPolicyDate: toNullableDate(body.privacyPolicyDate),
    });
    return toResponseDto(created);
  }

  @Get('register')
  @ApiOperation({
    summary: 'Listar registros de onboarding',
    description: 'Retorna todos los registros de onboarding ordenados por id descendente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de registros',
    type: OnboardingResponseDto,
    isArray: true,
  })
  async findAll(): Promise<OnboardingResponseDto[]> {
    const domains = await this.repository.findAll();
    return domains.map((domain) => toResponseDto(domain));
  }

  @Get('register/:externalId')
  @ApiOperation({
    summary: 'Obtener onboarding por externalId',
    description:
      'Retorna el registro de onboarding identificado por su UUID publico. No expone id incremental.',
  })
  @ApiParam({
    name: 'externalId',
    description: 'UUID del registro de onboarding',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Registro encontrado',
    type: OnboardingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Formato UUID inválido',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro no encontrado',
  })
  async getByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<OnboardingResponseDto> {
    const domain = await this.repository.findByExternalId(externalId);
    if (!domain) {
      throw new NotFoundException('Onboarding not found');
    }
    return toResponseDto(domain);
  }

  @Patch('register/:externalId')
  @ApiOperation({
    summary: 'Actualizar onboarding por externalId',
    description:
      'Actualiza parcialmente un registro de onboarding usando su UUID publico.',
  })
  @ApiParam({
    name: 'externalId',
    description: 'UUID del registro de onboarding',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiBody({ type: UpdateOnboardingRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Registro actualizado',
    type: OnboardingResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Formato UUID inválido',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro no encontrado',
  })
  async updateByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
    @Body() body: UpdateOnboardingRequestDto,
  ): Promise<OnboardingResponseDto> {
    const updated = await this.repository.updateByExternalId(externalId, {
      ...body,
      submissionDate: toNullableDate(body.submissionDate),
      approvalDate: toNullableDate(body.approvalDate),
      creditStudyDate: toNullableDate(body.creditStudyDate),
      privacyPolicyDate: toNullableDate(body.privacyPolicyDate),
    });
    if (!updated) {
      throw new NotFoundException('Onboarding not found');
    }
    return toResponseDto(updated);
  }

  @Delete('register/:externalId')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Eliminar onboarding por externalId',
    description:
      'Elimina un registro de onboarding por su UUID publico. Si no existe retorna 404.',
  })
  @ApiParam({
    name: 'externalId',
    description: 'UUID del registro de onboarding',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 204,
    description: 'Registro eliminado',
  })
  @ApiResponse({
    status: 400,
    description: 'Formato UUID inválido',
  })
  @ApiResponse({
    status: 404,
    description: 'Registro no encontrado',
  })
  async deleteByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.repository.deleteByExternalId(externalId);
    if (!deleted) {
      throw new NotFoundException('Onboarding not found');
    }
  }
}
