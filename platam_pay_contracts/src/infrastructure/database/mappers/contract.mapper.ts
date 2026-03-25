import { ContractEntity } from "@libs/database";
import type {
  CreateContractInput,
  MarkContractSignedInput,
} from "@contracts/domain/ports/contract.repository.port";
import type { Contract } from "@contracts/domain/models/contract.model";

export class ContractMapper {
  static toDomain(entity: ContractEntity): Contract {
    return {
      id: Number(entity.id),
      externalId: entity.externalId,
      userId: Number(entity.userId),
      applicationId:
        entity.applicationId != null ? Number(entity.applicationId) : null,
      providerToken: entity.zapsignToken,
      statusId: Number(entity.statusId),
      originalFileUrl: entity.originalFileUrl,
      signedFileUrl: entity.signedFileUrl,
      formAnswersJson: entity.formAnswersJson,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateEntity(input: CreateContractInput): ContractEntity {
    const entity = new ContractEntity();
    entity.userId = input.userId;
    entity.applicationId = input.applicationId ?? null;
    entity.zapsignToken = input.providerToken ?? null;
    entity.statusId = input.statusId;
    entity.originalFileUrl = input.originalFileUrl ?? null;
    entity.signedFileUrl = input.signedFileUrl ?? null;
    entity.formAnswersJson = input.formAnswersJson ?? null;
    return entity;
  }

  static applySignedData(
    entity: ContractEntity,
    input: MarkContractSignedInput,
  ): ContractEntity {
    entity.statusId = input.statusId;
    entity.signedFileUrl = input.signedFileUrl ?? null;
    entity.formAnswersJson = input.formAnswersJson ?? null;
    return entity;
  }
}
