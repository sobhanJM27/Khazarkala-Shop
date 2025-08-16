import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  CheckOtp,
  ResetCodeDto,
  TokenDto,
} from './dto/aurh.dto';
import { IUser } from '../user/model/user.model';

export class AuthController {
  async registerStepOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.body;
      const result: object = await AuthService.registerStepOne(phone);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async registerStepTwo(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) {
    try {
      const body: RegisterDto = req.body;
      // const userID = req.user
      const userID = { _id: '3134134' };
      const result: object = await AuthService.registerStepTwo(
        body,
        // userID._id
      );
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async loginOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const body: LoginDto = req.body;
      const result: object = await AuthService.loginOtp(body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async checkOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CheckOtp = req.body;
      const result: object = await AuthService.checkOtp(body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async resetCode(req: Request, res: Response, next: NextFunction) {
    try {
      const body: ResetCodeDto = req.body;
      const result: object = await AuthService.resetCode(body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const body: TokenDto = req.body;
      const refreshToken = await AuthService.refreshToken(body);
      return res.status(200).json({ refreshToken, statusCode: 200 });
    } catch (error) {
      next(error);
    }
  }
}
