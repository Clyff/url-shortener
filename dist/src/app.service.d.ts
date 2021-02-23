import { EncurtadorDto } from './dto';
import { UrlService } from './url/url.service';
export declare class AppService {
    private readonly urlService;
    constructor(urlService: UrlService);
    private readonly logger;
    createNewUrl(encurtadorDto: EncurtadorDto): Promise<string>;
    getUrl(hash: string): Promise<string>;
    getRandomNumber(min: number, max: number): number;
    removeOldUrls(): void;
}
