import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterClientCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case';
import { RegisterClientCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request';
import { RegisterNaturalPersonCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case';
import { RegisterNaturalPersonCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.request';
import { CreateCreditApplicationDto } from '../dto/create-credit-application.dto';
import { CreateNaturalPersonCreditApplicationDto } from '../dto/create-natural-person-credit-application.dto';
import { CreditApplicationResponseDto } from '../dto/credit-application-response.dto';

@ApiTags('credit-applications')
@Controller('credit-applications')
export class CreditApplicationsPublicController {
  constructor(
    private readonly register_client: RegisterClientCreditApplicationUseCase,
    private readonly register_natural_person: RegisterNaturalPersonCreditApplicationUseCase,
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

  @Post('natural-person')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear solicitud de cupo (persona natural)',
    description:
      'Persona nueva: alta vía SQS en transversal-ms (`persons`). Luego negocio en `suppliers_schema.businesses` y solicitud en `credit_applications` con partner asociado.',
  })
  @ApiCreatedResponse({
    description: 'Solicitud creada',
    type: CreditApplicationResponseDto,
  })
  async create_natural_person(
    @Body() dto: CreateNaturalPersonCreditApplicationDto,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.register_natural_person.execute(
      new RegisterNaturalPersonCreditApplicationRequest(
        dto.birthDate,
        dto.businessAddress,
        dto.businessFlagshipM2,
        dto.businessName,
        dto.businessRentAmount,
        dto.businessSeniority,
        dto.businessType,
        dto.cityId,
        dto.currentPurchases,
        dto.docNumber,
        dto.docType,
        dto.email,
        dto.firstName,
        dto.lastName,
        dto.monthlyExpenses,
        dto.monthlyIncome,
        dto.monthlyPurchases,
        dto.numberOfEmployees,
        dto.numberOfLocations,
        dto.partnerId,
        dto.salesRepId,
        dto.privacyPolicyAccepted,
        dto.phone,
        dto.relationshipToBusiness,
        dto.requestedCreditLine,
        dto.totalAssets,
      ),
    );
    return CreditApplicationResponseDto.from(result);
  }
}
