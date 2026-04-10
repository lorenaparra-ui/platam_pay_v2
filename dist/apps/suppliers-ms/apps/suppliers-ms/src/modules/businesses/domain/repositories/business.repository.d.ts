import { Business, CreateBusinessProps, UpdateBusinessProps } from '@modules/businesses/domain/entities/business.entity';
export interface BusinessRepository {
    find_by_external_id(external_id: string): Promise<Business | null>;
    find_all(): Promise<Business[]>;
    create(props: CreateBusinessProps): Promise<Business>;
    update_by_external_id(external_id: string, patch: UpdateBusinessProps): Promise<Business | null>;
    delete_by_external_id(external_id: string): Promise<boolean>;
}
