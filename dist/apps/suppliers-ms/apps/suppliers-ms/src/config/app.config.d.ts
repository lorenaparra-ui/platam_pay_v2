declare const _default: (() => {
    partner_onboarding: {
        default_status_external_id: string;
        default_country_code: string;
        sqs_user_poll_timeout_ms: number;
        sqs_user_poll_interval_ms: number;
    };
    environment: string;
    port: string | number;
    rues_api_base_url: string;
    cognito: {
        region: string;
        userPoolId: string;
        clientId: string;
        clientSecret: string;
    };
    mfa: {
        issuer: string;
    };
    storage: {
        s3: {
            region: string;
            bucket: string;
            endpoint: string | undefined;
            force_path_style: boolean;
            access_key_id: string | undefined;
            secret_access_key: string | undefined;
        };
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    partner_onboarding: {
        default_status_external_id: string;
        default_country_code: string;
        sqs_user_poll_timeout_ms: number;
        sqs_user_poll_interval_ms: number;
    };
    environment: string;
    port: string | number;
    rues_api_base_url: string;
    cognito: {
        region: string;
        userPoolId: string;
        clientId: string;
        clientSecret: string;
    };
    mfa: {
        issuer: string;
    };
    storage: {
        s3: {
            region: string;
            bucket: string;
            endpoint: string | undefined;
            force_path_style: boolean;
            access_key_id: string | undefined;
            secret_access_key: string | undefined;
        };
    };
}>;
export default _default;
