import { config as loadEnvFile } from "dotenv";

loadEnvFile({
  path: process.env.ENV_FILE || ".env",
});
