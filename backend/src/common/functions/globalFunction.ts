import { Request, Response, NextFunction } from 'express';
import { NotFound, BadRequest, Unauthorized } from 'http-errors';
import moment from 'moment-jalali';
import { isMongoId } from 'class-validator';
import * as Jwt from 'jsonwebtoken';
import { IUser, UserModel } from './../../modules/user/model/user.model';
import { AuthMessageError, NotFoundError } from '../enums/message.enum';
import { TTokenPayload } from '../types/token.type';

async function checkRole(req: Request & { user: string }, role: Array<string>) {
  const userID = req?.user;
  const userRepository = UserModel<IUser>;
  const findUser: IUser = await userRepository.findOne({ _id: userID });
  if (!findUser) throw NotFound(AuthMessageError.NotFound);
  const Role = findUser.Role;
  for (var i = 0; i < role.length; i++) {
    if (!Role.includes(role[i])) {
      throw Unauthorized('شما به این آدرس دسترسی ندارید');
    }
  }
}

function randomNumber() {
  return '' + Math.floor(Math.random() * 90000 + 10000);
}

function invoiceNumberGenerator(): string {
  return (
    moment().format('jYYYYjMMjDDHHmmssSSS') +
    String(process.hrtime()[1]).padStart(9)
  );
}

async function VerifyRefreshToken(token: string): Promise<string> {
  try {
    const payload = Jwt.verify(token, process.env.SECRET_KEY_TOKEN) as {
      userId: string;
    };
    const { userId } = payload;

    const user = await UserModel.findOne(
      { _id: userId },
      { password: 0, otp: 0 }
    );
    if (!user) throw Unauthorized('حساب کاربری یافت نشد');

    return userId;
  } catch (err) {
    throw Unauthorized('وارد حساب کاربری خود شوید');
  }
}

async function verifyToken(
  req: Request & { user: string },
  res: Response,
  next: NextFunction
) {
  if (!req.headers['authorization'])
    return next(Unauthorized('دوباره تلاش کنید'));
  const authorization: string = req.headers['authorization'];
  const token: string = authorization.split(' ')[1];
  const verifyUser: TTokenPayload = Jwt.verify(
    token,
    process.env.SECRET_KEY_TOKEN
  ) as TTokenPayload;
  const user: IUser = await UserModel.findOne(
    { _id: verifyUser.userId },
    { _id: 1 }
  );
  if (!user) return Unauthorized('کاربری یافت نشد');
  req.user = user._id;
  return next();
}

async function relatedFunc(model, id: string) {
  let allBlog = await model.find({ category: model.category });
  let relates = [];
  for (let i = 0; i < allBlog.length; i++) {
    const oneblog = allBlog[i];
    if (!(oneblog['_id'] == id)) {
      relates.push(allBlog[i]);
    }
  }
  return relates;
}

function copyObject(object: object) {
  return JSON.parse(JSON.stringify(object));
}

function validateObjectID(id: string) {
  if (!isMongoId(id)) throw BadRequest('شناسه ی کاربر اشتباه میباشد');
}

export {
  invoiceNumberGenerator,
  checkRole,
  verifyToken,
  randomNumber,
  relatedFunc,
  copyObject,
  validateObjectID,
  VerifyRefreshToken,
};
