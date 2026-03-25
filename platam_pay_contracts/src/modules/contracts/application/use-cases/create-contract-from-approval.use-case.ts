import { Inject, Injectable } from "@nestjs/common";
import type { Contract } from "@contracts/domain/models/contract.model";
import type { ContractSigner } from "@contracts/domain/models/contract-signer.model";
import {
  CONTRACT_REPOSITORY,
  type ContractRepositoryPort,
} from "@contracts/domain/ports/contract.repository.port";
import {
  CONTRACT_SIGNER_REPOSITORY,
  type ContractSignerRepositoryPort,
} from "@contracts/domain/ports/contract-signer.repository.port";
import {
  SIGNATURE_PROVIDER,
  type SignatureProviderPort,
} from "@contracts/domain/ports/signature-provider.port";
import type { CreateContractFromApprovalInput } from "../dto/create-contract-from-approval.input";

export interface CreateContractFromApprovalOutput {
  contract: Contract;
  signer: ContractSigner;
  providerResponse: Record<string, unknown>;
}

@Injectable()
export class CreateContractFromApprovalUseCase {
  constructor(
    @Inject(SIGNATURE_PROVIDER)
    private readonly signatureProvider: SignatureProviderPort,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: ContractRepositoryPort,
    @Inject(CONTRACT_SIGNER_REPOSITORY)
    private readonly contractSignerRepository: ContractSignerRepositoryPort,
  ) {}

  async execute(
    input: CreateContractFromApprovalInput,
  ): Promise<CreateContractFromApprovalOutput> {
    const dynamicReplacements = this.buildReplacements(input);
    if (dynamicReplacements.length === 0) {
      throw new Error("Debe enviar replacements o templateData para la plantilla");
    }

    const signatureResult = await this.signatureProvider.createDocumentFromTemplate({
      templateId: input.templateId,
      folderPath: input.folderPath,
      sandbox: input.sandbox,
      signerName: input.signerName,
      signerEmail: input.signerEmail,
      signerPhoneCountry: input.signerPhoneCountry,
      signerPhoneNumber: input.signerPhoneNumber,
      replacements: dynamicReplacements,
    });

    const contract = await this.contractRepository.create({
      userId: input.userId,
      applicationId: input.applicationId,
      providerToken: signatureResult.providerDocumentToken,
      statusId: input.contractPendingStatusId,
      originalFileUrl: signatureResult.originalFileUrl,
      formAnswersJson: signatureResult.rawResponse,
    });

    const signer = await this.contractSignerRepository.create({
      contractId: contract.id,
      personId: input.personId,
      providerSignerToken: signatureResult.signer.providerSignerToken,
      signUrl: signatureResult.signer.signUrl,
      statusId: input.signerPendingStatusId,
    });

    return {
      contract,
      signer,
      providerResponse: signatureResult.rawResponse,
    };
  }

  private buildReplacements(
    input: CreateContractFromApprovalInput,
  ): Array<{ from: string; to: string }> {
    const replacementMap = new Map<string, string>();

    const templateDataEntries = Object.entries(input.templateData ?? {});
    for (const [rawKey, rawValue] of templateDataEntries) {
      if (rawValue == null) continue;
      const normalizedValue = String(rawValue);
      for (const variant of this.variableNameVariants(rawKey)) {
        if (!replacementMap.has(variant)) {
          replacementMap.set(variant, normalizedValue);
        }
      }
    }

    // Los replacements explicitos tienen prioridad sobre los dinamicos.
    for (const replacement of input.replacements ?? []) {
      replacementMap.set(replacement.from, replacement.to);
    }

    return [...replacementMap.entries()].map(([from, to]) => ({ from, to }));
  }

  private variableNameVariants(rawKey: string): string[] {
    const cleaned = rawKey
      .replaceAll("{{", "")
      .replaceAll("}}", "")
      .trim()
      .replace(/\s+/g, " ");

    const noAccents = cleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const snakeCase = noAccents
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    const spacedFromSnake = snakeCase.replace(/_/g, " ");

    const baseVariants = [
      cleaned,
      cleaned.toUpperCase(),
      cleaned.toLowerCase(),
      noAccents,
      noAccents.toUpperCase(),
      noAccents.toLowerCase(),
      snakeCase,
      spacedFromSnake,
      spacedFromSnake.toUpperCase(),
      spacedFromSnake.toLowerCase(),
    ];

    const accentAwareVariants = baseVariants.flatMap((value) => [
      value,
      this.applyAccentWordAliases(value),
    ]);

    const withBraces = accentAwareVariants.flatMap((value) => [
      value,
      `{{${value}}}`,
      `{{ ${value} }}`,
    ]);

    return withBraces.filter(
      (value, index, array) => value.length > 0 && array.indexOf(value) === index,
    );
  }

  private applyAccentWordAliases(value: string): string {
    const aliases: Record<string, string> = {
      NUMERO: "NÚMERO",
      ELECTRONICO: "ELECTRÓNICO",
      DIRECCION: "DIRECCIÓN",
      TELEFONO: "TELÉFONO",
      IDENTIFICACION: "IDENTIFICACIÓN",
    };

    let transformed = value;
    for (const [plain, accented] of Object.entries(aliases)) {
      transformed = transformed
        .replaceAll(plain, accented)
        .replaceAll(plain.toLowerCase(), accented.toLowerCase());
    }
    return transformed;
  }
}
