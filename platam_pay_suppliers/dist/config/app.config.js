"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)("config", () => {
    return {
        environment: process.env.APP_ENV || "development",
        port: Number(process.env.PORT) || 3000,
    };
});
//# sourceMappingURL=app.config.js.map