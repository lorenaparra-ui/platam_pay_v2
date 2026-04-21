import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterClientCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case';
import { RegisterClientCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request';
import { CreateCreditApplicationDto } from '../dto/create-credit-application.dto';
import { CreditApplicationResponseDto } from '../dto/credit-application-response.dto';

@ApiTags('credit-applications')
@Controller('credit-applications')
export class CreditApplicationsPublicController {
  constructor(
    private readonly register_client: RegisterClientCreditApplicationUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear solicitud de cupo / Registrar cliente',
    description:
      'Endpoint público. Registra un cliente nuevo (o existente por docNumber) y crea una solicitud de cupo en estado IN_PROGRESS.',
  })
  @ApiCreatedResponse({
    description: 'Solicitud creada',
    type: CreditApplicationResponseDto,
  })
  async create(
    @Body() dto: CreateCreditApplicationDto,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.register_client.execute(
      new RegisterClientCreditApplicationRequest(
        dto.phone,
        dto.email,
        dto.docType,
        dto.docNumber,
        dto.firstName,
        dto.lastName,
        dto.businessName,
        dto.businessType,
        dto.isCurrentClient,
        dto.requestedCreditLine,
        dto.privacyPolicyAccepted,
        dto.relationshipToBusiness,
        dto.cityId,
        dto.businessAddress,
        dto.businessSeniority,
        dto.numberOfEmployees,
        dto.numberOfLocations,
        dto.businessFlagshipM2,
        dto.businessHasRent,
        dto.businessRentAmount,
        dto.monthlyPurchases,
        dto.currentPurchases,
        dto.totalAssets,
        dto.monthlyIncome,
        dto.monthlyExpenses,
      ),
    );
    return CreditApplicationResponseDto.from(result);
  }
}
