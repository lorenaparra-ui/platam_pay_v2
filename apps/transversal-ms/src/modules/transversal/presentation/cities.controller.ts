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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCityUseCase } from '@modules/transversal/application/use-cases/cities/create-city.use-case';
import { GetCityByExternalIdUseCase } from '@modules/transversal/application/use-cases/cities/get-city-by-external-id.use-case';
import { ListCitiesUseCase } from '@modules/transversal/application/use-cases/cities/list-cities.use-case';
import { ListDistinctCountriesUseCase } from '@modules/transversal/application/use-cases/cities/list-distinct-countries.use-case';
import { UpdateCityByExternalIdUseCase } from '@modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case';
import type { UpdateCityPayload } from '@modules/transversal/application/use-cases/cities/update-city-by-external-id.use-case';
import { DeleteCityByExternalIdUseCase } from '@modules/transversal/application/use-cases/cities/delete-city-by-external-id.use-case';
import {
  CityResponseDto,
  CountryCatalogItemDto,
  CreateCityBodyDto,
  ListCitiesQueryDto,
  ListCountriesQueryDto,
  PaginatedCitiesResponseDto,
  UpdateCityBodyDto,
} from './dto/cities.api.dto';
import { to_city_response_dto } from './mappers/catalog-response.mappers';

@ApiTags('cities')
@Controller('v1/cities')
export class CitiesController {
  constructor(
    private readonly create_city: CreateCityUseCase,
    private readonly get_city: GetCityByExternalIdUseCase,
    private readonly list_cities: ListCitiesUseCase,
    private readonly list_countries: ListDistinctCountriesUseCase,
    private readonly update_city: UpdateCityByExternalIdUseCase,
    private readonly delete_city: DeleteCityByExternalIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear ciudad' })
  @ApiCreatedResponse({ type: CityResponseDto })
  async create(@Body() body: CreateCityBodyDto): Promise<CityResponseDto> {
    const city = await this.create_city.execute({
      country_name: body.countryName,
      country_code: body.countryCode,
      state_name: body.stateName,
      state_code: body.stateCode ?? null,
      city_name: body.cityName,
      currency_external_id: body.currencyExternalId,
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
      country_code: query.countryCode,
      state_name: query.stateName,
      city_name_contains: query.cityNameContains,
    });
    return {
      items: result.items.map((c) => to_city_response_dto(c)),
      total: result.total,
      page: result.page,
      limit: result.limit,
    };
  }

  @Get('countries')
  @ApiOperation({
    summary: 'Listar países del catálogo (sin repetir nombre)',
    description:
      'Deriva países únicos (`country_name` + `country_code`) desde `transversal_schema.cities`. Opcionalmente filtra por subcadena del nombre del país.',
  })
  @ApiOkResponse({ type: [CountryCatalogItemDto] })
  async list_countries_endpoint(
    @Query() query: ListCountriesQueryDto,
  ): Promise<CountryCatalogItemDto[]> {
    const rows = await this.list_countries.execute({
      country_name_contains: query.countryNameContains,
    });
    return rows.map((r) => ({
      countryName: r.country_name,
      countryCode: r.country_code,
    }));
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
    if (body.countryName !== undefined) {
      payload.country_name = body.countryName;
    }
    if (body.countryCode !== undefined) {
      payload.country_code = body.countryCode;
    }
    if (body.stateName !== undefined) {
      payload.state_name = body.stateName;
    }
    if (body.stateCode !== undefined) {
      payload.state_code = body.stateCode;
    }
    if (body.cityName !== undefined) {
      payload.city_name = body.cityName;
    }
    if (body.currencyExternalId !== undefined) {
      payload.currency_external_id = body.currencyExternalId;
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
