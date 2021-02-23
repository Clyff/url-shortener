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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const url_entity_1 = require("./url.entity");
let UrlService = class UrlService {
    constructor(urlsRepository) {
        this.urlsRepository = urlsRepository;
    }
    async findOneByHash(hash) {
        return this.urlsRepository.findOne({
            where: {
                newUrl: hash,
                createdAt: typeorm_2.Raw((alias) => `${alias} >= NOW() - INTERVAL '${process.env.EXPIRATION_PERIOD}'`),
            },
        });
    }
    async save(url, hash) {
        const model = this.urlsRepository.create();
        model.oldUrl = url;
        model.newUrl = hash;
        return model.save();
    }
    async removeOldUrls() {
        return this.urlsRepository.delete({
            createdAt: typeorm_2.Raw((alias) => `${alias} < NOW() - INTERVAL '${process.env.EXPIRATION_PERIOD}'`),
        });
    }
};
UrlService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(url_entity_1.Url)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UrlService);
exports.UrlService = UrlService;
//# sourceMappingURL=url.service.js.map