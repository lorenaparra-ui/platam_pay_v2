import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.APP_ENV || 'development',
    port: process.env.CONTRACTS_MS_PORT || 8084,
    signature: {
      zapsign: {
        base_url: (process.env.ZAPSIGN_BASE_URL ?? '').trim(),
        api_token: (process.env.ZAPSIGN_API_TOKEN ?? '').trim(),
        sandbox_default: process.env.ZAPSIGN_SANDBOX_DEFAULT !== 'false',
        folder_path_default: (process.env.ZAPSIGN_FOLDER_PATH_DEFAULT ?? '/').trim() || '/',
        /** Si se define, el webhook debe enviar el mismo valor en header X-Zapsign-Webhook-Secret */
        webhook_secret: (process.env.ZAPSIGN_WEBHOOK_SECRET ?? '').trim(),
      },
    },
  };
});
