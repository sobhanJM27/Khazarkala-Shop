import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class BlogDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  shortText: string;
  @IsBoolean()
  status: boolean;
  @IsArray()
  comment: Array<string>;
  @IsArray()
  category: Array<string>;
  @IsArray()
  images: Array<string>;
  @IsString()
  shortLink: string;
  @IsNumber()
  sortByNumber: number;
  @IsObject()
  author: { name: string };
}

export class UpdateBlogDto extends BlogDto {
  @IsMongoId()
  id: string;
}
