import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSalesRepresentativeUseCase } from '@modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case';
import { CreateSalesRepresentativeRequest } from '@modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.request';
import { GetSalesRepresentativeByExternalIdUseCase } from '@modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case';
import { GetSalesRepresentativeByExternalIdRequest } from '@modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.request';
import { ListSalesRepresentativesUseCase } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case';
import { ListSalesRepresentativesRequest } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.request';
import { UpdateSalesRepresentativeByExternalIdUseCase } from '@modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case';
import { UpdateSalesRepresentativeUserByExternalIdRequest } from '@modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.request';
import { DeleteSalesRepresentativeByExternalIdUseCase } from '@modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case';
import { DeleteSalesRepresentativeByExternalIdRequest } from '@modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.request';
import { CreateSalesRepresentativeBodyDto } from './dto/create-sales-representative-body.dto';
import { PatchSalesRepresentativeBodyDto } from './dto/patch-sales-representative-body.dto';
import { ListSalesRepresentativesQueryDto } from './dto/list-sales-representatives-query.dto';
import { SalesRepresentativeResponseDto } from './dto/sales-representative-response.dto';

@ApiTags('sales-representatives')
@ApiExtraModels(
  CreateSalesRepresentativeBodyDto,
  PatchSalesRepresentativeBodyDto,
  SalesRepresentativeResponseDto,
)
@Controller('sales-representatives')
export class SalesRepresentativesController {
  constructor(
    private readonly create_sales_representative: CreateSalesRepresentativeUseCase,
    private readonly get_by_external_id: GetSalesRepresentativeByExternalIdUseCase,
    private readonly list_sales_representatives: ListSalesRepresentativesUseCase,
    private readonly update_by_external_id: UpdateSalesRepresentativeByExternalIdUseCase,
    private readonly delete_by_external_id: DeleteSalesRepresentativeByExternalIdUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar representantes de ventas',
    description:
      'Lista todos los representantes, o filtra por `partner_external_id` si se envía en query.',
  })
  @ApiOkResponse({ type: [SalesRepresentativeResponseDto] })
  async list(
    @Query() query: ListSalesRepresentativesQueryDto,
  ): Promise<SalesRepresentativeResponseDto[]> {
    return this.list_sales_representatives.execute(
      new ListSalesRepresentativesRequest(query.partner_external_id),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear representante de ventas' })
  @ApiCreatedResponse({ type: SalesRepresentativeResponseDto })
  async create(
    @Body() body: CreateSalesRepresentativeBodyDto,
  ): Promise<SalesRepresentativeResponseDto> {
    return this.create_sales_representative.execute(
      new CreateSalesRepresentativeRequest(
        body.partner_external_id,
        body.user_external_id,
      ),
    );
  }

  @Get(':external_id')
  @ApiOperation({ summary: 'Obtener representante por external_id' })
  @ApiOkResponse({ type: SalesRepresentativeResponseDto })
  async get_one(
    @Param('external_id', new ParseUUIDPipe({ version: '4' })) external_id: string,
  ): Promise<SalesRepresentativeResponseDto> {
    return this.get_by_external_id.execute(
      new GetSalesRepresentativeByExternalIdRequest(external_id),
    );
  }

  @Patch(':external_id')
  @ApiOperation({
    summary: 'Actualizar vínculo de usuario del representante',
    description:
      'Envíe `user_external_id` (UUID) o `null` para desvincular. El campo debe incluirse en el cuerpo.',
  })
  @ApiOkResponse({ type: SalesRepresentativeResponseDto })
  async patch(
    @Param('external_id', new ParseUUIDPipe({ version: '4' })) external_id: string,
    @Body() body: PatchSalesRepresentativeBodyDto,
  ): Promise<SalesRepresentativeResponseDto> {
    return this.update_by_external_id.execute(
      new UpdateSalesRepresentativeUserByExternalIdRequest(
        external_id,
        body.user_external_id,
      ),
    );
  }

  @Delete(':external_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar representante por external_id' })
  @ApiNoContentResponse()
  async remove(
    @Param('external_id', new ParseUUIDPipe({ version: '4' })) external_id: string,
  ): Promise<void> {
    await this.delete_by_external_id.execute(
      new DeleteSalesRepresentativeByExternalIdRequest(external_id),
    );
  }
}
