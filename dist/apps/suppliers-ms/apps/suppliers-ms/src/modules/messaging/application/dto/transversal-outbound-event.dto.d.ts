export declare enum TransversalEventType {
    health_ping = "health_ping",
    partner_onboarding_user_upsert_requested = "partner_onboarding_user_upsert_requested",
    partner_onboarding_person_upsert_requested = "partner_onboarding_person_upsert_requested",
    partner_onboarding_files_upload_requested = "partner_onboarding_files_upload_requested",
    partner_onboarding_credit_facility_requested = "partner_onboarding_credit_facility_requested",
    partner_onboarding_category_batch_requested = "partner_onboarding_category_batch_requested"
}
export declare class TransversalOutboundEventDto {
    correlation_id: string;
    event_type: TransversalEventType;
    payload: Record<string, unknown>;
    trace_id?: string;
}
