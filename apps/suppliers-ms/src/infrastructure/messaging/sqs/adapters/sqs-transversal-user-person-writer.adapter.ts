import { Injectable } from '@nestjs/common';
import { PublishCreatePartnerUserCommandUseCase } from '@messaging/application/use-cases/publish-create-partner-user-command.use-case';
import type { TransversalUserPersonWriterPort } from '@modules/partners/application/ports/transversal-user-person-writer.port';

@Injectable()
export class SqsTransversalUserPersonWriterAdapter implements TransversalUserPersonWriterPort {
  constructor(
    private readonly publish_create_partner_user: PublishCreatePartnerUserCommandUseCase,
  ) {}

  async publish_create_partner_user_command(
    input: Readonly<{
      correlation_id: string;
      idempotency_key: string;
      email: string;
      country_code: string | null;
      first_name: string;
      last_name: string;
      doc_type: string;
      doc_number: string;
      phone: string | null;
      city_external_id: string | null;
    }>,
  ): Promise<void> {
    await this.publish_create_partner_user.execute(input);
  }
}
