import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
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
