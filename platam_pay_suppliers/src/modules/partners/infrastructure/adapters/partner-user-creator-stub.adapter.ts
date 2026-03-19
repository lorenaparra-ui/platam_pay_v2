import { Injectable, Logger } from "@nestjs/common";
import type { PartnerUserCreatorPort } from "@partners/application/ports/partner-user-creator.port";

@Injectable()
export class PartnerUserCreatorStubAdapter implements PartnerUserCreatorPort {
  private readonly logger = new Logger(PartnerUserCreatorStubAdapter.name);

  async createUser(): Promise<{ user_id: number; external_id: string }> {
    this.logger.warn(
      "PartnerUserCreatorStub: no-op. Configure PARTNER_USER_CREATOR with transversal users client in production.",
    );
    return { user_id: 0, external_id: "" };
  }
}
