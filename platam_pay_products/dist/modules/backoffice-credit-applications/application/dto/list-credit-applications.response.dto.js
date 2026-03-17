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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCreditApplicationsResponseDto = exports.CreditApplicationsPaginationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const credit_application_list_item_response_dto_1 = require("./credit-application-list-item.response.dto");
class CreditApplicationsPaginationDto {
    has_more;
    page_size;
    next_cursor;
}
exports.CreditApplicationsPaginationDto = CreditApplicationsPaginationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreditApplicationsPaginationDto.prototype, "has_more", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], CreditApplicationsPaginationDto.prototype, "page_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        example: "eyJzb3J0QnlWYWx1ZSI6IjIwMjYtMDMtMTBUMTI6MDA6MDAuMDAwWiIsImlkIjo4MTJ9",
    }),
    __metadata("design:type", Object)
], CreditApplicationsPaginationDto.prototype, "next_cursor", void 0);
class ListCreditApplicationsResponseDto {
    items;
    pagination;
}
exports.ListCreditApplicationsResponseDto = ListCreditApplicationsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: credit_application_list_item_response_dto_1.CreditApplicationListItemResponseDto, isArray: true }),
    __metadata("design:type", Array)
], ListCreditApplicationsResponseDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreditApplicationsPaginationDto }),
    __metadata("design:type", CreditApplicationsPaginationDto)
], ListCreditApplicationsResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=list-credit-applications.response.dto.js.map