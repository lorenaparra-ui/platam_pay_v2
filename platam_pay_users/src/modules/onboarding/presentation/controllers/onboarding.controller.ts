import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { CreateNaturalPersonOnboardingCommand } from '@onboarding/application/commands';
import { CreateNaturalPersonOnboardingUseCase } from '@onboarding/application/use-cases/create-natural-person-onboarding.use-case';
import { CreateSalesRepNaturalOpinionUseCase } from '@onboarding/application/use-cases/create-sales-rep-natural-opinion.use-case';
import { CreateNaturalPersonOnboardingRequestDto } from '../dto/natural-person/create-natural-person-onboarding-request.dto';
import { CreateSalesRepNaturalOpinionRequestDto } from '../dto/sales-rep/create-sales-rep-natural-opinion-request.dto';

@ApiTags('onboarding')
@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly createNaturalPersonOnboardingUseCase: CreateNaturalPersonOnboardingUseCase,
    private readonly createSalesRepNaturalOpinionUseCase: CreateSalesRepNaturalOpinionUseCase,
  ) {}

  @Post('natural-person')
  @ApiOperation({ summary: 'Crear onboarding persona natural' })
  @ApiBody({ type: CreateNaturalPersonOnboardingRequestDto })
  @ApiResponse({ status: 201, description: 'Onboarding recibido' })
  @ApiResponse({ status: 400, description: 'Validación fallida' })
  async createNaturalPerson(
    @Body() dto: CreateNaturalPersonOnboardingRequestDto,
  ) {
    const command = this.toNaturalPersonCommand(dto);
    return this.createNaturalPersonOnboardingUseCase.execute(command);
  }

  @Post('sales-rep/natural-opinion')
  @ApiOperation({ summary: 'Registrar opinión del rep para onboarding persona natural' })
  @ApiBody({ type: CreateSalesRepNaturalOpinionRequestDto })
  @ApiResponse({ status: 201, description: 'Opinión recibida' })
  @ApiResponse({ status: 400, description: 'Validación fallida' })
  async createSalesRepNaturalOpinion(
    @Body() dto: CreateSalesRepNaturalOpinionRequestDto,
  ) {
    const command = this.toSalesRepNaturalOpinionCommand(dto);
    return this.createSalesRepNaturalOpinionUseCase.execute(command);
  }

  private toNaturalPersonCommand(
    dto: CreateNaturalPersonOnboardingRequestDto,
  ): CreateNaturalPersonOnboardingCommand {
    return {
      context: {
        partnerId: dto.context.partnerId,
        salesRepId: dto.context.salesRepId,
        categoryId: dto.context.categoryId,
      },
      applicant: {
        firstName: dto.applicant.firstName,
        lastName: dto.applicant.lastName,
        documentType: dto.applicant.documentType,
        documentNumber: dto.applicant.documentNumber,
        email: dto.applicant.email,
        phone: dto.applicant.phone,
      },
      business: {
        businessName: dto.business.businessName,
        businessType: dto.business.businessType,
        businessCity: dto.business.businessCity,
        businessAddress: dto.business.businessAddress,
        numberOfEmployees: dto.business.numberOfEmployees,
        numberOfLocations: dto.business.numberOfLocations,
        seniority: dto.business.seniority,
        flagshipM2: dto.business.flagshipM2,
        hasRent: dto.business.hasRent,
        rentAmount: dto.business.rentAmount,
      },
      financial: {
        totalAssets: dto.financial.totalAssets,
        monthlyIncome: dto.financial.monthlyIncome,
        monthlyExpenses: dto.financial.monthlyExpenses,
        monthlyPurchases: dto.financial.monthlyPurchases,
        currentPurchases: dto.financial.currentPurchases,
        requestedLoc: dto.financial.requestedLoc,
      },
      isPartnerClient: dto.isPartnerClient,
    };
  }

  private toSalesRepNaturalOpinionCommand(
    dto: CreateSalesRepNaturalOpinionRequestDto,
  ) {
    return {
      context: {
        partnerId: dto.context.partnerId,
        salesRepId: dto.context.salesRepId,
        categoryId: dto.context.categoryId,
      },
      opinion: {
        relationshipDuration: dto.opinion.relationshipDuration,
        confidenceScore: dto.opinion.confidenceScore,
        
      },
    };
  }
}
