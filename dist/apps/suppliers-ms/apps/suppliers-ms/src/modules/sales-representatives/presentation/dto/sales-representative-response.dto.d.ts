import { UserState } from '@platam/shared';
export declare class SalesRepresentativeResponseDto {
    internal_id: number;
    external_id: string;
    partner_external_id: string;
    user_external_id: string | null;
    user_display_name: string | null;
    user_role_name: string | null;
    user_state: UserState | null;
    created_at: Date;
    updated_at: Date;
}
