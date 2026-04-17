import { UserState } from '@platam/shared';
export interface SalesRepresentativeLoadedUser {
    readonly external_id: string;
    readonly display_name: string;
    readonly role_name: string;
    readonly state: UserState;
}
export declare class SalesRepresentative {
    readonly internal_id: number;
    readonly external_id: string;
    readonly partner_id: number;
    readonly user_id: number | null;
    readonly created_at: Date;
    readonly updated_at: Date;
    readonly loaded_user?: SalesRepresentativeLoadedUser | undefined;
    constructor(internal_id: number, external_id: string, partner_id: number, user_id: number | null, created_at: Date, updated_at: Date, loaded_user?: SalesRepresentativeLoadedUser | undefined);
}
export interface CreateSalesRepresentativeProps {
    partner_id: number;
    user_id: number | null;
}
