import { IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  detail?: string;
}
