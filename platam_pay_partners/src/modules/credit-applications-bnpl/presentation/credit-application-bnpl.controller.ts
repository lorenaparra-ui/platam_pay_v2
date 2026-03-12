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
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateCreditApplicationBnplUseCase } from "../application/use-cases/create-credit-application-bnpl.use-case";
import { GetCreditApplicationBnplByExternalIdUseCase } from "../application/use-cases/get-credit-application-bnpl-by-external-id.use-case";
import { ListCreditApplicationsBnplUseCase } from "../application/use-cases/list-credit-applications-bnpl.use-case";
import { UpdateCreditApplicationBnplUseCase } from "../application/use-cases/update-credit-application-bnpl.use-case";
import { DeleteCreditApplicationBnplUseCase } from "../application/use-cases/delete-credit-application-bnpl.use-case";
import { CreateCreditApplicationBnplRequestDto } from "../application/dto/create-credit-application-bnpl-request.dto";
import { UpdateCreditApplicationBnplRequestDto } from "../application/dto/update-credit-application-bnpl-request.dto";
import { CreditApplicationBnplResponseDto } from "../application/dto/credit-application-bnpl-response.dto";

@ApiTags("credit-applications-bnpl")
@Controller("credit-applications-bnpl")
export class CreditApplicationBnplController {
  constructor(
    private readonly createUseCase: CreateCreditApplicationBnplUseCase,
    private readonly getByExternalIdUseCase: GetCreditApplicationBnplByExternalIdUseCase,
    private readonly listUseCase: ListCreditApplicationsBnplUseCase,
    private readonly updateUseCase: UpdateCreditApplicationBnplUseCase,
    private readonly deleteUseCase: DeleteCreditApplicationBnplUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: "Crear solicitud de crédito BNPL" })
  @ApiBody({ type: CreateCreditApplicationBnplRequestDto })
  @ApiResponse({
    status: 201,
    description: "Solicitud creada",
    type: CreditApplicationBnplResponseDto,
  })
  @ApiResponse({ status: 400, description: "Body inválido" })
  async create(
    @Body() body: CreateCreditApplicationBnplRequestDto,
  ): Promise<CreditApplicationBnplResponseDto> {
    return this.createUseCase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: "Listar solicitudes de crédito BNPL" })
  @ApiResponse({
    status: 200,
    description: "Lista de solicitudes",
    type: CreditApplicationBnplResponseDto,
    isArray: true,
  })
  async findAll(): Promise<CreditApplicationBnplResponseDto[]> {
    return this.listUseCase.execute();
  }

  @Get(":externalId")
  @ApiOperation({ summary: "Obtener solicitud por externalId" })
  @ApiParam({ name: "externalId", description: "UUID de la solicitud" })
  @ApiResponse({
    status: 200,
    description: "Solicitud encontrada",
    type: CreditApplicationBnplResponseDto,
  })
  @ApiResponse({ status: 400, description: "Formato UUID inválido" })
  @ApiResponse({ status: 404, description: "Solicitud no encontrada" })
  async findByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<CreditApplicationBnplResponseDto> {
    const result = await this.getByExternalIdUseCase.execute(externalId);
    if (!result) {
      throw new NotFoundException("Solicitud de crédito BNPL no encontrada");
    }
    return result;
  }

  @Patch(":externalId")
  @ApiOperation({ summary: "Actualizar solicitud por externalId" })
  @ApiParam({ name: "externalId", description: "UUID de la solicitud" })
  @ApiBody({ type: UpdateCreditApplicationBnplRequestDto })
  @ApiResponse({
    status: 200,
    description: "Solicitud actualizada",
    type: CreditApplicationBnplResponseDto,
  })
  @ApiResponse({ status: 400, description: "Formato UUID o body inválido" })
  @ApiResponse({ status: 404, description: "Solicitud no encontrada" })
  async updateByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
    @Body() body: UpdateCreditApplicationBnplRequestDto,
  ): Promise<CreditApplicationBnplResponseDto> {
    const result = await this.updateUseCase.execute(externalId, body);
    if (!result) {
      throw new NotFoundException("Solicitud de crédito BNPL no encontrada");
    }
    return result;
  }

  @Delete(":externalId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Eliminar solicitud por externalId" })
  @ApiParam({ name: "externalId", description: "UUID de la solicitud" })
  @ApiResponse({ status: 204, description: "Solicitud eliminada" })
  @ApiResponse({ status: 400, description: "Formato UUID inválido" })
  @ApiResponse({ status: 404, description: "Solicitud no encontrada" })
  async deleteByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<void> {
    const deleted = await this.deleteUseCase.execute(externalId);
    if (!deleted) {
      throw new NotFoundException("Solicitud de crédito BNPL no encontrada");
    }
  }
}
