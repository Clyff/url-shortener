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
exports.UrlResponse = exports.EncurtadorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class EncurtadorDto {
}
__decorate([
    class_validator_1.MaxLength(2048),
    class_validator_1.IsUrl(),
    swagger_1.ApiProperty({ description: 'An URL that wil be saved', maxLength: 2048 }),
    __metadata("design:type", String)
], EncurtadorDto.prototype, "url", void 0);
exports.EncurtadorDto = EncurtadorDto;
class UrlResponse {
}
__decorate([
    swagger_1.ApiProperty({ description: 'The short version of the URL' }),
    __metadata("design:type", String)
], UrlResponse.prototype, "newUrl", void 0);
exports.UrlResponse = UrlResponse;
//# sourceMappingURL=dto.js.map