"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementModule = void 0;
const common_1 = require("@nestjs/common");
const partners_module_1 = require("../partners/partners.module");
const partners_controller_1 = require("./presentation/partners.controller");
let ManagementModule = class ManagementModule {
};
exports.ManagementModule = ManagementModule;
exports.ManagementModule = ManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [partners_module_1.PartnersModule],
        controllers: [partners_controller_1.PartnersController],
    })
], ManagementModule);
//# sourceMappingURL=management.module.js.map