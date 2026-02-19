import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { OnboardingRepositoryPort } from '@transversal/domain/ports/onboarding.repository.port';
import { ONBOARDING_REPOSITORY } from '@transversal/domain/ports/onboarding.repository.port';
import { Onboarding } from '@transversal/domain/models/onboarding.model';
import { OnboardingResponseDto } from './dto/onboarding-response.dto';

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

@ApiTags('onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    @Inject(ONBOARDING_REPOSITORY)
    private readonly repository: OnboardingRepositoryPort,
  ) {}

  @Get('register/:externalId')
  @ApiOperation({
    summary: 'Obtener onboarding register por externalId',
    description:
      'Retorna el registro de onboarding/register identificado por su UUID publico. No expone id incremental.',
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
}
