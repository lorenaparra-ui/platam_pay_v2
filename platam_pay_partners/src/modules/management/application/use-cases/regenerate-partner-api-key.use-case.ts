import { Inject, Injectable } from "@nestjs/common";
import {
  PARTNERS_REPOSITORY,
  type PartnerRepositoryPort,
} from "@partners/domain/ports/partner.repository.port";
import { ApiKeyService } from "../services/api-key.service";

@Injectable()
export class RegeneratePartnerApiKeyUseCase {
  constructor(
    @Inject(PARTNERS_REPOSITORY)
    private readonly repository: PartnerRepositoryPort,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async execute(
    externalId: string,
  ): Promise<{ updated: boolean; apiKey: string }> {
    const { apiKey, apiKeyHash } =
      await this.apiKeyService.generateApiKeyAndHash();
    const updated = await this.repository.setApiKeyHashByExternalId(
      externalId,
      apiKeyHash,
    );

    return { updated, apiKey };
  }
}
