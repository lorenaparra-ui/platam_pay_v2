import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { CreateBusinessUseCase } from '../application/use-cases/create-business.use-case';
import { GetBusinessByExternalIdUseCase } from '../application/use-cases/get-business-by-external-id.use-case';
import { ListBusinessesUseCase } from '../application/use-cases/list-businesses.use-case';
import { UpdateBusinessUseCase } from '../application/use-cases/update-business.use-case';
import { DeleteBusinessUseCase } from '../application/use-cases/delete-business.use-case';
import { CreateBusinessRequestDto } from '../application/dto/create-business-request.dto';
import { UpdateBusinessRequestDto } from '../application/dto/update-business-request.dto';
import { BusinessResponseDto } from '../application/dto/business-response.dto';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessController {
  constructor(
    private readonly createBusinessUseCase: CreateBusinessUseCase,
    private readonly getBusinessByExternalIdUseCase: GetBusinessByExternalIdUseCase,
    private readonly listBusinessesUseCase: ListBusinessesUseCase,
    private readonly updateBusinessUseCase: UpdateBusinessUseCase,
    private readonly deleteBusinessUseCase: DeleteBusinessUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear negocio' })
  @ApiBody({ type: CreateBusinessRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Negocio creado',
    type: BusinessResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Body inválido' })
  async create(@Body() body: CreateBusinessRequestDto): Promise<BusinessResponseDto> {
    return this.createBusinessUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar negocios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de negocios',
    type: BusinessResponseDto,
    isArray: true,
  })
  async findAll(): Promise<BusinessResponseDto[]> {
    return this.listBusinessesUseCase.execute();
  }

  @Get(':externalId')
  @ApiOperation({ summary: 'Obtener negocio por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID del negocio' })
  @ApiResponse({
    status: 200,
    description: 'Negocio encontrado',
    type: BusinessResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato UUID inválido' })
  @ApiResponse({ status: 404, description: 'Negocio no encontrado' })
  async findByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<BusinessResponseDto> {
    const result = await this.getBusinessByExternalIdUseCase.execute(externalId);
    if (!result) {
      throw new NotFoundException('Negocio no encontrado');
    }
    return result;
  }

  @Patch(':externalId')
  @ApiOperation({ summary: 'Actualizar negocio por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID del negocio' })
  @ApiBody({ type: UpdateBusinessRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Negocio actualizado',
    type: BusinessResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato UUID o body inválido' })
  @ApiResponse({ status: 404, description: 'Negocio no encontrado' })
  async updateByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
    @Body() body: UpdateBusinessRequestDto,
  ): Promise<BusinessResponseDto> {
    const result = await this.updateBusinessUseCase.execute(externalId, body);
    if (!result) {
      throw new NotFoundException('Negocio no encontrado');
    }
    return result;
  }

  @Delete(':externalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar negocio por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID del negocio' })
  @ApiResponse({ status: 204, description: 'Negocio eliminado' })
  @ApiResponse({ status: 400, description: 'Formato UUID inválido' })
  @ApiResponse({ status: 404, description: 'Negocio no encontrado' })
  async deleteByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.deleteBusinessUseCase.execute(externalId);
    if (!deleted) {
      throw new NotFoundException('Negocio no encontrado');
    }
  }
}
