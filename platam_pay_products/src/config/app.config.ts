import { registerAs } from "@nestjs/config";

export default registerAs("config", () => {
  const queueWarningDays = Number(
    process.env.BACKOFFICE_QUEUE_WARNING_DAYS ?? 3,
  );
  const queueCriticalDays = Number(
    process.env.BACKOFFICE_QUEUE_CRITICAL_DAYS ?? 5,
  );
  const allowedRolesRaw =
    process.env.BACKOFFICE_ALLOWED_ROLES ?? "admin,analista";

  return {
    environment: process.env.APP_ENV || "development",
    port: Number(process.env.PORT) || 3000,
    backoffice: {
      queueWarningDays,
      queueCriticalDays,
      authToken: process.env.BACKOFFICE_API_TOKEN ?? "",
      allowedRoles: allowedRolesRaw
        .split(",")
        .map((role) => role.trim())
        .filter(Boolean),
    },
  };
});
