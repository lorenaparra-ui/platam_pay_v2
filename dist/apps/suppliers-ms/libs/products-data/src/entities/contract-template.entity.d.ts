import { ContractTemplateCatalogStatus } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class ContractTemplateEntity extends BaseExternalIdEntity {
    name: string;
    description: string | null;
    templateUrl: string;
    version: string | null;
    state: ContractTemplateCatalogStatus;
}
