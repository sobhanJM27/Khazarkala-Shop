import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  title: string;

  @IsString()
  parent: string;

  @IsString()
  type: string;
}
