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
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { EncurtadorDto, UrlResponse } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Post('encurtador')
  @ApiOkResponse({ description: 'URL saved', type: UrlResponse })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createNewUrl(
    @Body() encurtadorDto: EncurtadorDto,
  ): Promise<UrlResponse> {
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
  @ApiOkResponse({ description: 'URL found and redirected to it' })
  @ApiNotFoundResponse({ description: 'No URL found' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getUrl(@Req() req: Request) {
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
