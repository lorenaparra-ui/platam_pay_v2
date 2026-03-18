"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Business = void 0;
class Business {
    id;
    externalId;
    userId;
    cityId;
    entityType;
    businessName;
    businessAddress;
    businessType;
    relationshipToBusiness;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.externalId = props.externalId;
        this.userId = props.userId;
        this.cityId = props.cityId;
        this.entityType = props.entityType;
        this.businessName = props.businessName;
        this.businessAddress = props.businessAddress;
        this.businessType = props.businessType;
        this.relationshipToBusiness = props.relationshipToBusiness;
        this.legalName = props.legalName;
        this.tradeName = props.tradeName;
        this.taxId = props.taxId;
        this.yearOfEstablishment = props.yearOfEstablishment;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}
exports.Business = Business;
//# sourceMappingURL=business.model.js.map