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
var HttpFileStorageAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpFileStorageAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let HttpFileStorageAdapter = HttpFileStorageAdapter_1 = class HttpFileStorageAdapter {
    configService;
    logger = new common_1.Logger(HttpFileStorageAdapter_1.name);
    baseUrl;
    constructor(configService) {
        this.configService = configService;
        this.baseUrl =
            this.configService.get("config.users_service_url")?.replace(/\/$/, "") ?? "http://localhost:8080";
    }
    async upload(payload) {
        const url = `${this.baseUrl}/storage-example/upload`;
        const formData = new FormData();
        formData.append("key", payload.key);
        const body = payload.body instanceof Buffer
            ? new Uint8Array(payload.body.buffer, payload.body.byteOffset, payload.body.byteLength)
            : new Uint8Array(payload.body);
        const blob = new Blob([body], {
            type: payload.content_type ?? "application/octet-stream",
        });
        formData.append("file", blob, payload.key.split("/").pop() ?? "file");
        this.logger.debug(`POST ${url} key=${payload.key}`);
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const text = await response.text();
            this.logger.warn(`File upload failed: ${response.status} ${text}`);
            throw new Error(`File storage error: ${response.status} - ${text || response.statusText}`);
        }
        const data = (await response.json());
        if (typeof data?.key !== "string" || typeof data?.location !== "string") {
            throw new Error("File storage invalid response: expected key and location");
        }
        return { key: data.key, location: data.location };
    }
};
exports.HttpFileStorageAdapter = HttpFileStorageAdapter;
exports.HttpFileStorageAdapter = HttpFileStorageAdapter = HttpFileStorageAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], HttpFileStorageAdapter);
//# sourceMappingURL=http-file-storage.adapter.js.map