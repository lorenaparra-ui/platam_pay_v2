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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormPartnerUserSqsResultPollAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transversal_data_1 = require("../../../../../../libs/transversal-data/src");
let TypeormPartnerUserSqsResultPollAdapter = class TypeormPartnerUserSqsResultPollAdapter extends transversal_data_1.TypeormSqsIdempotencyPollBaseAdapter {
    constructor(repo, config_service) {
        const po = config_service.get('config.partner_onboarding');
        super(repo, {
            timeout_ms: po?.sqs_user_poll_timeout_ms ?? 60_000,
            interval_ms: po?.sqs_user_poll_interval_ms ?? 300,
        });
    }
    validate_result(raw) {
        if (typeof raw !== 'object' || raw === null) {
            return false;
        }
        const r = raw;
        return (typeof r['user_external_id'] === 'string' &&
            r['user_external_id'].length > 0 &&
            typeof r['person_external_id'] === 'string' &&
            r['person_external_id'].length > 0);
    }
};
exports.TypeormPartnerUserSqsResultPollAdapter = TypeormPartnerUserSqsResultPollAdapter;
exports.TypeormPartnerUserSqsResultPollAdapter = TypeormPartnerUserSqsResultPollAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transversal_data_1.PartnerCreateUserSqsIdempotencyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], TypeormPartnerUserSqsResultPollAdapter);
//# sourceMappingURL=typeorm-partner-user-sqs-result-poll.adapter.js.map