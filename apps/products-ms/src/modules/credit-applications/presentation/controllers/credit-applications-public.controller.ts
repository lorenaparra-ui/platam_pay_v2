import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterClientCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.use-case';
import { RegisterClientCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/register-client-credit-application/register-client-credit-application.request';
import { RegisterNaturalPersonCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.use-case';
import { RegisterNaturalPersonCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/register-natural-person-credit-application/register-natural-person-credit-application.request';
import { EnqueueNaturalPersonCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/enqueue-natural-person-credit-application/enqueue-natural-person-credit-application.use-case';
import { EnqueueNaturalPersonCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/enqueue-natural-person-credit-application/enqueue-natural-person-credit-application.request';
import { GetCreditApplicationJobUseCase } from '@modules/credit-applications/application/use-cases/get-credit-application-job/get-credit-application-job.use-case';
import { GetCreditApplicationJobRequest } from '@modules/credit-applications/application/use-cases/get-credit-application-job/get-credit-application-job.request';
import { CreateCreditApplicationDto } from '../dto/create-credit-application.dto';
import { CreateNaturalPersonCreditApplicationDto } from '../dto/create-natural-person-credit-application.dto';
import { CreditApplicationResponseDto } from '../dto/credit-application-response.dto';
import {
  CreditApplicationJobStatusResponseDto,
  EnqueueCreditApplicationResponseDto,
} from '../dto/credit-application-job-response.dto';

@ApiTags('credit-applications')
@Controller('credit-applications')
export class CreditApplicationsPublicController {
  constructor(
    private readonly register_client: RegisterClientCreditApplicationUseCase,
    private readonly register_natural_person: RegisterNaturalPersonCreditApplicationUseCase,
    private readonly enqueue_natural_person: EnqueueNaturalPersonCreditApplicationUseCase,
    private readonly get_job: GetCreditApplicationJobUseCase,
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

  @Post('natural-person/async')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Encolar solicitud de cupo (persona natural) — asíncrono',
    description:
      'Devuelve 202 + job_id inmediatamente. El proceso crea persona (transversal-ms), negocio (suppliers-ms) y solicitud de crédito de forma asíncrona. Consultar estado en GET /credit-applications/jobs/:jobId.',
  })
  @ApiAcceptedResponse({ description: 'Job encolado', type: EnqueueCreditApplicationResponseDto })
  async create_natural_person_async(
    @Body() dto: CreateNaturalPersonCreditApplicationDto,
    @Headers('Idempotency-Key') idempotency_key?: string,
  ): Promise<EnqueueCreditApplicationResponseDto> {
    const result = await this.enqueue_natural_person.execute(
      new EnqueueNaturalPersonCreditApplicationRequest(
        dto.partnerId,
        dto.salesRepId,
        dto.firstName,
        dto.lastName,
        dto.docType,
        dto.docNumber,
        dto.phone ?? null,
        dto.email ?? null,
        dto.birthDate ?? null,
        dto.cityId ?? null,
        dto.businessType,
        dto.businessName ?? null,
        dto.businessAddress ?? null,
        dto.relationshipToBusiness ?? null,
        dto.businessSeniority ?? null,
        dto.numberOfEmployees ?? null,
        dto.numberOfLocations ?? null,
        dto.businessFlagshipM2 ?? null,
        null,
        dto.businessRentAmount ?? null,
        dto.requestedCreditLine,
        dto.monthlyPurchases ?? null,
        dto.currentPurchases ?? null,
        dto.totalAssets ?? null,
        dto.monthlyIncome ?? null,
        dto.monthlyExpenses ?? null,
        dto.privacyPolicyAccepted,
        idempotency_key ?? null,
      ),
    );
    return new EnqueueCreditApplicationResponseDto(result.jobId);
  }

  @Get('jobs/:jobId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Estado de un job de solicitud de crédito' })
  @ApiOkResponse({ type: CreditApplicationJobStatusResponseDto })
  async get_job_status(@Param('jobId') job_id: string): Promise<CreditApplicationJobStatusResponseDto> {
    const result = await this.get_job.execute(new GetCreditApplicationJobRequest(job_id));
    return new CreditApplicationJobStatusResponseDto(
      result.jobId,
      result.status,
      result.step,
      result.creditApplicationId,
      result.errorMessage,
    );
  }
}
