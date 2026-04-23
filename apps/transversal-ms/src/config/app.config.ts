import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.APP_ENV || 'development',
    port: process.env.TRANSVERSAL_MS_PORT || 8080,
    rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
    cognito: {
      region: process.env.COGNITO_REGION ?? process.env.AWS_REGION ?? 'us-east-1',
      userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
      clientId: process.env.COGNITO_CLIENT_ID ?? '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? '',
    },
    mfa: {
      issuer: process.env.MFA_ISSUER || 'Platam Pay',
    },
    storage: {
      s3: {
        region: process.env.AWS_S3_REGION || 'us-east-2',
        bucket: process.env.AWS_S3_BUCKET ?? '',
        /** Si está definida, las URLs devueltas en files-uploaded usarán este prefijo + key. */
        public_base_url: process.env.AWS_S3_PUBLIC_BASE_URL ?? '',
      },
    },
  };
});