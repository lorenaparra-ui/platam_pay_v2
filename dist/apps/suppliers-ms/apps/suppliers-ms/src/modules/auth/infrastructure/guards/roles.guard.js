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
var RolesGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_metadata_constants_1 = require("../../presentation/constants/auth-metadata.constants");
let RolesGuard = RolesGuard_1 = class RolesGuard {
    reflector;
    logger = new common_1.Logger(RolesGuard_1.name);
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        this.logger.log('1.roles_canActivate_start');
        const required = this.reflector.getAllAndOverride(auth_metadata_constants_1.REQUIRE_ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (required === undefined || required.length === 0) {
            this.logger.log('1.roles_skip_no_metadata');
            return true;
        }
        this.logger.log(`1.roles_required roles=${required.join(',')}`);
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user === undefined) {
            this.logger.log('1.roles_fail_user_missing_on_request');
            throw new common_1.UnauthorizedException();
        }
        if (!required.includes(user.roleCode)) {
            this.logger.log(`1.roles_fail_forbidden roleCode=${user.roleCode} required=${required.join(',')}`);
            throw new common_1.ForbiddenException();
        }
        this.logger.log(`1.roles_ok roleCode=${user.roleCode}`);
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = RolesGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map