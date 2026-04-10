import type { UseCase } from '@platam/shared';
import { ProcessTransversalInboundMessageUseCase } from './process-transversal-inbound-message.use-case';
import { ProcessFilesUploadedInboundUseCase } from './process-files-uploaded-inbound.use-case';
export type IngestTransversalInboundSqsCommand = Readonly<{
    body: string;
    delete_on_validation_error: boolean;
}>;
export declare class IngestTransversalInboundSqsMessageUseCase implements UseCase<IngestTransversalInboundSqsCommand, boolean> {
    private readonly process_transversal_inbound_message;
    private readonly process_files_uploaded_inbound;
    private readonly logger;
    constructor(process_transversal_inbound_message: ProcessTransversalInboundMessageUseCase, process_files_uploaded_inbound: ProcessFilesUploadedInboundUseCase);
    execute(command: IngestTransversalInboundSqsCommand): Promise<boolean>;
}
