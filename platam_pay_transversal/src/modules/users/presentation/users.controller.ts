import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../domain/models/user.model';
import { UserResponseDto } from '../application/dto/user-response.dto';
import { CreateUserRequestDto } from '../application/dto/create-user-request.dto';
import { UpdateUserRequestDto } from '../application/dto/update-user-request.dto';
import {
  USERS_REPOSITORY,
  type UserRepositoryPort,
} from '../domain/ports/user.repository.port';

function toResponseDto(domain: User): UserResponseDto {
  const dto = new UserResponseDto();
  dto.externalId = domain.externalId;
  dto.cognitoSub = domain.cognitoSub;
  dto.email = domain.email;
  dto.phone = domain.phone;
  dto.roleId = domain.roleId;
  dto.statusId = domain.statusId;
  dto.lastLoginAt = domain.lastLoginAt?.toISOString() ?? null;
  dto.createdAt = domain.createdAt.toISOString();
  dto.updatedAt = domain.updatedAt.toISOString();
  return dto;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado',
    type: UserResponseDto,
  })
  async create(
    @Body() body: CreateUserRequestDto,
  ): Promise<UserResponseDto> {
    const created = await this.repository.create({
      cognitoSub: body.cognitoSub,
      email: body.email,
      phone: body.phone ?? null,
      roleId: body.roleId ?? null,
      statusId: body.statusId,
      lastLoginAt: body.lastLoginAt ? new Date(body.lastLoginAt) : null,
    });
    return toResponseDto(created);
  }

  @Get('register')
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: UserResponseDto,
    isArray: true,
  })
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repository.findAll();
    return users.map(toResponseDto);
  }

  @Get('register/:externalId')
  @ApiOperation({ summary: 'Obtener usuario por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID público del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<UserResponseDto> {
    const user = await this.repository.findByExternalId(externalId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return toResponseDto(user);
  }

  @Patch('register/:externalId')
  @ApiOperation({ summary: 'Actualizar usuario por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID público del usuario' })
  @ApiBody({ type: UpdateUserRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async updateByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
    @Body() body: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const updated = await this.repository.updateByExternalId(externalId, {
      cognitoSub: body.cognitoSub,
      email: body.email,
      phone: body.phone,
      roleId: body.roleId,
      statusId: body.statusId,
      lastLoginAt: body.lastLoginAt ? new Date(body.lastLoginAt) : undefined,
    });

    if (!updated) {
      throw new NotFoundException('User not found');
    }

    return toResponseDto(updated);
  }

  @Delete('register/:externalId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar usuario por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID público del usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado' })
  @ApiResponse({ status: 400, description: 'Formato UUID inválido' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async deleteByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.repository.deleteByExternalId(externalId);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
  }
}
