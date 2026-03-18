import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetCitiesUseCase } from '../application/use-cases/get-cities.use-case';
import { CityResponseDto } from '../application/dto/city-response.dto';
import { CountryResponseDto } from '../application/dto/country-response.dto';

@ApiTags('Transversal - Cities')
@Controller('transversal/cities')
export class CityController {
  constructor(private readonly getCitiesUseCase: GetCitiesUseCase) {}

  @Get('countries')
  @ApiOperation({ summary: 'Obtener lista de países disponibles (sin duplicados)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de países con al menos una ciudad',
    type: [CountryResponseDto],
  })
  async getCountries(): Promise<CountryResponseDto[]> {
    return this.getCitiesUseCase.executeCountries();
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las ciudades o filtrar por país/estado' })
  @ApiQuery({ name: 'countryCode', required: false, description: 'Código ISO del país (2 caracteres)' })
  @ApiQuery({ name: 'countryName', required: false, description: 'Nombre del país' })
  @ApiQuery({ name: 'stateName', required: false, description: 'Nombre del estado/departamento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de ciudades',
    type: [CityResponseDto],
  })
  async findAll(
    @Query('countryCode') countryCode?: string,
    @Query('countryName') countryName?: string,
    @Query('stateName') stateName?: string,
  ): Promise<CityResponseDto[]> {
    if (countryCode && stateName) {
      return this.getCitiesUseCase.executeByCountryAndState(countryCode, stateName);
    }
    if (countryCode && countryName) {
      return this.getCitiesUseCase.executeByCountryCodeAndName(countryCode, countryName);
    }
    if (countryCode) {
      return this.getCitiesUseCase.executeByCountryCode(countryCode);
    }
    if (countryName) {
      return this.getCitiesUseCase.executeByCountryName(countryName);
    }
    return this.getCitiesUseCase.execute();
  }

  @Get(':externalId')
  @ApiOperation({ summary: 'Obtener una ciudad por su ID externo' })
  @ApiParam({ name: 'externalId', description: 'UUID de la ciudad' })
  @ApiResponse({
    status: 200,
    description: 'Ciudad encontrada',
    type: CityResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Ciudad no encontrada' })
  async findByExternalId(
    @Param('externalId') externalId: string,
  ): Promise<CityResponseDto> {
    const city = await this.getCitiesUseCase.executeByExternalId(externalId);
    if (!city) {
      throw new NotFoundException(`Ciudad con externalId ${externalId} no encontrada`);
    }
    return city;
  }
}
