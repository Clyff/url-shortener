import { AppService } from './app.service';
import { EncurtadorDto, UrlResponse } from './dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    private readonly logger;
    createNewUrl(encurtadorDto: EncurtadorDto): Promise<UrlResponse>;
    getUrl(req: Request): Promise<{
        url: string;
    }>;
}
