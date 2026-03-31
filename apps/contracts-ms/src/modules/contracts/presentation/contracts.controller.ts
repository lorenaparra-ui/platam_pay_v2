import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { CreateContractHttpDto } from './dto/create-contract-http.dto';
import { UpdateContractHttpDto } from './dto/update-contract-http.dto';
import { ListContractsQueryDto } from './dto/list-contracts-query.dto';
import { ContractPublicResponseDto } from './dto/contract-public-response.dto';
import { CreateContractUseCase } from '../application/use-cases/create-contract/create-contract.use-case';
import { GetContractByIdUseCase } from '../application/use-cases/get-contract-by-id/get-contract-by-id.use-case';
import { GetContractByExternalIdUseCase } from '../application/use-cases/get-contract-by-external-id/get-contract-by-external-id.use-case';
import { ListContractsUseCase } from '../application/use-cases/list-contracts/list-contracts.use-case';
import { UpdateContractByExternalIdUseCase } from '../application/use-cases/update-contract-by-external-id/update-contract-by-external-id.use-case';
import { DeleteContractByExternalIdUseCase } from '../application/use-cases/delete-contract-by-external-id/delete-contract-by-external-id.use-case';
import type { PaginatedResponseDto } from '@platam/shared';

@ApiTags('contracts')
@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly create_contract: CreateContractUseCase,
    private readonly get_by_id: GetContractByIdUseCase,
    private readonly get_by_external_id: GetContractByExternalIdUseCase,
    private readonly list_contracts: ListContractsUseCase,
    private readonly update_contract: UpdateContractByExternalIdUseCase,
    private readonly delete_contract: DeleteContractByExternalIdUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear contrato' })
  @ApiCreatedResponse({ type: ContractPublicResponseDto })
  async create(@Body() body: CreateContractHttpDto): Promise<ContractPublicResponseDto> {
    return this.create_contract.execute({
      external_id: body.external_id,
      user_external_id: body.user_external_id,
      application_external_id: body.application_external_id,
      contract_template_external_id: body.contract_template_external_id,
      status_external_id: body.status_external_id,
      zapsign_token: body.zapsign_token,
      original_file_url: body.original_file_url,
      signed_file_url: body.signed_file_url,
      form_answers_json: body.form_answers_json,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Listar contratos (paginado + filtros opcionales)' })
  @ApiOkResponse({ description: 'Listado paginado' })
  async list(
    @Query() query: ListContractsQueryDto,
  ): Promise<PaginatedResponseDto<ContractPublicResponseDto>> {
    return this.list_contracts.execute({
      offset: query.offset,
      limit: query.limit,
      user_id: query.user_id,
      credit_application_id: query.credit_application_id,
      status_external_id: query.status_external_id,
    });
  }

  @Get('by-external-id/:externalId')
  @ApiOperation({ summary: 'Obtener contrato por external_id' })
  @ApiOkResponse({ type: ContractPublicResponseDto })
  async getByExternalId(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) externalId: string,
  ): Promise<ContractPublicResponseDto> {
    return this.get_by_external_id.execute(externalId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener contrato por id interno' })
  @ApiOkResponse({ type: ContractPublicResponseDto })
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ContractPublicResponseDto> {
    return this.get_by_id.execute(id);
  }

  @Patch(':externalId')
  @ApiOperation({ summary: 'Actualizar contrato por external_id' })
  @ApiOkResponse({ type: ContractPublicResponseDto })
  async update(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) externalId: string,
    @Body() body: UpdateContractHttpDto,
  ): Promise<ContractPublicResponseDto> {
    return this.update_contract.execute(externalId, {
      application_external_id: body.application_external_id,
      contract_template_external_id: body.contract_template_external_id,
      status_external_id: body.status_external_id,
      zapsign_token: body.zapsign_token,
      original_file_url: body.original_file_url,
      signed_file_url: body.signed_file_url,
      form_answers_json: body.form_answers_json,
    });
  }

  @Delete(':externalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar contrato por external_id' })
  @ApiNoContentResponse()
  async remove(
    @Param('externalId', new ParseUUIDPipe({ version: '4' })) externalId: string,
  ): Promise<void> {
    await this.delete_contract.execute(externalId);
  }
}
