import { PublishCreatePartnerUserCommandUseCase } from '@messaging/application/use-cases/publish-create-partner-user-command.use-case';
import type { TransversalUserPersonWriterPort } from '@modules/partners/application/ports/transversal-user-person-writer.port';
export declare class SqsTransversalUserPersonWriterAdapter implements TransversalUserPersonWriterPort {
    private readonly publish_create_partner_user;
    constructor(publish_create_partner_user: PublishCreatePartnerUserCommandUseCase);
    publish_create_partner_user_command(input: Readonly<{
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
    }>): Promise<void>;
}
