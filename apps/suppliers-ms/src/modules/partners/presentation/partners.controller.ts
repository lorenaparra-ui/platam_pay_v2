import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreatePartnerOrchestratorUseCase } from '@modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case';
import { UpdatePartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case';
import { UpdatePartnerByExternalIdRequest } from '@modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request';
import type { PartnerOnboardingUploadedFile } from '@modules/partners/application/ports/partner-onboarding-files.port';
import {
  PARTNER_ONBOARDING_FILES_PORT,
  type PartnerOnboardingFilesPort,
} from '@modules/partners/application/ports/partner-onboarding-files.port';
import { CreatePartnerPayloadDto } from './dto/create-partner-payload.dto';
import { CreatePartnerOrchestratorResponseDto } from './dto/create-partner-orchestrator-response.dto';
import { map_create_partner_payload_to_command } from './mappers/create-partner-payload.mapper';
import { map_orchestrator_result_to_http } from './mappers/create-partner-orchestrator-response.mapper';
import type { UploadedMultipartFile } from './types/multer-file.type';

type PartnerMultipartFiles = {
  bankCertification?: UploadedMultipartFile[];
  logo?: UploadedMultipartFile[];
  coBranding?: UploadedMultipartFile[];
};

@ApiTags('partners')
@Controller('partners')
export class PartnersController {
  constructor(
    private readonly create_partner_orchestrator: CreatePartnerOrchestratorUseCase,
    private readonly update_partner: UpdatePartnerByExternalIdUseCase,
    @Inject(PARTNER_ONBOARDING_FILES_PORT)
    private readonly partner_files: PartnerOnboardingFilesPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Alta orquestada de partner (saga + SQS)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Campo `payload` (JSON string) + archivos opcionales bankCertification, logo, coBranding',
    schema: {
      type: 'object',
      properties: {
        payload: { type: 'string', description: 'JSON CreatePartnerPayloadDto' },
        bankCertification: { type: 'string', format: 'binary' },
        logo: { type: 'string', format: 'binary' },
        coBranding: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bankCertification', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
      { name: 'coBranding', maxCount: 1 },
    ]),
  )
  async create(
    @Body('payload') payload_raw: string,
    @UploadedFiles() files: PartnerMultipartFiles,
  ): Promise<CreatePartnerOrchestratorResponseDto> {
    let parsed: unknown;
    try {
      parsed = JSON.parse(payload_raw) as unknown;
    } catch {
      throw new BadRequestException('payload debe ser JSON válido');
    }

    const dto = plainToInstance(CreatePartnerPayloadDto, parsed, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      throw new BadRequestException(message);
    }

    const command = map_create_partner_payload_to_command(dto);
    const uploaded = this.to_uploaded_meta(files);

    const result = await this.create_partner_orchestrator.execute(command, {
      bank_certification: uploaded.bank_certification,
      logo: uploaded.logo,
      co_branding: uploaded.co_branding,
    });

    return map_orchestrator_result_to_http(result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar partner (multipart opcional para logos)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bankCertification', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
      { name: 'coBranding', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body('payload') payload_raw: string | undefined,
    @UploadedFiles() files: PartnerMultipartFiles,
  ): Promise<unknown> {
    const file_correlation_id = randomUUID();
    let patch: Record<string, unknown> = {};
    if (payload_raw !== undefined && payload_raw.length > 0) {
      try {
        patch = JSON.parse(payload_raw) as Record<string, unknown>;
      } catch {
        throw new BadRequestException('payload debe ser JSON válido');
      }
    }

    const uploaded = this.to_uploaded_meta(files);
    let logo_url: string | null | undefined =
      patch.logoUrl === null || patch.logoUrl === undefined
        ? undefined
        : String(patch.logoUrl);
    let co_branding_url: string | null | undefined =
      patch.coBrandingUrl === null || patch.coBrandingUrl === undefined
        ? undefined
        : String(patch.coBrandingUrl);

    if (
      uploaded.logo !== undefined ||
      uploaded.co_branding !== undefined ||
      uploaded.bank_certification !== undefined
    ) {
      const urls = await this.partner_files.resolve_urls({
        correlation_id: file_correlation_id,
        idempotency_key: file_correlation_id,
        bank_certification: uploaded.bank_certification,
        logo: uploaded.logo,
        co_branding: uploaded.co_branding,
      });
      if (uploaded.logo !== undefined) {
        logo_url = urls.logo_url;
      }
      if (uploaded.co_branding !== undefined) {
        co_branding_url = urls.co_branding_url;
      }
    }
  return {
    logo_url,
    co_branding_url,
  }
    
  }

  private to_uploaded_meta(files: PartnerMultipartFiles): Readonly<{
    bank_certification?: PartnerOnboardingUploadedFile;
    logo?: PartnerOnboardingUploadedFile;
    co_branding?: PartnerOnboardingUploadedFile;
  }> {
    const first = (arr: UploadedMultipartFile[] | undefined) => arr?.[0];
    const meta = (
      f: UploadedMultipartFile | undefined,
    ): PartnerOnboardingUploadedFile | undefined =>
      f === undefined
        ? undefined
        : {
            originalname: f.originalname,
            mimetype: f.mimetype,
            size: f.size,
            content_base64:
              f.buffer !== undefined && f.buffer.length > 0
                ? f.buffer.toString('base64')
                : undefined,
          };
    return {
      bank_certification: meta(first(files.bankCertification)),
      logo: meta(first(files.logo)),
      co_branding: meta(first(files.coBranding)),
    };
  }
}
