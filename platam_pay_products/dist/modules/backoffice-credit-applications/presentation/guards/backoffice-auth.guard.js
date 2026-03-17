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
exports.BackofficeAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
function extractBearerToken(authorizationHeader) {
    if (!authorizationHeader)
        return null;
    const [scheme, token] = authorizationHeader.split(" ");
    if (!scheme || !token)
        return null;
    if (scheme.toLowerCase() !== "bearer")
        return null;
    return token;
}
let BackofficeAuthGuard = class BackofficeAuthGuard {
    dataSource;
    configService;
    constructor(dataSource, configService) {
        this.dataSource = dataSource;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context
            .switchToHttp()
            .getRequest();
        const userExternalId = request.headers["x-user-external-id"];
        if (!userExternalId) {
            throw new common_1.UnauthorizedException("Header x-user-external-id es requerido para acceder al backoffice");
        }
        const expectedToken = this.configService
            .get("config.backoffice.authToken")
            ?.trim();
        const incomingToken = extractBearerToken(request.headers.authorization);
        if (expectedToken && incomingToken !== expectedToken) {
            throw new common_1.UnauthorizedException("Token de autenticacion invalido");
        }
        const rows = ensureArray(await this.dataSource.query(`
        SELECT r.name AS role_name, st.code AS status_code
        FROM "users" u
        LEFT JOIN "roles" r ON r.id = u.role_id
        LEFT JOIN "statuses" st ON st.id = u.status_id
        WHERE u.external_id = $1::uuid
        LIMIT 1
      `, [userExternalId]));
        const user = rows[0];
        if (!user) {
            throw new common_1.UnauthorizedException("Usuario no encontrado para x-user-external-id");
        }
        if (user.status_code !== "active") {
            throw new common_1.ForbiddenException("Usuario sin estado activo");
        }
        const allowedRoles = this.configService
            .get("config.backoffice.allowedRoles")
            ?.map((role) => role.toLowerCase().trim()) ?? ["admin", "analista"];
        const roleName = user.role_name?.toLowerCase().trim() ?? "";
        if (!allowedRoles.includes(roleName)) {
            throw new common_1.ForbiddenException("Rol no autorizado para backoffice");
        }
        return true;
    }
};
exports.BackofficeAuthGuard = BackofficeAuthGuard;
exports.BackofficeAuthGuard = BackofficeAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectDataSource)()),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        config_1.ConfigService])
], BackofficeAuthGuard);
function ensureArray(value) {
    return Array.isArray(value) ? value : [];
}
//# sourceMappingURL=backoffice-auth.guard.js.map