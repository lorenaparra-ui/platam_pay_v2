"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusesCreditApplications = exports.Statuses = exports.StatusesCreditFacilities = void 0;
var StatusesCreditFacilities;
(function (StatusesCreditFacilities) {
    StatusesCreditFacilities["ACTIVE"] = "active";
    StatusesCreditFacilities["INACTIVE"] = "inactive";
})(StatusesCreditFacilities || (exports.StatusesCreditFacilities = StatusesCreditFacilities = {}));
exports.Statuses = StatusesCreditFacilities;
var StatusesCreditApplications;
(function (StatusesCreditApplications) {
    StatusesCreditApplications["IN_PROGRESS"] = "in_progress";
    StatusesCreditApplications["DUPLICATE"] = "duplicate";
    StatusesCreditApplications["UNDER_REVIEW"] = "under_review";
    StatusesCreditApplications["SARLAFT_MATCH"] = "sarlaft_match";
    StatusesCreditApplications["EXPERIAN_QUERY_ERROR"] = "experian_query_error";
    StatusesCreditApplications["AI_AGENT_ERROR"] = "ai_agent_error";
    StatusesCreditApplications["IN_INTERVIEW"] = "in_interview";
    StatusesCreditApplications["HCPJ_QUERY_ERROR"] = "hcpj_query_error";
    StatusesCreditApplications["PENDING_AUTHORIZATION"] = "pending_authorization";
    StatusesCreditApplications["AUTHORIZED"] = "authorized";
    StatusesCreditApplications["REJECTED"] = "rejected";
    StatusesCreditApplications["CANCELLED"] = "cancelled";
    StatusesCreditApplications["CLOSED"] = "closed";
})(StatusesCreditApplications || (exports.StatusesCreditApplications = StatusesCreditApplications = {}));
//# sourceMappingURL=statuses.enum.js.map