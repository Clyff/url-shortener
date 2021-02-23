import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncurtadorDto } from './dto';

const objMock = () => ({
  error: jest.fn(),
});

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'UrlService',
          useFactory: objMock,
        },
        {
          provide: 'UrlRepository',
          useFactory: objMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('createNewUrl', () => {
    it('should return a newUrl', async () => {
      const newUrl = 'nova-url';
      const encurtadorDto = new EncurtadorDto();

      jest
        .spyOn(appService, 'createNewUrl')
        .mockImplementation(async () => newUrl);

      expect(appController.createNewUrl(encurtadorDto)).resolves.toEqual({
        newUrl: newUrl,
      });
    });

    it('should throw InternalServerErrorException if any error occurs', async () => {
      const encurtadorDto = new EncurtadorDto();

      jest.spyOn(appService, 'createNewUrl').mockImplementation(async () => {
        throw new Error();
      });

      await expect(appController.createNewUrl(encurtadorDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
