import { Test, TestingModule } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { Url } from './url.entity';
import { UrlService } from './url.service';

const objMock = () => ({
  findOne: async () => new Url(),
  create: () => objMock2,
  delete: async () => new DeleteResult(),
});

const objMock2 = {
  save: async () => new Url(),
};

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: 'UrlRepository',
          useFactory: objMock,
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('findOneByHash', () => {
    expect(service.findOneByHash('hash')).resolves.toEqual(new Url());
  });

  it('save', () => {
    expect(service.save('url', 'hash')).resolves.toEqual(new Url());
  });

  it('removeOldUrls', () => {
    expect(service.removeOldUrls()).resolves.toEqual(new DeleteResult());
  });
});
