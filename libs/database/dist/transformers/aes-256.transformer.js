"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountEncryptionTransformer = void 0;
const crypto_1 = require("crypto");
const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const IV_LENGTH = 16;
const TAG_LENGTH = 16;
const ENV_KEY = "SUPPLIER_BANK_ACCOUNT_ENCRYPTION_KEY";
function getKey() {
    const raw = process.env[ENV_KEY];
    if (!raw || raw.length < 32) {
        throw new Error(`${ENV_KEY} must be set and at least 32 characters for AES-256`);
    }
    return (0, crypto_1.scryptSync)(raw, "platam_suppliers_salt", KEY_LENGTH);
}
exports.BankAccountEncryptionTransformer = {
    to(plain) {
        if (plain == null || plain === "")
            return null;
        try {
            const key = getKey();
            const iv = (0, crypto_1.randomBytes)(IV_LENGTH);
            const cipher = (0, crypto_1.createCipheriv)(ALGORITHM, key, iv);
            const encrypted = Buffer.concat([
                cipher.update(plain, "utf8"),
                cipher.final(),
            ]);
            const tag = cipher.getAuthTag();
            return Buffer.concat([iv, tag, encrypted]).toString("base64");
        }
        catch {
            throw new Error("Bank account encryption failed");
        }
    },
    from(cipherBase64) {
        if (cipherBase64 == null || cipherBase64 === "")
            return null;
        try {
            const key = getKey();
            const buf = Buffer.from(cipherBase64, "base64");
            if (buf.length < IV_LENGTH + TAG_LENGTH)
                return null;
            const iv = buf.subarray(0, IV_LENGTH);
            const tag = buf.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
            const encrypted = buf.subarray(IV_LENGTH + TAG_LENGTH);
            const decipher = (0, crypto_1.createDecipheriv)(ALGORITHM, key, iv);
            decipher.setAuthTag(tag);
            return (decipher.update(encrypted).toString("utf8") + decipher.final("utf8"));
        }
        catch {
            return null;
        }
    },
};
