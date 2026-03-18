"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentative = void 0;
class SalesRepresentative {
    id;
    externalId;
    partnerId;
    userId;
    name;
    role;
    statusId;
    createdAt;
    updatedAt;
    constructor(id, externalId, partnerId, userId, name, role, statusId, createdAt, updatedAt) {
        this.id = id;
        this.externalId = externalId;
        this.partnerId = partnerId;
        this.userId = userId;
        this.name = name;
        this.role = role;
        this.statusId = statusId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.SalesRepresentative = SalesRepresentative;
//# sourceMappingURL=sales-representative.model.js.map