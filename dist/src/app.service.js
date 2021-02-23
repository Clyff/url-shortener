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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const randomString = require("randomstring");
const url_service_1 = require("./url/url.service");
const schedule_1 = require("@nestjs/schedule");
let AppService = AppService_1 = class AppService {
    constructor(urlService) {
        this.urlService = urlService;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    async createNewUrl(encurtadorDto) {
        let model;
        let hash;
        this.logger.log('Generating new unique hash...');
        do {
            const lenght = this.getRandomNumber(5, 10);
            hash = randomString.generate(lenght);
            model = await this.urlService.findOneByHash(hash);
        } while (model);
        this.logger.log(`Saving URL ${encurtadorDto.url} with hash ${hash}...`);
        model = await this.urlService.save(encurtadorDto.url, hash);
        return model.newUrl;
    }
    async getUrl(hash) {
        this.logger.log(`Finding URL by hash '${hash}'... `);
        const model = hash.length
            ? await this.urlService.findOneByHash(hash)
            : null;
        if (model) {
            this.logger.log(`URL found: ${model.oldUrl}`);
            return model.oldUrl;
        }
        this.logger.log(`No URL found`);
        return '';
    }
    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    removeOldUrls() {
        this.logger.log('Removing old Urls...');
        this.urlService.removeOldUrls();
    }
};
__decorate([
    schedule_1.Cron(process.env.CRON_TIMER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppService.prototype, "removeOldUrls", null);
AppService = AppService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map