"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PartnerCategoriesServiceStubAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerCategoriesServiceStubAdapter = void 0;
const common_1 = require("@nestjs/common");
let PartnerCategoriesServiceStubAdapter = PartnerCategoriesServiceStubAdapter_1 = class PartnerCategoriesServiceStubAdapter {
    logger = new common_1.Logger(PartnerCategoriesServiceStubAdapter_1.name);
    async createCreditFacilityAndCategories() {
        this.logger.warn("PartnerCategoriesServiceStub: no-op. Configure PARTNER_CATEGORIES_SERVICE with products client in production.");
        return { credit_facility_id: 0 };
    }
};
exports.PartnerCategoriesServiceStubAdapter = PartnerCategoriesServiceStubAdapter;
exports.PartnerCategoriesServiceStubAdapter = PartnerCategoriesServiceStubAdapter = PartnerCategoriesServiceStubAdapter_1 = __decorate([
    (0, common_1.Injectable)()
], PartnerCategoriesServiceStubAdapter);
//# sourceMappingURL=partner-categories-service-stub.adapter.js.map