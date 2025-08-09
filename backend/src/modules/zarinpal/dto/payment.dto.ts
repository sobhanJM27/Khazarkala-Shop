import { IsArray, IsString } from 'class-validator';

export class PaymentDto {
  @IsArray()
  basket: Array<{
    id: string;
    count: number;
  }>;
}

export class UpdateDto {
  @IsArray()
  listProduct: Array<string>;
}

export class CheckDto {
  @IsString()
  code: string;
}
