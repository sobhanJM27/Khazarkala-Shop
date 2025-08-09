import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { Unauthorized } from 'http-errors';
import { UserModel, IUser } from '../user/model/user.model';

export interface AuthenticatedRequest extends Request {
  user?: IUser & { id?: string };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw Unauthorized('دسترسی غیرمجاز: توکن وجود ندارد');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY_TOKEN;

    const decoded = verify(token, secret) as { userId: string };
    if (!decoded?.userId) {
      throw Unauthorized('توکن نامعتبر است');
    }

    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      throw Unauthorized('کاربر یافت نشد');
    }

    req.user = user;
    req.user.id = decoded.userId;

    next();
  } catch (error) {
    next(error);
  }
};
