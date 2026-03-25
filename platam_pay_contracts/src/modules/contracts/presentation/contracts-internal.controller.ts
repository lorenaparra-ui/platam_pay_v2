import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { CreateContractFromApprovalUseCase } from "@contracts/application/use-cases/create-contract-from-approval.use-case";
import { MarkContractSignedUseCase } from "@contracts/application/use-cases/mark-contract-signed.use-case";
import { CancelContractUseCase } from "@contracts/application/use-cases/cancel-contract.use-case";
import { FindContractByExternalIdUseCase } from "@contracts/application/use-cases/find-contract-by-external-id.use-case";
import {
  CancelContractRequestDto,
  CancelContractResponseDto,
  CreateContractFromApprovalInput,
  CreateContractFromApprovalResponseDto,
  FindContractByExternalIdResponseDto,
  MarkContractSignedInput,
  MarkContractSignedResponseDto,
} from "@contracts/application/dto";

@ApiTags("contracts-internal")
@Controller("internal/contracts")
export class ContractsInternalController {
  constructor(
    private readonly createContractFromApprovalUseCase: CreateContractFromApprovalUseCase,
    private readonly markContractSignedUseCase: MarkContractSignedUseCase,
    private readonly cancelContractUseCase: CancelContractUseCase,
    private readonly findContractByExternalIdUseCase: FindContractByExternalIdUseCase,
  ) {}

  @Post("from-approval")
  @ApiOperation({
    summary: "INTERNAL ONLY: crear contrato y signer desde aprobacion",
    description:
      "Endpoint interno para pruebas operativas y documentacion Swagger.",
  })
  @ApiBody({
    type: CreateContractFromApprovalInput,
    examples: {
      templateDataRecommended: {
        summary: "Recomendado: usar templateData dinamico",
        value: {
          userId: 1001,
          applicationId: 3911,
          personId: 2204,
          contractPendingStatusId: 25,
          signerPendingStatusId: 16,
          templateId: "e59a30f8-bf2a-45ef-bcb7-91d38558c24b",
          folderPath: "platam_pay",
          sandbox: true,
          signerName: "FREDDY CANDELO",
          signerEmail: "freddy@platam.co",
          signerPhoneCountry: "57",
          signerPhoneNumber: "3105003975",
          templateData: {
            p_id: "3911",
            NOMBRES: "FREDDY",
            APELLIDOS: "CANDELO",
            "TIPO DE DOCUMENTO": "CC",
            "NUMERO DE DOCUMENTO": "1111111111",
            "CORREO ELECTRONICO": "freddy@platam.co",
            CELULAR: "3105003975",
          },
        },
      },
      replacementsCompatibility: {
        summary: "Compatibilidad: replacements explicitos",
        value: {
          userId: 1001,
          applicationId: 3911,
          personId: 2204,
          contractPendingStatusId: 25,
          signerPendingStatusId: 16,
          templateId: "e59a30f8-bf2a-45ef-bcb7-91d38558c24b",
          folderPath: "platam_pay",
          sandbox: true,
          signerName: "FREDDY CANDELO",
          signerEmail: "freddy@platam.co",
          signerPhoneCountry: "57",
          signerPhoneNumber: "3105003975",
          replacements: [
            {
              from: "NOMBRE COMPLETO",
              to: "FREDDY CANDELO",
            },
          ],
        },
      },
    },
  })
  @ApiOkResponse({ type: CreateContractFromApprovalResponseDto })
  async createFromApproval(
    @Body() body: CreateContractFromApprovalInput,
  ): Promise<CreateContractFromApprovalResponseDto> {
    const result = await this.createContractFromApprovalUseCase.execute(body);
    return {
      contractExternalId: result.contract.externalId,
      signerExternalId: result.signer.externalId,
      providerDocumentToken: result.contract.providerToken ?? "",
      providerSignerToken: result.signer.providerSignerToken,
      signUrl: result.signer.signUrl,
      contractStatusId: result.contract.statusId,
      signerStatusId: result.signer.statusId,
    };
  }

  @Post("webhooks/signed")
  @ApiOperation({
    summary: "INTERNAL ONLY: procesar evento signed del proveedor",
    description:
      "Endpoint interno para pruebas del flujo webhook sin exponer API publica.",
  })
  @ApiBody({ type: MarkContractSignedInput })
  @ApiOkResponse({ type: MarkContractSignedResponseDto })
  async handleSignedWebhook(
    @Body() body: MarkContractSignedInput,
  ): Promise<MarkContractSignedResponseDto> {
    const processed = await this.markContractSignedUseCase.execute(body);
    return { processed };
  }

  @Post("cancel")
  @ApiOperation({
    summary: "INTERNAL ONLY: cancelar contrato en proveedor y BD",
  })
  @ApiBody({ type: CancelContractRequestDto })
  @ApiOkResponse({ type: CancelContractResponseDto })
  async cancelContract(
    @Body() body: CancelContractRequestDto,
  ): Promise<CancelContractResponseDto> {
    await this.cancelContractUseCase.execute(
      body.contractExternalId,
      body.cancelledStatusId,
    );
    return {
      contractExternalId: body.contractExternalId,
      status: "cancelled",
    };
  }

  @Get(":externalId")
  @ApiOperation({
    summary: "INTERNAL ONLY: obtener contrato por externalId",
  })
  @ApiParam({
    name: "externalId",
    description: "UUID publico del contrato",
  })
  @ApiOkResponse({ type: FindContractByExternalIdResponseDto })
  async findContractByExternalId(
    @Param("externalId", ParseUUIDPipe) externalId: string,
  ): Promise<FindContractByExternalIdResponseDto | null> {
    const result = await this.findContractByExternalIdUseCase.execute(externalId);
    if (!result) {
      return null;
    }

    return {
      contractExternalId: result.contract.externalId,
      providerDocumentToken: result.contract.providerToken,
      contractStatusId: result.contract.statusId,
      originalFileUrl: result.contract.originalFileUrl,
      signedFileUrl: result.contract.signedFileUrl,
      providerDocumentStatus: result.providerDocumentStatus,
      synchronizedWithProvider: result.synchronizedWithProvider,
      signer: result.signer
        ? {
            externalId: result.signer.externalId,
            providerSignerToken: result.signer.providerSignerToken,
            signUrl: result.signer.signUrl,
            ipAddress: result.signer.ipAddress,
            geoLatitude: result.signer.geoLatitude,
            geoLongitude: result.signer.geoLongitude,
            signedAt: result.signer.signedAt,
          }
        : null,
    };
  }
}
