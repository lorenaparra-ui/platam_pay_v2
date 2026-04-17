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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsTransversalUserPersonWriterAdapter = void 0;
const common_1 = require("@nestjs/common");
const publish_create_partner_user_command_use_case_1 = require("../../../../modules/messaging/application/use-cases/publish-create-partner-user-command.use-case");
let SqsTransversalUserPersonWriterAdapter = class SqsTransversalUserPersonWriterAdapter {
    publish_create_partner_user;
    constructor(publish_create_partner_user) {
        this.publish_create_partner_user = publish_create_partner_user;
    }
    async publish_create_partner_user_command(input) {
        await this.publish_create_partner_user.execute(input);
    }
};
exports.SqsTransversalUserPersonWriterAdapter = SqsTransversalUserPersonWriterAdapter;
exports.SqsTransversalUserPersonWriterAdapter = SqsTransversalUserPersonWriterAdapter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [publish_create_partner_user_command_use_case_1.PublishCreatePartnerUserCommandUseCase])
], SqsTransversalUserPersonWriterAdapter);
//# sourceMappingURL=sqs-transversal-user-person-writer.adapter.js.map