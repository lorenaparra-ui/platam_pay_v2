import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSalesRepresentativeRequestDto } from '../application/dto/create-sales-representative-request.dto';
import { CreateSalesRepresentativeUseCase } from '../application/use-cases/create-sales-representative.use-case';
import {
  SALES_REPRESENTATIVE_REPOSITORY,
  type SalesRepresentativeRepositoryPort,
} from '../domain/ports/sales-representative.repository.port';

@ApiTags('sales-representatives')
@Controller('sales-representatives')
export class SalesRepresentativesController {
  constructor(
    private readonly createSalesRepresentativeUseCase: CreateSalesRepresentativeUseCase,
    @Inject(SALES_REPRESENTATIVE_REPOSITORY)
    private readonly repository: SalesRepresentativeRepositoryPort,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear asesor comercial asociado a un partner' })
  @ApiBody({ type: CreateSalesRepresentativeRequestDto })
  @ApiResponse({ status: 201, description: 'Representante creado' })
  @ApiResponse({ status: 409, description: 'Usuario ya asignado a otro rep' })
  async create(@Body() body: CreateSalesRepresentativeRequestDto) {
    return this.createSalesRepresentativeUseCase.execute(body);
  }

  @Get('by-partner/:partnerId')
  @ApiOperation({ summary: 'Listar representantes por partner' })
  @ApiParam({ name: 'partnerId', type: Number })
  @ApiResponse({ status: 200, description: 'Lista de representantes' })
  async listByPartner(@Param('partnerId', ParseIntPipe) partnerId: number) {
    return this.repository.findByPartnerId(partnerId);
  }
}
