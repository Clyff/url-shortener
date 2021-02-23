import { IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class EncurtadorDto {
  @MaxLength(2048)
  @IsUrl()
  @ApiProperty({ description: 'An URL that wil be saved', maxLength: 2048 })
  url: string;
}
class UrlResponse {
  @ApiProperty({ description: 'The short version of the URL' })
  newUrl: string;
}

export { EncurtadorDto, UrlResponse };
