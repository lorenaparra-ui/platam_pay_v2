"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PartnerUserCreatorStubAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerUserCreatorStubAdapter = void 0;
const common_1 = require("@nestjs/common");
let PartnerUserCreatorStubAdapter = PartnerUserCreatorStubAdapter_1 = class PartnerUserCreatorStubAdapter {
    logger = new common_1.Logger(PartnerUserCreatorStubAdapter_1.name);
    async createUser() {
        this.logger.warn("PartnerUserCreatorStub: no-op. Configure PARTNER_USER_CREATOR with transversal users client in production.");
        return { user_id: 0, external_id: "" };
    }
};
exports.PartnerUserCreatorStubAdapter = PartnerUserCreatorStubAdapter;
exports.PartnerUserCreatorStubAdapter = PartnerUserCreatorStubAdapter = PartnerUserCreatorStubAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], PartnerUserCreatorStubAdapter);
//# sourceMappingURL=partner-user-creator-stub.adapter.js.map