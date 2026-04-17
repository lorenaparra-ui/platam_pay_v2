"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const shared_1 = require("../../../../../../libs/shared/src");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const shared_2 = require("../../../../../../libs/shared/src");
const require_roles_decorator_1 = require("../../auth/presentation/decorators/require-roles.decorator");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_partner_orchestrator_use_case_1 = require("../application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case");
const get_partner_by_external_id_use_case_1 = require("../application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case");
const get_partner_by_external_id_request_1 = require("../application/use-cases/get-partner-by-external-id/get-partner-by-external-id.request");
const update_partner_by_external_id_use_case_1 = require("../application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case");
const partner_onboarding_files_port_1 = require("../application/ports/partner-onboarding-files.port");
const partner_onboarding_saga_repository_port_1 = require("../application/ports/partner-onboarding-saga.repository.port");
const create_partner_payload_dto_1 = require("./dto/create-partner-payload.dto");
const get_partner_query_dto_1 = require("./dto/get-partner-query.dto");
const partner_public_camel_response_dto_1 = require("./dto/partner-public-camel-response.dto");
const update_partner_payload_dto_1 = require("./dto/update-partner-payload.dto");
const create_partner_payload_mapper_1 = require("./mappers/create-partner-payload.mapper");
const update_partner_payload_mapper_1 = require("./mappers/update-partner-payload.mapper");
let PartnersController = class PartnersController {
    get_partner;
    create_partner_orchestrator;
    update_partner;
    config_service;
    partner_files;
    saga_repository;
    constructor(get_partner, create_partner_orchestrator, update_partner, config_service, partner_files, saga_repository) {
        this.get_partner = get_partner;
        this.create_partner_orchestrator = create_partner_orchestrator;
        this.update_partner = update_partner;
        this.config_service = config_service;
        this.partner_files = partner_files;
        this.saga_repository = saga_repository;
    }
    async get_by_external_id_query(query) {
        const res = await this.get_partner.execute(new get_partner_by_external_id_request_1.GetPartnerByExternalIdRequest(query.externalId));
        return partner_public_camel_response_dto_1.PartnerPublicCamelResponseDto.from(res);
    }
    async create(payload_raw, files) {
        let parsed;
        try {
            parsed = JSON.parse(payload_raw);
        }
        catch {
            throw new common_1.BadRequestException('payload debe ser JSON válido');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_partner_payload_dto_1.CreatePartnerPayloadDto, parsed, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            throw new common_1.BadRequestException(message);
        }
        const app_config = this.config_service.get('config');
        const command = (0, create_partner_payload_mapper_1.map_create_partner_payload_to_command)(dto, {
            country_code: (app_config?.partner_onboarding?.default_country_code ?? 'CO').trim() || null,
        });
        const uploaded = this.to_uploaded_meta(files);
        const saga_id = await this.create_partner_orchestrator.start_async(command, {
            bank_certification: uploaded.bank_certification,
            logo: uploaded.logo,
            co_branding: uploaded.co_branding,
        });
        return {
            saga_id,
            status: 'RUNNING',
            message: `Saga iniciada. Consulta el estado en GET /partners/sagas/${saga_id}`,
        };
    }
    async get_saga_status(saga_id) {
        const saga = await this.saga_repository.find_by_external_id(saga_id);
        if (!saga) {
            throw new common_1.NotFoundException('saga not found');
        }
        return saga;
    }
    async update(id, payload_raw, files) {
        const file_correlation_id = (0, shared_1.new_uuid)();
        let patch = {};
        const raw = payload_raw?.trim() ?? '';
        if (raw.length > 0) {
            try {
                patch = JSON.parse(raw);
            }
            catch {
                throw new common_1.BadRequestException('payload debe ser JSON válido');
            }
        }
        const dto = (0, class_transformer_1.plainToInstance)(update_partner_payload_dto_1.UpdatePartnerPayloadDto, patch, {
            enableImplicitConversion: true,
        });
        const errors = (0, class_validator_1.validateSync)(dto, { forbidUnknownValues: false });
        if (errors.length > 0) {
            const message = errors
                .map((e) => Object.values(e.constraints ?? {}).join(', '))
                .join('; ');
            throw new common_1.BadRequestException(message);
        }
        const uploaded = this.to_uploaded_meta(files);
        if (this.multipart_has_binary(uploaded.bank_certification)) {
            throw new common_1.HttpException('La actualización de certificación bancaria por PATCH no está implementada', common_1.HttpStatus.NOT_IMPLEMENTED);
        }
        const has_logo_file = this.multipart_has_binary(uploaded.logo);
        const has_cob_file = this.multipart_has_binary(uploaded.co_branding);
        let logo_merge = dto.partner?.logoUrl;
        let co_branding_merge = dto.partner?.coBrandingLogoUrl;
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
                co_branding_merge = urls.co_branding_url.length > 0 ? urls.co_branding_url : null;
            }
        }
        const urls_for_request = {
            logo_url: logo_merge,
            co_branding_logo_url: co_branding_merge,
        };
        const req = (0, update_partner_payload_mapper_1.map_update_partner_payload_to_request)(id, dto, urls_for_request);
        return this.update_partner.execute(req);
    }
    multipart_has_binary(f) {
        return (f !== undefined &&
            typeof f.content_base64 === 'string' &&
            f.content_base64.trim().length > 0);
    }
    to_uploaded_meta(files) {
        const first = (arr) => arr?.[0];
        const meta = (f) => f === undefined
            ? undefined
            : {
                originalname: f.originalname,
                mimetype: f.mimetype,
                size: f.size,
                content_base64: f.buffer !== undefined && f.buffer.length > 0
                    ? f.buffer.toString('base64')
                    : undefined,
            };
        return {
            bank_certification: meta(first(files.bankCertification)),
            logo: meta(first(files.logo)),
            co_branding: meta(first(files.coBranding)),
        };
    }
};
exports.PartnersController = PartnersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener partner por externalId',
        description: 'Query obligatorio `externalId` (UUID v4). Retorna campos públicos con nombres en camelCase.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Partner encontrado',
        type: partner_public_camel_response_dto_1.PartnerPublicCamelResponseDto,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_partner_query_dto_1.GetPartnerQueryDto]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "get_by_external_id_query", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({
        summary: 'Alta orquestada de partner (saga async + SQS)',
        description: 'Inicia la saga en segundo plano. Retorna 202 con `saga_id`. ' +
            'Consultar `GET /partners/sagas/{sagaId}` para obtener el resultado y estado.',
    }),
    (0, swagger_1.ApiAcceptedResponse)({
        description: 'Saga iniciada. Consultar /partners/sagas/:sagaId para el estado.',
        schema: {
            type: 'object',
            properties: {
                saga_id: { type: 'string', format: 'uuid' },
                status: { type: 'string', example: 'RUNNING' },
                message: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                payload: { type: 'string' },
                bankCertification: { type: 'string', format: 'binary' },
                logo: { type: 'string', format: 'binary' },
                coBranding: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'bankCertification', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'coBranding', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)('payload')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('sagas/:sagaId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Estado de una saga de onboarding de partner',
        description: 'Retorna el estado, paso actual y datos creados de la saga. ' +
            'Cuando status=COMPLETED, partner_external_id y credit_facility_external_id están disponibles.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Estado de la saga',
    }),
    __param(0, (0, common_1.Param)('sagaId', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "get_saga_status", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar partner (parcial)',
        description: 'Multipart opcional; `payload` es JSON **camelCase** **parcial**. ' +
            'Solo se persisten campos de `partner` y URLs finales de `logo` / `coBranding`. ' +
            '`bankCertification` en PATCH → 501.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                payload: { type: 'string' },
                bankCertification: { type: 'string', format: 'binary' },
                logo: { type: 'string', format: 'binary' },
                coBranding: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Entidad partner actualizada (campos públicos).' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'bankCertification', maxCount: 1 },
        { name: 'logo', maxCount: 1 },
        { name: 'coBranding', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __param(1, (0, common_1.Body)('payload')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PartnersController.prototype, "update", null);
exports.PartnersController = PartnersController = __decorate([
    (0, swagger_1.ApiTags)('partners'),
    (0, swagger_1.ApiBearerAuth)('cognito-access-token'),
    (0, swagger_1.ApiExtraModels)(create_partner_payload_dto_1.CreatePartnerPayloadDto, update_partner_payload_dto_1.UpdatePartnerPayloadDto, get_partner_query_dto_1.GetPartnerQueryDto, partner_public_camel_response_dto_1.PartnerPublicCamelResponseDto),
    (0, common_1.Controller)('partners'),
    (0, require_roles_decorator_1.RequireRoles)(shared_2.Roles.BACK_OFFICE_ADMIN, shared_2.Roles.BACK_OFFICE_ANALYST),
    __param(4, (0, common_1.Inject)(partner_onboarding_files_port_1.PARTNER_ONBOARDING_FILES_PORT)),
    __param(5, (0, common_1.Inject)(partner_onboarding_saga_repository_port_1.PARTNER_ONBOARDING_SAGA_REPOSITORY)),
    __metadata("design:paramtypes", [get_partner_by_external_id_use_case_1.GetPartnerByExternalIdUseCase,
        create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase,
        update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
        config_1.ConfigService, Object, Object])
], PartnersController);
//# sourceMappingURL=partners.controller.js.map