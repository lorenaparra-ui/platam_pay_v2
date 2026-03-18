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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PartnerLogoStorageAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerLogoStorageAdapter = exports.FILE_UPLOADER = void 0;
const common_1 = require("@nestjs/common");
exports.FILE_UPLOADER = "FILE_UPLOADER";
let PartnerLogoStorageAdapter = PartnerLogoStorageAdapter_1 = class PartnerLogoStorageAdapter {
    uploader;
    logger = new common_1.Logger(PartnerLogoStorageAdapter_1.name);
    constructor(uploader) {
        this.uploader = uploader;
    }
    async upload(payload) {
        this.logger.debug(`Uploading logo key=${payload.key}`);
        const result = await this.uploader.upload({
            key: payload.key,
            body: payload.body,
            content_type: payload.content_type,
        });
        return { key: result.key, location: result.location };
    }
};
exports.PartnerLogoStorageAdapter = PartnerLogoStorageAdapter;
exports.PartnerLogoStorageAdapter = PartnerLogoStorageAdapter = PartnerLogoStorageAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exports.FILE_UPLOADER)),
    __metadata("design:paramtypes", [Object])
], PartnerLogoStorageAdapter);
//# sourceMappingURL=partner-logo-storage.adapter.js.map