"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const dotenv_config_1 = require("./config/dotenv.config");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const infrastructure_module_1 = require("./infrastructure/infrastructure.module");
const businesses_module_1 = require("./modules/businesses/businesses.module");
const partners_module_1 = require("./modules/partners/partners.module");
const suppliers_module_1 = require("./modules/suppliers/suppliers.module");
const bank_accounts_module_1 = require("./modules/bank-accounts/bank-accounts.module");
const sales_representatives_module_1 = require("./modules/sales-representatives/sales-representatives.module");
const app_config_1 = __importDefault(require("./config/app.config"));
const sqs_config_1 = require("./config/sqs.config");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, sqs_config_1.sqs_config],
                envFilePath: dotenv_config_1.MONOREPO_ENV_PATH,
            }),
            infrastructure_module_1.InfrastructureModule,
            businesses_module_1.BusinessesModule,
            partners_module_1.PartnersModule,
            suppliers_module_1.SuppliersModule,
            bank_accounts_module_1.BankAccountsModule,
            sales_representatives_module_1.SalesRepresentativesModule,
        ],
        controllers: [app_controller_1.appController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map