import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw, DeleteResult } from 'typeorm';
import { Url } from './url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
  ) {}

  async findOneByHash(hash: string): Promise<Url> {
    return this.urlsRepository.findOne({
      where: {
        newUrl: hash,
        createdAt: Raw(
          (alias) =>
            `${alias} >= NOW() - INTERVAL '${process.env.EXPIRATION_PERIOD}'`,
        ),
      },
    });
  }

  async save(url: string, hash: string): Promise<Url> {
    const model = this.urlsRepository.create();
    model.oldUrl = url;
    model.newUrl = hash;

    return model.save();
  }

  async removeOldUrls(): Promise<DeleteResult> {
    return this.urlsRepository.delete({
      createdAt: Raw(
        (alias) =>
          `${alias} < NOW() - INTERVAL '${process.env.EXPIRATION_PERIOD}'`,
      ),
    });
  }
}
