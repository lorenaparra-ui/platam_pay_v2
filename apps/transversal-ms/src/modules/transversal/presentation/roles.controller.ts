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
import { CreateRoleUseCase } from '@modules/transversal/application/use-cases/roles/create-role.use-case';
import { GetRoleByExternalIdUseCase } from '@modules/transversal/application/use-cases/roles/get-role-by-external-id.use-case';
import { ListRolesUseCase } from '@modules/transversal/application/use-cases/roles/list-roles.use-case';
import { UpdateRoleByExternalIdUseCase } from '@modules/transversal/application/use-cases/roles/update-role-by-external-id.use-case';
import { DeleteRoleByExternalIdUseCase } from '@modules/transversal/application/use-cases/roles/delete-role-by-external-id.use-case';
import type { UpdateRoleProps } from '@modules/transversal/domain/models/role.models';
import {
  CreateRoleBodyDto,
  PaginatedRolesResponseDto,
  RoleResponseDto,
  UpdateRoleBodyDto,
  ListRolesQueryDto,
} from './dto/roles.api.dto';
import { to_role_response_dto } from './mappers/catalog-response.mappers';

@ApiTags('roles')
@Controller('v1/roles')
export class RolesController {
  constructor(
    private readonly create_role: CreateRoleUseCase,
    private readonly get_role: GetRoleByExternalIdUseCase,
    private readonly list_roles: ListRolesUseCase,
    private readonly update_role: UpdateRoleByExternalIdUseCase,
    private readonly delete_role: DeleteRoleByExternalIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear rol' })
  @ApiCreatedResponse({ type: RoleResponseDto })
  async create(@Body() body: CreateRoleBodyDto): Promise<RoleResponseDto> {
    const role = await this.create_role.execute({
      name: body.name,
      description: body.description ?? null,
    });
    return to_role_response_dto(role);
  }

  @Get()
  @ApiOperation({ summary: 'Listar roles (paginado)' })
  @ApiOkResponse({ type: PaginatedRolesResponseDto })
  async list(
    @Query() query: ListRolesQueryDto,
  ): Promise<PaginatedRolesResponseDto> {
    const result = await this.list_roles.execute({
      page: query.page,
      limit: query.limit,
      name_contains: query.name_contains,
    });
    return {
      items: result.items.map((r) => to_role_response_dto(r)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':external_id')
  @ApiOperation({ summary: 'Obtener rol por external_id (UUID)' })
  @ApiOkResponse({ type: RoleResponseDto })
  async get(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<RoleResponseDto> {
    const role = await this.get_role.execute(external_id);
    return to_role_response_dto(role);
  }

  @Patch(':external_id')
  @ApiOperation({ summary: 'Actualizar rol por external_id' })
  @ApiOkResponse({ type: RoleResponseDto })
  async update(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
    @Body() body: UpdateRoleBodyDto,
  ): Promise<RoleResponseDto> {
    const patch: UpdateRoleProps = {};
    if (body.name !== undefined) {
      patch.name = body.name;
    }
    if (body.description !== undefined) {
      patch.description = body.description;
    }
    const role = await this.update_role.execute(external_id, patch);
    return to_role_response_dto(role);
  }

  @Delete(':external_id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar rol (si no está asignado a usuarios)' })
  @ApiNoContentResponse()
  async remove(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<void> {
    await this.delete_role.execute(external_id);
  }
}
