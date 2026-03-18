import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Patch,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePersonsRequestDto } from '../application/dto/create-persons-request.dto';
import { Person } from '../domain/models/person.model';
import { PersonResponseDto } from '../application/dto/person-response.dto';
import { UpdatePersonsRequestDto } from '../application/dto/update-persons-request.dto';
import {
  PERSONS_REPOSITORY,
  type PersonRepositoryPort,
} from '../domain/ports/person.repository.port';
import { GetPersonsUseCase } from '../application/use-cases/person/get-persons.use-case';
import { GetPersonByExternalIdUseCase } from '../application/use-cases/person/get-person-by-external-id.use-case';
import { CreatePersonUseCase } from '../application/use-cases/person/create-person.use-case';

function toDateOnlyString(value: Date | string | null): string | null {
  if (!value) return null;
  if (typeof value === 'string') {
    return value.includes('T') ? value.split('T')[0] : value;
  }
  return value.toISOString().split('T')[0];
}

function toIsoString(value: Date | string): string {
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
  }
  return value.toISOString();
}

function toDateOrUndefined(value?: string): Date | undefined {
  return value ? new Date(value) : undefined;
}

function toResponseDto(person: Person): PersonResponseDto {
  const dto = new PersonResponseDto();
  dto.externalId = person.externalId;
  dto.countryCode = person.countryCode;
  dto.firstName = person.firstName;
  dto.lastName = person.lastName;
  dto.docType = person.docType;
  dto.docNumber = person.docNumber;
  dto.docIssueDate = toDateOnlyString(person.docIssueDate);
  dto.birthDate = toDateOnlyString(person.birthDate);
  dto.gender = person.gender;
  dto.phone = person.phone;
  dto.residentialAddress = person.residentialAddress;
  dto.businessAddress = person.businessAddress;
  dto.createdAt = toIsoString(person.createdAt);
  dto.updatedAt = toIsoString(person.updatedAt);
  return dto;
}

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(
    @Inject(PERSONS_REPOSITORY)
    private readonly repository: PersonRepositoryPort,
    private readonly getPersonsUseCase: GetPersonsUseCase,
    private readonly getPersonByExternalIdUseCase: GetPersonByExternalIdUseCase,
    private readonly createPersonUseCase: CreatePersonUseCase,
  ) {}

  @Get('register')
  @ApiOperation({ summary: 'Listar personas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de personas',
    type: PersonResponseDto,
    isArray: true,
  })
  async findAll(): Promise<PersonResponseDto[]> {
    const persons = await this.getPersonsUseCase.execute();
    return persons.map(toResponseDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Crear persona' })
  @ApiBody({ type: CreatePersonsRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Persona creada',
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Body invalido' })
  async create(
    @Body() body: CreatePersonsRequestDto,
  ): Promise<PersonResponseDto> {
    const created = await this.createPersonUseCase.execute(body);
    return toResponseDto(created);
  }

  @Get('register/:externalId')
  @ApiOperation({ summary: 'Obtener persona por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID publico de la persona' })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada',
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato UUID invalido' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async findByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<PersonResponseDto> {
    const person = await this.getPersonByExternalIdUseCase.execute(externalId);
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return toResponseDto(person);
  }

  @Patch('register/:externalId')
  @ApiOperation({ summary: 'Actualizar persona por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID publico de la persona' })
  @ApiBody({ type: UpdatePersonsRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada',
    type: PersonResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Formato UUID o body invalido' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async updateByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
    @Body() body: UpdatePersonsRequestDto,
  ): Promise<PersonResponseDto> {
    const updated = await this.repository.updateByExternalId(externalId, {
      userId: body.userId,
      countryCode: body.countryCode,
      firstName: body.firstName,
      lastName: body.lastName,
      docType: body.docType,
      docNumber: body.docNumber,
      docIssueDate: toDateOrUndefined(body.docIssueDate),
      birthDate: toDateOrUndefined(body.birthDate),
      gender: body.gender,
      phone: body.phone,
      residentialAddress: body.residentialAddress,
      businessAddress: body.businessAddress,
      cityId: body.cityId,
    });
    if (!updated) {
      throw new NotFoundException('Person not found');
    }
    return toResponseDto(updated);
  }

  @Delete('register/:externalId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Eliminar persona por externalId' })
  @ApiParam({ name: 'externalId', description: 'UUID publico de la persona' })
  @ApiResponse({ status: 204, description: 'Persona eliminada' })
  @ApiResponse({ status: 400, description: 'Formato UUID invalido' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada' })
  async deleteByExternalId(
    @Param('externalId', ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.repository.deleteByExternalId(externalId);
    if (!deleted) {
      throw new NotFoundException('Person not found');
    }
  }
}
