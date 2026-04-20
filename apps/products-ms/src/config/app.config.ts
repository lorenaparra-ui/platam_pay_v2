import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    natural_person_onboarding: {
      default_country_code: (process.env.NATURAL_PERSON_ONBOARDING_DEFAULT_COUNTRY_CODE ?? 'CO').trim(),
      sqs_poll_timeout_ms: Number(
        process.env.NATURAL_PERSON_ONBOARDING_SQS_POLL_TIMEOUT_MS ?? 60000,
      ),
      sqs_poll_interval_ms: Number(
        process.env.NATURAL_PERSON_ONBOARDING_SQS_POLL_INTERVAL_MS ?? 300,
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
