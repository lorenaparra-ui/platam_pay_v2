import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.APP_ENV || 'development',
  port: process.env.NOTIFICATIONS_MS_PORT || 8085,
}));
