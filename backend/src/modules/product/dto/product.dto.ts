import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ProductDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(3)
  Description: string;

  @IsString()
  shortText: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  priceAfterDiscount: number;

  @IsArray()
  category: Array<string>;

  @IsArray()
  images: Array<string>;

  @IsArray()
  comments: Array<string>;

  @IsNumber()
  sortByNumber: number;
}

export class CodeDto {
  @IsString()
  code: string;

  @IsString()
  discount: string;
}
