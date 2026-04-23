import { registerAs } from '@nestjs/config';

/**
 * Poll sobre `transversal_schema.partner_create_user_sqs_idempotency` (misma BD que transversal-ms).
 */
function bounded_timeout_ms(raw: string | undefined, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) {
    return fallback;
  }
  return Math.min(Math.max(n, 5_000), 600_000);
}

function bounded_interval_ms(raw: string | undefined, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) {
    return fallback;
  }
  return Math.min(Math.max(n, 50), 5_000);
}

export default registerAs('config', () => {
  return {
    natural_person_onboarding: {
      sqs_poll_timeout_ms: bounded_timeout_ms(
        process.env.NATURAL_PERSON_ONBOARDING_SQS_POLL_TIMEOUT_MS,
        120_000,
      ),
      sqs_poll_interval_ms: bounded_interval_ms(
        process.env.NATURAL_PERSON_ONBOARDING_SQS_POLL_INTERVAL_MS,
        300,
      ),
    },
    environment: process.env.APP_ENV || 'development',
    port: process.env.PRODUCTS_MS_PORT || 8083,
    cognito: {
      region: process.env.COGNITO_REGION ?? process.env.AWS_REGION ?? 'us-east-1',
      userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
      clientId: process.env.COGNITO_CLIENT_ID ?? '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
    },
  };
});
