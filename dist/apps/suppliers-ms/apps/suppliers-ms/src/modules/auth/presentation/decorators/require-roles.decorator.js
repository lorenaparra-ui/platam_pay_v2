"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireRoles = void 0;
const common_1 = require("@nestjs/common");
const auth_metadata_constants_1 = require("../constants/auth-metadata.constants");
const RequireRoles = (...roles) => (0, common_1.SetMetadata)(auth_metadata_constants_1.REQUIRE_ROLES_KEY, roles);
exports.RequireRoles = RequireRoles;
//# sourceMappingURL=require-roles.decorator.js.map