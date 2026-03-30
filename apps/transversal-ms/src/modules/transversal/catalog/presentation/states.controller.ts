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
import { CreateStateUseCase } from '@modules/transversal/catalog/application/use-cases/states/create-state.use-case';
import { GetStateByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/states/get-state-by-external-id.use-case';
import { ListStatesUseCase } from '@modules/transversal/catalog/application/use-cases/states/list-states.use-case';
import { UpdateStateByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/states/update-state-by-external-id.use-case';
import { DeleteStateByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/states/delete-state-by-external-id.use-case';
import type { UpdateStateProps } from '@modules/transversal/catalog/domain/models/state.models';
import {
  CreateStateBodyDto,
  ListStatesQueryDto,
  PaginatedStatesResponseDto,
  StateResponseDto,
  UpdateStateBodyDto,
} from './dto/states.api.dto';
import { to_state_response_dto } from './mappers/catalog-response.mappers';

@ApiTags('catalog-states')
@Controller('v1/catalog/states')
export class StatesController {
  constructor(
    private readonly create_state: CreateStateUseCase,
    private readonly get_state: GetStateByExternalIdUseCase,
    private readonly list_states: ListStatesUseCase,
    private readonly update_state: UpdateStateByExternalIdUseCase,
    private readonly delete_state: DeleteStateByExternalIdUseCase,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear estado/departamento (tabla transversal_schema.states)',
  })
  @ApiCreatedResponse({ type: StateResponseDto })
  async create(@Body() body: CreateStateBodyDto): Promise<StateResponseDto> {
    const state = await this.create_state.execute({
      country_code: body.country_code,
      state_name: body.state_name,
      state_code: body.state_code ?? null,
    });
    return to_state_response_dto(state);
  }

  @Get()
  @ApiOperation({ summary: 'Listar estados (paginado)' })
  @ApiOkResponse({ type: PaginatedStatesResponseDto })
  async list(
    @Query() query: ListStatesQueryDto,
  ): Promise<PaginatedStatesResponseDto> {
    const result = await this.list_states.execute({
      page: query.page,
      limit: query.limit,
      country_code: query.country_code,
      state_name_contains: query.state_name_contains,
    });
    return {
      items: result.items.map((s) => to_state_response_dto(s)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':external_id')
  @ApiOperation({ summary: 'Obtener estado por external_id (UUID)' })
  @ApiOkResponse({ type: StateResponseDto })
  async get(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<StateResponseDto> {
    const state = await this.get_state.execute(external_id);
    return to_state_response_dto(state);
  }

  @Patch(':external_id')
  @ApiOperation({ summary: 'Actualizar estado por external_id' })
  @ApiOkResponse({ type: StateResponseDto })
  async update(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
    @Body() body: UpdateStateBodyDto,
  ): Promise<StateResponseDto> {
    const patch: UpdateStateProps = {};
    if (body.country_code !== undefined) {
      patch.country_code = body.country_code;
    }
    if (body.state_name !== undefined) {
      patch.state_name = body.state_name;
    }
    if (body.state_code !== undefined) {
      patch.state_code = body.state_code;
    }
    const state = await this.update_state.execute(external_id, patch);
    return to_state_response_dto(state);
  }

  @Delete(':external_id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar estado' })
  @ApiNoContentResponse()
  async remove(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<void> {
    await this.delete_state.execute(external_id);
  }
}
