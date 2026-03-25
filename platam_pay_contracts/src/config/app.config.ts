import { registerAs } from "@nestjs/config";

export default registerAs("config", () => ({
  environment: process.env.APP_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  signature: {
    provider: process.env.SIGNATURE_PROVIDER || "zapsign",
    zapsign: {
      baseUrl: process.env.ZAPSIGN_BASE_URL || "https://api.zapsign.com.br/api/v1",
      apiToken: process.env.ZAPSIGN_API_TOKEN || "",
      templateId: process.env.ZAPSIGN_TEMPLATE_ID || "",
      sandbox: process.env.ZAPSIGN_SANDBOX === "true",
      folderPath: process.env.ZAPSIGN_FOLDER_PATH || "platam_pay",
    },
  },
}));
