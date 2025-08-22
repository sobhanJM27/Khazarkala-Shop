import { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IUser, UserModel } from '../user/model/user.model';
import {
  Conflict,
  NotFound,
  Unauthorized,
  ServiceUnavailable,
} from 'http-errors';
import {
  RegisterDto,
  LoginDto,
  CheckOtp,
  ResetCodeDto,
  TokenDto,
} from './dto/aurh.dto';
import {
  AuthMessageError,
  GlobalMessageError,
} from './../../common/enums/message.enum';
import { TTokenPayload } from './../../common/types/token.type';
import {
  randomNumber,
  VerifyRefreshToken,
} from './../../common/functions/globalFunction';
import { sendSMS } from './../../common/functions/sendSmsPhone';

class AuthService {
  constructor(private readonly userRepository = UserModel<IUser>) {}

  async registerStepOne(phone: string) {
    const existUser = await this.userExist(phone);
    if (
      existUser &&
      existUser.first_name &&
      existUser.last_name &&
      existUser.email
    )
      throw Conflict(AuthMessageError.Confirm);
    if (
      existUser &&
      !existUser.first_name &&
      !existUser.last_name &&
      !existUser.email
    ) {
      return await this.generateCodeAndUpdateUserOtp(existUser);
    } else if (!existUser) {
      let role: string = 'USER';
      if (
        phone === '09035134830' ||
        phone === '09355690741' ||
        phone === '09113842853'
      )
        role = 'ADMIN';
      const createUser: IUser = await this.userRepository.create({
        phone,
        Role: role,
      });
      if (!createUser)
        throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable);
      return await this.generateCodeAndUpdateUserOtp(createUser);
    }
  }

  async registerStepTwo(registerDto: RegisterDto) {
    const { first_name, last_name, email, phone, code } = registerDto;
    const user = await this.userRepository.findOne({ phone }, { password: 0 });
    if (user.first_name || user.last_name)
      throw Unauthorized(
        'شما قبلا ثبت نام کردید و اطلاعاتتون را ثبت کرده ایید'
      );
    const { refreshToken, token } = await this.checkOtp({ phone, code });
    if (!user) throw NotFound(AuthMessageError.NotFound);
    const updateUser = await user.updateOne({
      $set: {
        first_name,
        last_name,
        email,
      },
    });
    if (updateUser.modifiedCount == 0)
      throw NotFound(GlobalMessageError.ServiceUnavailable);
    await user.save();
    return { message: 'اطلاعات شما ثبت گردید', refreshToken, token, user };
  }

  async loginOtp(loginDto: LoginDto) {
    const { phone } = loginDto;
    const existUser = await this.userExist(phone);
    if (!existUser) throw NotFound(AuthMessageError.NotFound);
    return await this.generateCodeAndUpdateUserOtp(existUser);
  }

  async checkOtp(checkDto: CheckOtp) {
    const { phone, code } = checkDto;
    const existUser = await this.userRepository.findOne({ phone });
    if (!existUser) throw NotFound(AuthMessageError.NotFound);
    const isMatch = await bcrypt.compare(code, existUser.otp.code);
    if (!isMatch) {
      throw Unauthorized(AuthMessageError.UnauthorizedCode);
    }
    const date = Date.now();
    if (existUser.otp.expiresIn < date)
      throw Unauthorized(AuthMessageError.UnauthorizedExpires);
    const token = await this.createToken({ userId: existUser._id }, '1h');
    const refreshToken = await this.createToken(
      { userId: existUser._id },
      '1y'
    );
    return { token, refreshToken, user: existUser };
  }

  async resetCode(restCodeDto: ResetCodeDto) {
    const { phone } = restCodeDto;
    const findUser = await this.userRepository.findOne({ phone });
    if (!findUser) throw NotFound('کاربری یافت نشد');
    return await this.generateCodeAndUpdateUserOtp(findUser);
  }

  async sendPhoneCode(code: string, phone: string) {
    const statusSendSms = await sendSMS(code, phone);
    if (!statusSendSms)
      throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable);
    return {
      message: 'کد یکبار مصرف ارسال شد',
      code,
    };
  }

  async refreshToken(tokenDto: TokenDto) {
    const { token } = tokenDto;
    const verifyRefreshToken: string = await VerifyRefreshToken(token);
    const findUser = await this.userRepository.findOne({
      _id: verifyRefreshToken,
    });
    const generateToken = await this.createToken(
      { userId: verifyRefreshToken },
      '1h'
    );
    const generateRefreshToken = await this.createToken(
      { userId: verifyRefreshToken },
      '1y'
    );
    return {
      token: generateToken,
      refreshToken: generateRefreshToken,
      user: findUser,
    };
  }

  async createToken(payload: TTokenPayload, expiresIn: string) {
    const token = sign(payload, process.env.SECRET_KEY_TOKEN, { expiresIn });
    return token;
  }

  async generateCodeAndUpdateUserOtp(user: IUser) {
    const code = randomNumber();
    const hashedCode = await bcrypt.hash(code, 10);
    const expiresIn = Date.now() + 2 * 60 * 1000;
    const updateUser = await user.updateOne({
      $set: { otp: { hashedCode, expirseIn: expiresIn } },
    });
    if (updateUser.modifiedCount == 0)
      throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable);
    await user.save();
    await this.sendPhoneCode(hashedCode, user.phone);
    return { message: 'کد با موفقیت برای شما ارسال شد' };
  }

  async userExist(phone?: string, email?: string, id?: string): Promise<IUser> {
    let user: IUser;
    if (email) {
      user = await this.userRepository.findOne({ email });
      return user;
    } else if (phone) {
      user = await this.userRepository.findOne({ phone });
      return user;
    } else if (id) {
      user = await this.userRepository.findOne({ _id: id });
      return user;
    }
  }
}
const AuthServices = new AuthService();

export { AuthServices as AuthService };
