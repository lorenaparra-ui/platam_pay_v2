import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.APP_ENV || 'development',
    port: process.env.APP_PORT || 8080,
    rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
    cognito: {
      region: process.env.COGNITO_REGION || 'us-east-2',
      userPoolId: process.env.COGNITO_USER_POOL_ID || 'us-east-2_Nx4vYRz63',
      clientId:
        process.env.COGNITO_CLIENT_ID || 'k2fca9hhf0he0tadlhfcj7ntj',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || 'v8i20s8mrur0hm84mftdkmjsisml1kvmv5oe43smbti3qi38p4n',
    },
    mfa: {
      issuer: process.env.MFA_ISSUER || 'Platam Pay',
    },
  };
});
