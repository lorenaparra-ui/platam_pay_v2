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
import { CreateCityUseCase } from '@modules/transversal/catalog/application/use-cases/cities/create-city.use-case';
import { GetCityByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/cities/get-city-by-external-id.use-case';
import { ListCitiesUseCase } from '@modules/transversal/catalog/application/use-cases/cities/list-cities.use-case';
import { UpdateCityByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/cities/update-city-by-external-id.use-case';
import type { UpdateCityPayload } from '@modules/transversal/catalog/application/use-cases/cities/update-city-by-external-id.use-case';
import { DeleteCityByExternalIdUseCase } from '@modules/transversal/catalog/application/use-cases/cities/delete-city-by-external-id.use-case';
import {
  CityResponseDto,
  CreateCityBodyDto,
  ListCitiesQueryDto,
  PaginatedCitiesResponseDto,
  UpdateCityBodyDto,
} from './dto/cities.api.dto';
import { to_city_response_dto } from './mappers/catalog-response.mappers';

@ApiTags('catalog-cities')
@Controller('v1/catalog/cities')
export class CitiesController {
  constructor(
    private readonly create_city: CreateCityUseCase,
    private readonly get_city: GetCityByExternalIdUseCase,
    private readonly list_cities: ListCitiesUseCase,
    private readonly update_city: UpdateCityByExternalIdUseCase,
    private readonly delete_city: DeleteCityByExternalIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear ciudad' })
  @ApiCreatedResponse({ type: CityResponseDto })
  async create(@Body() body: CreateCityBodyDto): Promise<CityResponseDto> {
    const city = await this.create_city.execute({
      country_name: body.country_name,
      country_code: body.country_code,
      state_name: body.state_name,
      state_code: body.state_code ?? null,
      city_name: body.city_name,
      currency_external_id: body.currency_external_id,
    });
    return to_city_response_dto(city);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ciudades (paginado, filtros opcionales)' })
  @ApiOkResponse({ type: PaginatedCitiesResponseDto })
  async list(
    @Query() query: ListCitiesQueryDto,
  ): Promise<PaginatedCitiesResponseDto> {
    const result = await this.list_cities.execute({
      page: query.page,
      limit: query.limit,
      country_code: query.country_code,
      state_name: query.state_name,
      city_name_contains: query.city_name_contains,
    });
    return {
      items: result.items.map((c) => to_city_response_dto(c)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get(':external_id')
  @ApiOperation({ summary: 'Obtener ciudad por external_id (UUID)' })
  @ApiOkResponse({ type: CityResponseDto })
  async get(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<CityResponseDto> {
    const city = await this.get_city.execute(external_id);
    return to_city_response_dto(city);
  }

  @Patch(':external_id')
  @ApiOperation({ summary: 'Actualizar ciudad por external_id' })
  @ApiOkResponse({ type: CityResponseDto })
  async update(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
    @Body() body: UpdateCityBodyDto,
  ): Promise<CityResponseDto> {
    const payload: UpdateCityPayload = {};
    if (body.country_name !== undefined) {
      payload.country_name = body.country_name;
    }
    if (body.country_code !== undefined) {
      payload.country_code = body.country_code;
    }
    if (body.state_name !== undefined) {
      payload.state_name = body.state_name;
    }
    if (body.state_code !== undefined) {
      payload.state_code = body.state_code;
    }
    if (body.city_name !== undefined) {
      payload.city_name = body.city_name;
    }
    if (body.currency_external_id !== undefined) {
      payload.currency_external_id = body.currency_external_id;
    }
    const city = await this.update_city.execute(external_id, payload);
    return to_city_response_dto(city);
  }

  @Delete(':external_id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Eliminar ciudad si no está referenciada por personas ni negocios',
  })
  @ApiNoContentResponse()
  async remove(
    @Param('external_id', new ParseUUIDPipe({ version: '4' }))
    external_id: string,
  ): Promise<void> {
    await this.delete_city.execute(external_id);
  }
}
