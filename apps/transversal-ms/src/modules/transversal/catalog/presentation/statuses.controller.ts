import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStatusUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/create-status.use-case';
import { GetStatusByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/get-status-by-external-id.use-case';
import { ListStatusesUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/list-statuses.use-case';
import { UpdateStatusByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/update-status-by-external-id.use-case';
import type { UpdateStatusPayload } from '@modules/transversal/catalog/application/use-cases/statuses/update-status-by-external-id.use-case';
import { DeleteStatusByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/statuses/delete-status-by-external-id.use-case';
import {
  CreateStatusBodyDto,
  ListStatusesQueryDto,
  PaginatedStatusesResponseDto,
  StatusResponseDto,
  UpdateStatusBodyDto,
} from './dto/statuses.api.dto';
import { to_status_response_dto } from './mappers/catalog-response.mappers';

@ApiTags('catalog-statuses')
@Controller('v1/catalog/statuses')
export class StatusesController {
  constructor(
    private readonly create_status: CreateStatusUseCase,
    private readonly get_status: GetStatusByExternalIdUseCase,
    private readonly list_statuses: ListStatusesUseCase,
    private readonly update_status: UpdateStatusByExternalIdUseCase,
    private readonly delete_status: DeleteStatusByExternalIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear estado de catálogo' })
  @ApiCreatedResponse({ type: StatusResponseDto })
  async create(@Body() body: CreateStatusBodyDto): Promise<StatusResponseDto> {
    const row = await this.create_status.execute({
      entity_type: body.entity_type,
      code: body.code,
      display_name: body.display_name,
      description: body.description ?? null,
      is_active: body.is_active ?? true,
    });
    return to_status_response_dto(row);
  }

  @Get()
  @ApiOperation({ summary: 'Listar estados (paginado, filtros opcionales)' })
  @ApiOkResponse({ type: PaginatedStatusesResponseDto })
  async list(
    @Query() query: ListStatusesQueryDto,
  ): Promise<PaginatedStatusesResponseDto> {
    const result = await this.list_statuses.execute({
      page: query.page,
      limit: query.limit,
      entity_type: query.entity_type,
      code_contains: query.code_contains,
      display_name_contains: query.display_name_contains,
      is_active: query.is_active,
    });
    return {
      items: result.items.map((s) => to_status_response_dto(s)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':external_id')
  @ApiOperation({ summary: 'Obtener estado por external_id (UUID)' })
  @ApiOkResponse({ type: StatusResponseDto })
  async get(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<StatusResponseDto> {
    const row = await this.get_status.execute(external_id);
    return to_status_response_dto(row);
  }

  @Patch(':external_id')
  @ApiOperation({ summary: 'Actualizar estado por external_id' })
  @ApiOkResponse({ type: StatusResponseDto })
  async update(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
    @Body() body: UpdateStatusBodyDto,
  ): Promise<StatusResponseDto> {
    const payload: UpdateStatusPayload = {};
    if (body.entity_type !== undefined) {
      payload.entity_type = body.entity_type;
    }
    if (body.code !== undefined) {
      payload.code = body.code;
    }
    if (body.display_name !== undefined) {
      payload.display_name = body.display_name;
    }
    if (body.description !== undefined) {
      payload.description = body.description;
    }
    if (body.is_active !== undefined) {
      payload.is_active = body.is_active;
    }
    const row = await this.update_status.execute(external_id, payload);
    return to_status_response_dto(row);
  }

  @Delete(':external_id')
  @HttpCode(204)
  @ApiOperation({
    summary:
      'Eliminar estado si no está referenciado por datos operativos (usuarios, solicitudes, etc.)',
  })
  @ApiNoContentResponse()
  async remove(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<void> {
    await this.delete_status.execute(external_id);
  }
}
