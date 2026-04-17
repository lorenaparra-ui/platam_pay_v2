import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '@platam/shared';
import { JwtAuthGuard } from '@modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/infrastructure/guards/roles.guard';
import { RequireRoles } from '@modules/auth/presentation/decorators/require-roles.decorator';

import { ListCreditApplicationsUseCase } from '@modules/credit-applications/application/use-cases/list-credit-applications/list-credit-applications.use-case';
import { ListCreditApplicationsByPartnerUseCase } from '@modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.use-case';
import { ListCreditApplicationsByPartnerRequest } from '@modules/credit-applications/application/use-cases/list-credit-applications-by-partner/list-credit-applications-by-partner.request';
import { ListCreditApplicationsBySalesRepUseCase } from '@modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.use-case';
import { ListCreditApplicationsBySalesRepRequest } from '@modules/credit-applications/application/use-cases/list-credit-applications-by-sales-rep/list-credit-applications-by-sales-rep.request';
import { GetCreditApplicationByExternalIdUseCase } from '@modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.use-case';
import { GetCreditApplicationByExternalIdRequest } from '@modules/credit-applications/application/use-cases/get-credit-application-by-external-id/get-credit-application-by-external-id.request';
import { UpdateCreditApplicationByExternalIdUseCase } from '@modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.use-case';
import { UpdateCreditApplicationByExternalIdRequest } from '@modules/credit-applications/application/use-cases/update-credit-application-by-external-id/update-credit-application-by-external-id.request';
import { SaveCreditApplicationPreStudyUseCase } from '@modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.use-case';
import { SaveCreditApplicationPreStudyRequest } from '@modules/credit-applications/application/use-cases/save-credit-application-pre-study/save-credit-application-pre-study.request';
import { UploadCreditApplicationDocumentUseCase } from '@modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.use-case';
import { UploadCreditApplicationDocumentRequest } from '@modules/credit-applications/application/use-cases/upload-credit-application-document/upload-credit-application-document.request';
import { ApproveCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.use-case';
import { ApproveCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/approve-credit-application/approve-credit-application.request';
import { RejectCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.use-case';
import { RejectCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/reject-credit-application/reject-credit-application.request';

import { UpdateCreditApplicationDto } from '../dto/update-credit-application.dto';
import { ApproveCreditApplicationDto } from '../dto/approve-credit-application.dto';
import { RejectCreditApplicationDto } from '../dto/reject-credit-application.dto';
import { SavePreStudyDto } from '../dto/save-pre-study.dto';
import { CreditApplicationResponseDto } from '../dto/credit-application-response.dto';

type MulterFile = Express.Multer.File;

@ApiTags('credit-applications')
@ApiBearerAuth('cognito-access-token')
@Controller('credit-applications')
@UseGuards(JwtAuthGuard, RolesGuard)
@RequireRoles(
  Roles.BACK_OFFICE_ADMIN,
  Roles.BACK_OFFICE_ANALYST,
  Roles.SALES_MANAGER,
  Roles.SALES_REPRESENTATIVE,
  Roles.PARTNER_ADMIN,
)
export class CreditApplicationsPrivateController {
  constructor(
    private readonly list_all: ListCreditApplicationsUseCase,
    private readonly list_by_partner: ListCreditApplicationsByPartnerUseCase,
    private readonly list_by_sales_rep: ListCreditApplicationsBySalesRepUseCase,
    private readonly get_by_external_id: GetCreditApplicationByExternalIdUseCase,
    private readonly update: UpdateCreditApplicationByExternalIdUseCase,
    private readonly save_pre_study: SaveCreditApplicationPreStudyUseCase,
    private readonly upload_document: UploadCreditApplicationDocumentUseCase,
    private readonly approve: ApproveCreditApplicationUseCase,
    private readonly reject: RejectCreditApplicationUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las solicitudes de cupo' })
  @ApiOkResponse({ type: [CreditApplicationResponseDto] })
  async list(): Promise<CreditApplicationResponseDto[]> {
    const rows = await this.list_all.execute();
    return rows.map(CreditApplicationResponseDto.from);
  }

  @Get('partner/:partnerId')
  @ApiOperation({ summary: 'Listar solicitudes por partner (internal ID)' })
  @ApiOkResponse({ type: [CreditApplicationResponseDto] })
  async list_by_partner_id(
    @Param('partnerId', ParseIntPipe) partner_id: number,
  ): Promise<CreditApplicationResponseDto[]> {
    const rows = await this.list_by_partner.execute(
      new ListCreditApplicationsByPartnerRequest(partner_id),
    );
    return rows.map(CreditApplicationResponseDto.from);
  }

  @Get('sales-rep/:salesRepId')
  @ApiOperation({ summary: 'Listar solicitudes por Sales Representative (internal ID)' })
  @ApiOkResponse({ type: [CreditApplicationResponseDto] })
  async list_by_sales_rep_id(
    @Param('salesRepId', ParseIntPipe) sales_rep_id: number,
  ): Promise<CreditApplicationResponseDto[]> {
    const rows = await this.list_by_sales_rep.execute(
      new ListCreditApplicationsBySalesRepRequest(sales_rep_id),
    );
    return rows.map(CreditApplicationResponseDto.from);
  }

  @Get(':externalId')
  @ApiOperation({ summary: 'Obtener detalle de una solicitud' })
  @ApiOkResponse({ type: CreditApplicationResponseDto })
  async get_detail(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.get_by_external_id.execute(
      new GetCreditApplicationByExternalIdRequest(external_id),
    );
    return CreditApplicationResponseDto.from(result);
  }

  @Patch(':externalId')
  @ApiOperation({ summary: 'Editar solicitud (parcial)' })
  @ApiOkResponse({ type: CreditApplicationResponseDto })
  async update_application(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body() dto: UpdateCreditApplicationDto,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.update.execute(
      new UpdateCreditApplicationByExternalIdRequest(
        external_id,
        dto.status,
        undefined,
        dto.partnerId,
        dto.partnerCategoryId,
        dto.businessId,
        dto.salesRepresentativeId,
        dto.isCurrentClient,
        undefined,
        dto.numberOfLocations,
        dto.numberOfEmployees,
        dto.businessSeniority,
        undefined,
        dto.businessFlagshipM2,
        dto.businessHasRent,
        dto.businessRentAmount,
        dto.monthlyIncome,
        dto.monthlyExpenses,
        dto.monthlyPurchases,
        dto.currentPurchases,
        dto.totalAssets,
        dto.requestedCreditLine,
        dto.submissionDate ? new Date(dto.submissionDate) : undefined,
        undefined,
        dto.rejectionReason,
      ),
    );
    return CreditApplicationResponseDto.from(result);
  }

  @Post(':externalId/pre-study')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Guardar estudio previo de la solicitud' })
  @ApiOkResponse({ type: CreditApplicationResponseDto })
  async save_study(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body() dto: SavePreStudyDto,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.save_pre_study.execute(
      new SaveCreditApplicationPreStudyRequest(
        external_id,
        dto.creditScore ?? null,
        dto.creditDecision ?? null,
        dto.riskProfile ?? null,
        dto.analystReport ?? null,
        dto.creditStudyDate ? new Date(dto.creditStudyDate) : null,
      ),
    );
    return CreditApplicationResponseDto.from(result);
  }

  @Post(':externalId/documents')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Subir documento a la solicitud' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['documentType', 'file'],
      properties: {
        documentType: { type: 'string', description: 'Tipo de documento (catálogo)' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload_doc(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body('documentType') document_type: string,
    @UploadedFile() file: MulterFile,
  ): Promise<{ documentId: string; url: string }> {
    const result = await this.upload_document.execute(
      new UploadCreditApplicationDocumentRequest(
        external_id,
        document_type,
        file.originalname,
        file.mimetype,
        file.buffer.toString('base64'),
      ),
    );
    return { documentId: result.documentId, url: result.url };
  }

  @Post(':externalId/approve')
  @HttpCode(HttpStatus.OK)
  @RequireRoles(Roles.BACK_OFFICE_ADMIN, Roles.BACK_OFFICE_ANALYST)
  @ApiOperation({ summary: 'Aprobar solicitud de cupo' })
  @ApiOkResponse({ type: CreditApplicationResponseDto })
  async approve_application(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body() dto: ApproveCreditApplicationDto,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.approve.execute(
      new ApproveCreditApplicationRequest(
        external_id,
        dto.approvedCreditLine,
        dto.analystReport,
      ),
    );
    return CreditApplicationResponseDto.from(result);
  }

  @Post(':externalId/reject')
  @HttpCode(HttpStatus.OK)
  @RequireRoles(Roles.BACK_OFFICE_ADMIN, Roles.BACK_OFFICE_ANALYST)
  @ApiOperation({ summary: 'Rechazar solicitud de cupo' })
  @ApiOkResponse({ type: CreditApplicationResponseDto })
  async reject_application(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body() dto: RejectCreditApplicationDto,
  ): Promise<CreditApplicationResponseDto> {
    const result = await this.reject.execute(
      new RejectCreditApplicationRequest(external_id, dto.rejectionReason),
    );
    return CreditApplicationResponseDto.from(result);
  }
}
