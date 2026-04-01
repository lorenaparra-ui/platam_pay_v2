"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_iso_utc = to_iso_utc;
exports.is_before = is_before;
function to_iso_utc(date) {
    return date.toISOString();
}
function is_before(a, b) {
    return a.getTime() < b.getTime();
}
//# sourceMappingURL=date.utils.js.map