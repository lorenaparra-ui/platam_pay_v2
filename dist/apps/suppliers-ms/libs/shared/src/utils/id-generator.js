"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.new_uuid = new_uuid;
const crypto_1 = require("crypto");
function new_uuid() {
    return (0, crypto_1.randomUUID)();
}
//# sourceMappingURL=id-generator.js.map