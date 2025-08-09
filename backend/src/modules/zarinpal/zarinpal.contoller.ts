import { Request, Response, NextFunction } from 'express';
import { CheckDto, PaymentDto, UpdateDto } from './dto/payment.dto';
import { PaymentService } from './zarinpal.service';
import { IUser } from '../user/model/user.model';

class PaymentController {
  async basket(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) {
    try {
      const basketDto: PaymentDto = req.body;
      const userID = req.user._id;
      const result = await PaymentService.PaymentGateway(basketDto, userID);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateBasket(req: Request, res: Response, next: NextFunction) {
    try {
      const body: UpdateDto = req.body;
      const result = await PaymentService.updateBasket(body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async checkCode(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CheckDto = req.body;
      const result = await PaymentService.checkCodeDiscount(body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllCode(req: Request, res: Response, next: NextFunction) {
    try {
      const codes = await PaymentService.getAllCodes();
      return res.status(200).json(codes);
    } catch (error) {
      next(error);
    }
  }

  async addCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { code, discount } = req.body;
      const result = await PaymentService.addCode(code, discount);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { discountId } = req.params;
      const result = await PaymentService.deleteCode(discountId);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllSold(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await PaymentService.getAllSold();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAuthority(
    req: Request & { user: IUser },
    res: Response,
    next: NextFunction
  ) {
    try {
      const { authority } = req.params;
      const user = req.user;
      const result = await PaymentService.getAuthority(authority, user._id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

const paymentController = new PaymentController();

export { paymentController as PaymentController };
