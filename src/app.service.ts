import { Injectable, Logger } from '@nestjs/common';
import { EncurtadorDto } from './dto';
import * as randomString from 'randomstring';
import { UrlService } from './url/url.service';
import { Url } from './url/url.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(private readonly urlService: UrlService) {}
  private readonly logger = new Logger(AppService.name);

  async createNewUrl(encurtadorDto: EncurtadorDto): Promise<string> {
    let model: Url;
    let hash: string;

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

  async getUrl(hash: string): Promise<string> {
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

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @Cron(process.env.CRON_TIMER)
  removeOldUrls(): void {
    this.logger.log('Removing old Urls...');
    this.urlService.removeOldUrls();
  }
}
