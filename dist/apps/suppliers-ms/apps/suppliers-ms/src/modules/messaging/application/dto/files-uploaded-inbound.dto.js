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
exports.FilesUploadedInboundDto = exports.FilesUploadedPayloadDto = exports.FilesUploadedItemDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FilesUploadedItemDto {
    url;
    folder;
}
exports.FilesUploadedItemDto = FilesUploadedItemDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilesUploadedItemDto.prototype, "url", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilesUploadedItemDto.prototype, "folder", void 0);
class FilesUploadedPayloadDto {
    files;
}
exports.FilesUploadedPayloadDto = FilesUploadedPayloadDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: 'files' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FilesUploadedItemDto),
    __metadata("design:type", Array)
], FilesUploadedPayloadDto.prototype, "files", void 0);
class FilesUploadedInboundDto {
    event;
    correlation_id;
    payload;
}
exports.FilesUploadedInboundDto = FilesUploadedInboundDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['files-uploaded']),
    __metadata("design:type", String)
], FilesUploadedInboundDto.prototype, "event", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: 'correlationId' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FilesUploadedInboundDto.prototype, "correlation_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FilesUploadedPayloadDto),
    __metadata("design:type", FilesUploadedPayloadDto)
], FilesUploadedInboundDto.prototype, "payload", void 0);
//# sourceMappingURL=files-uploaded-inbound.dto.js.map