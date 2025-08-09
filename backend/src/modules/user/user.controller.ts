import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { IUser } from './model/user.model';

class UserController {
  async getAllComment(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const userID = req.user.id;
      const result = await UserService.getAllCommentUser(userID);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBought(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const userId = req.user.id;
      const result = await UserService.getBoughtProducts(userId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllUser(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { userId } = req.params;
      const result = await UserService.deleteUserByAdmin(userId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
export { UserController };
