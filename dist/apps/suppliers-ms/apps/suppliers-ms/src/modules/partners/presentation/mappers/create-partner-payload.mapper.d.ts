import type { CreatePartnerPayloadDto } from '../dto/create-partner-payload.dto';
import type { CreatePartnerOrchestratorCommand } from '@modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.command';
export interface CreatePartnerPayloadDefaults {
    readonly country_code: string | null;
}
export declare function map_create_partner_payload_to_command(dto: CreatePartnerPayloadDto, defaults: CreatePartnerPayloadDefaults): CreatePartnerOrchestratorCommand;
