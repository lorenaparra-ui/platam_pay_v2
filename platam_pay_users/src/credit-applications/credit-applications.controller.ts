import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { CreditApplicationBnplRepositoryPort } from '@transversal/domain/ports/credit-application-bnpl.repository.port';
import { CREDIT_APPLICATION_BNPL_REPOSITORY } from '@transversal/domain/ports/credit-application-bnpl.repository.port';
import { CreditApplicationBnpl } from '@transversal/domain/models/credit-application-bnpl.model';
import { CreditApplicationBnplResponseDto } from './dto/credit-application-bnpl-response.dto';

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

@ApiTags('credit-applications')
@Controller('credit-applications')
export class CreditApplicationsController {
  constructor(
    @Inject(CREDIT_APPLICATION_BNPL_REPOSITORY)
    private readonly repository: CreditApplicationBnplRepositoryPort,
  ) {}

  @Get(':externalId')
  @ApiOperation({
    summary: 'Obtener solicitud de crédito BNPL por externalId',
    description:
      'Retorna la solicitud de crédito BNPL identificada por su UUID público. No expone id incremental.',
  })
  @ApiParam({
    name: 'externalId',
    description: 'UUID de la solicitud de crédito',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Solicitud encontrada',
    type: CreditApplicationBnplResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Formato UUID inválido',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitud no encontrada',
  })
  async getByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<CreditApplicationBnplResponseDto> {
    const domain = await this.repository.findByExternalId(externalId);
    if (!domain) {
      throw new NotFoundException('Credit application not found');
    }
    return toResponseDto(domain);
  }
}
