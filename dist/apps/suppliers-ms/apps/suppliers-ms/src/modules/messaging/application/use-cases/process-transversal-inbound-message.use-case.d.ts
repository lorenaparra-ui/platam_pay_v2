import type { UseCase } from '@platam/shared';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';
export declare class ProcessTransversalInboundMessageUseCase implements UseCase<TransversalInboundMessageDto, void> {
    private readonly logger;
    execute(dto: TransversalInboundMessageDto): Promise<void>;
}
