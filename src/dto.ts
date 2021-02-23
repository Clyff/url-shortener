import { IsUrl, MaxLength } from 'class-validator';

class EncurtadorDto {
  @MaxLength(2048)
  @IsUrl()
  url: string;
}

export { EncurtadorDto };
