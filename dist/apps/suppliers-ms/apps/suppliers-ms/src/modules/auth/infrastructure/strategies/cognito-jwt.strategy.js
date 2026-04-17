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
var CognitoJwtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const jwks_rsa_1 = require("jwks-rsa");
const passport_jwt_1 = require("passport-jwt");
const typeorm_2 = require("typeorm");
const transversal_data_1 = require("../../../../../../../libs/transversal-data/src");
const shared_1 = require("../../../../../../../libs/shared/src");
const USER_JWT_SELECT = {
    id: true,
    cognitoSub: true,
    email: true,
    roleId: true,
    state: true,
    parent_id: true,
    hierarchyPath: true,
};
let CognitoJwtStrategy = CognitoJwtStrategy_1 = class CognitoJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    config_service;
    user_repository;
    role_repository;
    logger = new common_1.Logger(CognitoJwtStrategy_1.name);
    constructor(config_service, user_repository, role_repository) {
        const region = config_service.getOrThrow('config.cognito.region');
        const user_pool_id = config_service.get('config.cognito.userPoolId')?.trim();
        if (!user_pool_id) {
            throw new Error('COGNITO_USER_POOL_ID es obligatorio para autenticación JWT (config.cognito.userPoolId).');
        }
        const issuer = `https://cognito-idp.${region}.amazonaws.com/${user_pool_id}`;
        const jwks_uri = `${issuer}/.well-known/jwks.json`;
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            algorithms: ['RS256'],
            issuer,
            secretOrKeyProvider: (0, jwks_rsa_1.passportJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 10,
                jwksUri: jwks_uri,
            }),
        });
        this.config_service = config_service;
        this.user_repository = user_repository;
        this.role_repository = role_repository;
    }
    async validate(payload) {
        this.logger.log('1.strategy_validate_start');
        if (payload.token_use !== 'access') {
            this.reject('invalid_token_use');
        }
        this.logger.log('1.strategy_token_use_access_ok');
        const expected_client_id = this.config_service
            .get('config.cognito.clientId')
            ?.trim();
        if (expected_client_id &&
            payload.client_id !== undefined &&
            payload.client_id !== expected_client_id) {
            this.reject('client_id_mismatch');
        }
        this.logger.log('1.strategy_client_id_ok');
        const sub = payload.sub?.trim();
        if (!sub) {
            this.reject('missing_sub');
        }
        const normalized_sub = sub.toLowerCase();
        this.logger.log('1.strategy_before_find_user_by_cognito_sub');
        const user = await this.user_repository.findOne({
            where: { cognitoSub: normalized_sub },
            select: USER_JWT_SELECT,
        });
        this.logger.log(`1.strategy_after_find_user found=${user}`);
        if (user === null || user.state !== shared_1.UserState.ACTIVE) {
            this.reject('user_not_found_or_inactive');
        }
        if (user.cognitoSub.trim().toLowerCase() !== normalized_sub) {
            this.reject('cognito_sub_mismatch');
        }
        this.logger.log('1.strategy_cognito_sub_match_ok');
        if (typeof payload.email === 'string' && payload.email.trim() !== '') {
            const claim_email = payload.email.trim().toLowerCase();
            if (claim_email !== user.email.trim().toLowerCase()) {
                this.reject('email_claim_mismatch');
            }
            this.logger.log('1.strategy_email_claim_match_ok');
        }
        else {
            this.logger.log('1.strategy_email_claim_skipped');
        }
        this.logger.log('1.strategy_before_find_role');
        const role = await this.role_repository.findOne({
            where: { id: user.roleId },
            select: { id: true, name: true },
        });
        this.logger.log(`1.strategy_after_find_role found=${role !== null} name=${role?.name ?? 'n/a'}`);
        if (role === null) {
            this.reject('role_not_found');
        }
        this.logger.log('1.strategy_validate_done');
        return {
            internalUserId: user.id,
            cognitoSub: user.cognitoSub,
            email: user.email,
            roleCode: role.name,
            parentId: user.parent_id,
            hierarchyPath: user.hierarchyPath,
        };
    }
    reject(reason) {
        this.logger.log(`1.strategy_reject reason=${reason}`);
        this.logger.warn(`cognito_jwt_validate_rejected code=${reason}`);
        throw new common_1.UnauthorizedException();
    }
};
exports.CognitoJwtStrategy = CognitoJwtStrategy;
exports.CognitoJwtStrategy = CognitoJwtStrategy = CognitoJwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(transversal_data_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(transversal_data_1.RoleEntity)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CognitoJwtStrategy);
//# sourceMappingURL=cognito-jwt.strategy.js.map