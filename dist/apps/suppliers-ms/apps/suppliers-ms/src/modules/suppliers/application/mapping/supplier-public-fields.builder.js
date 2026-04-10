"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build_supplier_public_fields = build_supplier_public_fields;
const common_1 = require("@nestjs/common");
async function build_supplier_public_fields(supplier, lookup) {
    const business_external_id = await lookup.get_business_external_id_by_internal_id(supplier.business_id);
    if (!business_external_id) {
        throw new common_1.InternalServerErrorException();
    }
    let bank_account_external_id = null;
    if (supplier.bank_account_id !== null) {
        bank_account_external_id =
            await lookup.get_bank_account_external_id_by_internal_id(supplier.bank_account_id);
        if (!bank_account_external_id) {
            throw new common_1.InternalServerErrorException();
        }
    }
    return {
        internal_id: supplier.internal_id,
        external_id: supplier.external_id,
        business_external_id,
        bank_account_external_id,
        created_at: supplier.created_at,
        updated_at: supplier.updated_at,
    };
}
//# sourceMappingURL=supplier-public-fields.builder.js.map