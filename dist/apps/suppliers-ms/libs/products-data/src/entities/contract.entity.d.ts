import { ContractCatalogStatus } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { ContractTemplateEntity } from './contract-template.entity';
export declare class ContractEntity extends BaseExternalIdEntity {
    userId: number | null;
    contractTemplate: ContractTemplateEntity | null;
    contractTemplateId: number | null;
    zapsignToken: string | null;
    originalFileUrl: string | null;
    signedFileUrl: string | null;
    formAnswersJson: Record<string, unknown> | null;
    state: ContractCatalogStatus;
}
