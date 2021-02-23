import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Request,
  Redirect,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { EncurtadorDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Post('encurtador')
  async createNewUrl(@Body() encurtadorDto: EncurtadorDto) {
    try {
      const newUrl = await this.appService.createNewUrl(encurtadorDto);

      return { newUrl: newUrl };
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw new InternalServerErrorException();
    }
  }

  @Get('*')
  @Redirect('https://docs.nestjs.com')
  async getHello(@Req() req: Request) {
    try {
      const hash = req.url.replace(/[^0-9a-z]/gi, '');
      const url = await this.appService.getUrl(hash);

      if (url) {
        return { url: url };
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw new InternalServerErrorException();
    }

    throw new NotFoundException();
  }
}
