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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_service_1 = require("./app.service");
const dto_1 = require("./dto");
let AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    async createNewUrl(encurtadorDto) {
        try {
            const newUrl = await this.appService.createNewUrl(encurtadorDto);
            return { newUrl: newUrl };
        }
        catch (error) {
            this.logger.error(JSON.stringify(error));
            throw new common_1.InternalServerErrorException();
        }
    }
    async getUrl(req) {
        try {
            const hash = req.url.replace(/[^0-9a-z]/gi, '');
            const url = await this.appService.getUrl(hash);
            if (url) {
                return { url: url };
            }
        }
        catch (error) {
            this.logger.error(JSON.stringify(error));
            throw new common_1.InternalServerErrorException();
        }
        throw new common_1.NotFoundException();
    }
};
__decorate([
    common_1.Post('encurtador'),
    swagger_1.ApiOkResponse({ description: 'URL saved', type: dto_1.UrlResponse }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'Internal server error',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EncurtadorDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createNewUrl", null);
__decorate([
    common_1.Get('*'),
    common_1.Redirect('https://docs.nestjs.com'),
    swagger_1.ApiOkResponse({ description: 'URL found and redirected to it' }),
    swagger_1.ApiNotFoundResponse({ description: 'No URL found' }),
    swagger_1.ApiInternalServerErrorResponse({
        description: 'Internal server error',
    }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getUrl", null);
AppController = AppController_1 = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map