import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetStatusesUseCase } from '../application/use-cases/get-statuses.use-case';
import { StatusResponseDto } from '../application/dto/status-response.dto';

@ApiTags('Transversal - Statuses')
@Controller('transversal/statuses')
export class StatusController {
  constructor(private readonly getStatusesUseCase: GetStatusesUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los statuses o filtrar por entity_type' })
  @ApiQuery({
    name: 'entityType',
    required: false,
    description: 'Tipo de entidad para filtrar (ej: onboarding, credit_application)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de statuses',
    type: [StatusResponseDto],
  })
  async findAll(
    @Query('entityType') entityType?: string,
  ): Promise<StatusResponseDto[]> {
    if (entityType) {
      return this.getStatusesUseCase.executeByEntityType(entityType);
    }
    return this.getStatusesUseCase.execute();
  }

  @Get(':externalId')
  @ApiOperation({ summary: 'Obtener un status por su ID externo' })
  @ApiParam({ name: 'externalId', description: 'UUID del status' })
  @ApiResponse({
    status: 200,
    description: 'Status encontrado',
    type: StatusResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Status no encontrado' })
  async findByExternalId(
    @Param('externalId') externalId: string,
  ): Promise<StatusResponseDto> {
    const status = await this.getStatusesUseCase.executeByExternalId(externalId);
    if (!status) {
      throw new NotFoundException(`Status con externalId ${externalId} no encontrado`);
    }
    return status;
  }

  @Get('entity/:entityType/code/:code')
  @ApiOperation({ summary: 'Obtener un status por entity_type y código' })
  @ApiParam({ name: 'entityType', description: 'Tipo de entidad' })
  @ApiParam({ name: 'code', description: 'Código del status' })
  @ApiResponse({
    status: 200,
    description: 'Status encontrado',
    type: StatusResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Status no encontrado' })
  async findByEntityTypeAndCode(
    @Param('entityType') entityType: string,
    @Param('code') code: string,
  ): Promise<StatusResponseDto> {
    const status = await this.getStatusesUseCase.executeByEntityTypeAndCode(entityType, code);
    if (!status) {
      throw new NotFoundException(
        `Status con entityType ${entityType} y código ${code} no encontrado`,
      );
    }
    return status;
  }
}
