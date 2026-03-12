"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HttpCreatePartnerUserAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCreatePartnerUserAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let HttpCreatePartnerUserAdapter = HttpCreatePartnerUserAdapter_1 = class HttpCreatePartnerUserAdapter {
    configService;
    logger = new common_1.Logger(HttpCreatePartnerUserAdapter_1.name);
    baseUrl;
    constructor(configService) {
        this.configService = configService;
        this.baseUrl =
            this.configService.get("config.users_service_url")?.replace(/\/$/, "") ?? "http://localhost:8080";
    }
    async createPartnerUser(payload) {
        const url = `${this.baseUrl}/internal/partner-users`;
        const body = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            document_type: payload.document_type,
            document_number: payload.document_number,
            email: payload.email,
            phone: payload.phone,
        };
        this.logger.debug(`POST ${url}`);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            const text = await response.text();
            this.logger.warn(`Create partner user failed: ${response.status} ${text}`);
            throw new Error(`Users service error: ${response.status} - ${text || response.statusText}`);
        }
        const data = (await response.json());
        if (typeof data?.user_id !== "number" ||
            typeof data?.external_id !== "string") {
            throw new Error("Users service invalid response: expected user_id and external_id");
        }
        return { user_id: data.user_id, external_id: data.external_id };
    }
};
exports.HttpCreatePartnerUserAdapter = HttpCreatePartnerUserAdapter;
exports.HttpCreatePartnerUserAdapter = HttpCreatePartnerUserAdapter = HttpCreatePartnerUserAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HttpCreatePartnerUserAdapter);
//# sourceMappingURL=http-create-partner-user.adapter.js.map