import { IsEnum, IsMobilePhone, IsString } from 'class-validator';
import { CodeEnumMethod } from '../enum/method.enum';

export class RegisterDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  email: string;
  @IsMobilePhone('fa-IR')
  phone: string;
  @IsString()
  code?: string;
}

export class LoginDto {
  @IsMobilePhone('fa-IR')
  phone: string;
}

export class TokenDto {
  @IsString()
  token: string;
}

export class CheckOtp {
  @IsMobilePhone('fa-IR')
  phone: string;
  @IsString()
  code?: string;
}

export class ResetCodeDto {
  @IsMobilePhone('fa-IR')
  phone: string;
  @IsEnum(CodeEnumMethod)
  method: CodeEnumMethod;
}
