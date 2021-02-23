import { Repository, DeleteResult } from 'typeorm';
import { Url } from './url.entity';
export declare class UrlService {
    private urlsRepository;
    constructor(urlsRepository: Repository<Url>);
    findOneByHash(hash: string): Promise<Url>;
    save(url: string, hash: string): Promise<Url>;
    removeOldUrls(): Promise<DeleteResult>;
}
