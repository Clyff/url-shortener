import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { EncurtadorDto } from './dto';
import { Url } from './url/url.entity';
import { UrlService } from './url/url.service';

const objMock = () => ({});

describe('AppService', () => {
  let appService: AppService;
  let urlService: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        UrlService,
        {
          provide: 'UrlRepository',
          useFactory: objMock,
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    urlService = module.get<UrlService>(UrlService);
  });

  describe('createNewUrl', () => {
    it('should return a newUrl', async () => {
      const encurtadorDto = new EncurtadorDto();
      const urlModel = new Url();
      urlModel.newUrl = 'teste';

      jest
        .spyOn(urlService, 'findOneByHash')
        .mockImplementation(async () => null);

      jest.spyOn(urlService, 'save').mockImplementation(async () => urlModel);

      expect(appService.createNewUrl(encurtadorDto)).resolves.toEqual(
        urlModel.newUrl,
      );
    });
  });

  describe('getUrl', () => {
    it('should return a url', async () => {
      const urlModel = new Url();
      urlModel.oldUrl = 'teste';

      jest
        .spyOn(urlService, 'findOneByHash')
        .mockImplementation(async () => urlModel);

      expect(appService.getUrl('hash')).resolves.toEqual(urlModel.oldUrl);
    });

    it('should return a empty value, no url found', async () => {
      expect(appService.getUrl('')).resolves.toEqual('');
    });
  });
});
