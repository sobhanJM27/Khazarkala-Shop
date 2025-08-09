import { IsArray } from 'class-validator';

export class ImagesDto {
  @IsArray()
  images: Array<string>;
}
