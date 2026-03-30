import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.APP_ENV || 'development',
    port: process.env.PRODUCTS_MS_PORT || 8083,
  };
});
