import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreatePartnerOrchestratorUseCase } from '@modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case';
import { UpdatePartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case';
import type { PartnerOnboardingUploadedFile } from '@modules/partners/application/ports/partner-onboarding-files.port';
import {
  PARTNER_ONBOARDING_FILES_PORT,
  type PartnerOnboardingFilesPort,
} from '@modules/partners/application/ports/partner-onboarding-files.port';
import { CreatePartnerPayloadDto } from './dto/create-partner-payload.dto';
import { CreatePartnerOrchestratorResponseDto } from './dto/create-partner-orchestrator-response.dto';
import { UpdatePartnerPayloadDto } from './dto/update-partner-payload.dto';
import { map_create_partner_payload_to_command } from './mappers/create-partner-payload.mapper';
import { map_orchestrator_result_to_http } from './mappers/create-partner-orchestrator-response.mapper';
import {
  map_update_partner_payload_to_request,
  type UpdatePartnerUrlMerge,
} from './mappers/update-partner-payload.mapper';
import {
  assert_update_partner_payload_supported,
  update_payload_has_partner_changes,
} from './guards/update-partner-payload-supported.guard';
import type { UploadedMultipartFile } from './types/multer-file.type';

type PartnerMultipartFiles = {
  bankCertification?: UploadedMultipartFile[];
  logo?: UploadedMultipartFile[];
  coBranding?: UploadedMultipartFile[];
};

type SuppliersMsConfig = {
  readonly partner_onboarding: {
    readonly default_country_code: string;
  };
};


@ApiTags('partners')
@ApiExtraModels(
  CreatePartnerPayloadDto,
  UpdatePartnerPayloadDto,
)
@Controller('partners')
export class PartnersController {
  constructor(
    private readonly create_partner_orchestrator: CreatePartnerOrchestratorUseCase,
    private readonly update_partner: UpdatePartnerByExternalIdUseCase,
    private readonly config_service: ConfigService,
    @Inject(PARTNER_ONBOARDING_FILES_PORT)
    private readonly partner_files: PartnerOnboardingFilesPort,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Alta orquestada de partner (saga + SQS)',
   
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        payload: {
          type: 'string'
        },
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

    const app_config = this.config_service.get<SuppliersMsConfig>('config');
    const command = map_create_partner_payload_to_command(dto, {
      country_code:
        (app_config?.partner_onboarding?.default_country_code ?? 'CO').trim() ||
        null,
    });

    const uploaded = this.to_uploaded_meta(files);

    const result = await this.create_partner_orchestrator.execute(command, {
      bank_certification: uploaded.bank_certification,
      logo: uploaded.logo,
      co_branding: uploaded.co_branding,
    });

    return map_orchestrator_result_to_http(result);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar partner (parcial)',
    description:
      'Multipart opcional; `payload` es JSON **camelCase** **parcial**: todas las claves raíz (`operatingUser`, `business`, `partner`, `bankAccount`, `creditFacility`, `category`) son opcionales. ' +
      '**Reglas actuales:** solo se persisten campos de `partner` y URLs finales de `logo` / `coBranding` (archivos multipart o `logoUrl` / `coBrandingLogoUrl`). ' +
      'Cualquier otra sección con valores definidos → **501 Not Implemented**. ' +
      'Debe haber al menos un cambio en `partner` o subida de logo/coBranding. ' +
      '`bankCertification` en PATCH → 501. Ver `UpdatePartnerPayloadDto` en Swagger para forma de cada sección cuando se habiliten.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        payload: {
          type: 'string',
          description:
            'JSON parcial opcional, camelCase; mismas secciones que POST pero todas opcionales (UpdatePartnerPayloadDto). Soporte persistido hoy: solo `partner` (+ logos).',
        },
        bankCertification: { type: 'string', format: 'binary' },
        logo: { type: 'string', format: 'binary' },
        coBranding: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOkResponse({
    description: 'Entidad partner actualizada (campos públicos).',
  })
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
    const raw = payload_raw?.trim() ?? '';
    if (raw.length > 0) {
      try {
        patch = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        throw new BadRequestException('payload debe ser JSON válido');
      }
    }

    const dto = plainToInstance(UpdatePartnerPayloadDto, patch, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(dto, { forbidUnknownValues: false });
    if (errors.length > 0) {
      const message = errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('; ');
      throw new BadRequestException(message);
    }

    assert_update_partner_payload_supported(dto);

    const uploaded = this.to_uploaded_meta(files);

    if (this.multipart_has_binary(uploaded.bank_certification)) {
      throw new HttpException(
        'La actualización de certificación bancaria por PATCH no está implementada',
        HttpStatus.NOT_IMPLEMENTED,
      );
    }

    const has_logo_file = this.multipart_has_binary(uploaded.logo);
    const has_cob_file = this.multipart_has_binary(uploaded.co_branding);
    const partner_dirty = update_payload_has_partner_changes(dto);

    if (!partner_dirty && !has_logo_file && !has_cob_file) {
      throw new BadRequestException(
        'Sin cambios: indique campos en partner, logo o coBranding (JSON o archivo)',
      );
    }

    let logo_merge: string | null | undefined = dto.partner?.logoUrl;
    let co_branding_merge: string | null | undefined =
      dto.partner?.coBrandingLogoUrl;

    if (has_logo_file || has_cob_file) {
      const urls = await this.partner_files.resolve_urls({
        correlation_id: file_correlation_id,
        idempotency_key: file_correlation_id,
        bank_certification: undefined,
        logo: uploaded.logo,
        co_branding: uploaded.co_branding,
      });
      if (has_logo_file) {
        logo_merge = urls.logo_url.length > 0 ? urls.logo_url : null;
      }
      if (has_cob_file) {
        co_branding_merge =
          urls.co_branding_url.length > 0 ? urls.co_branding_url : null;
      }
    }

    const urls_for_request: UpdatePartnerUrlMerge = {
      logo_url: logo_merge,
      co_branding_logo_url: co_branding_merge,
    };

    const req = map_update_partner_payload_to_request(id, dto, urls_for_request);
    return this.update_partner.execute(req);
  }

  private multipart_has_binary(
    f: PartnerOnboardingUploadedFile | undefined,
  ): boolean {
    return (
      f !== undefined &&
      typeof f.content_base64 === 'string' &&
      f.content_base64.trim().length > 0
    );
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
