"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => {
    return {
        partner_onboarding: {
            default_status_external_id: (process.env.PARTNER_ONBOARDING_DEFAULT_STATUS_EXTERNAL_ID ?? '').trim(),
            default_country_code: (process.env.PARTNER_ONBOARDING_DEFAULT_COUNTRY_CODE ?? 'CO').trim(),
            sqs_user_poll_timeout_ms: Number(process.env.PARTNER_ONBOARDING_SQS_POLL_TIMEOUT_MS ?? 60000),
            sqs_user_poll_interval_ms: Number(process.env.PARTNER_ONBOARDING_SQS_POLL_INTERVAL_MS ?? 300),
        },
        environment: process.env.APP_ENV || 'development',
        port: process.env.SUPPLIERS_MS_PORT || 8081,
        rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
        cognito: {
            region: process.env.COGNITO_REGION || 'us-east-2',
            userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-east-2_Nx4vYRz63',
            clientId: process.env.COGNITO_CLIENT_ID || 'k2fca9hhf0he0tadlhfcj7ntj',
            clientSecret: process.env.COGNITO_CLIENT_SECRET || 'v8i20s8mrur0hm84mftdkmjsisml1kvmv5oe43smbti3qi38p4n',
        },
        mfa: {
            issuer: process.env.MFA_ISSUER || 'Platam Pay',
        },
        storage: {
            s3: {
                region: process.env.AWS_S3_REGION || 'us-east-1',
                bucket: process.env.AWS_S3_BUCKET ?? '',
                endpoint: process.env.AWS_S3_ENDPOINT,
                force_path_style: process.env.AWS_S3_FORCE_PATH_STYLE === 'true',
                access_key_id: process.env.AWS_ACCESS_KEY_ID,
                secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
            },
        },
    };
});
//# sourceMappingURL=app.config.js.map