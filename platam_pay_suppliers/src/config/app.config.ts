import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  return {
    environment: process.env.APP_ENV || "development",
    port: Number(process.env.PORT) || 3000,
  };
});
