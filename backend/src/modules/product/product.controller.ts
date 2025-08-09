import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CodeDto, ProductDto } from './dto/product.dto';
import { ProductServices } from './product.service';
import { BadRequest } from 'http-errors';
import { GlobalMessageError } from '../../common/enums/message.enum';

class ProductController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const product: ProductDto = req.body;
      await ProductServices.createProduct(product);
      return res.status(201).json({
        statusCode: 201,
        message: 'ثبت محصول موفقیت امیز بود',
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id))
        throw BadRequest(GlobalMessageError.BadRequest);
      const product: ProductDto = req.body;
      const result = await ProductServices.updateProduct(id, product);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id))
        throw BadRequest(GlobalMessageError.BadRequest);
      await ProductServices.deleteProduct(id);
      return res.status(200).json({
        statusCode: 200,
        message: 'حذف محصول موفقیت امیز بود',
      });
    } catch (error) {
      next(error);
    }
  }

  async findAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let { categoryId, limit, sort } = req.params;
      const result = await ProductServices.findAllProduct(
        categoryId,
        +limit,
        sort
      );
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findOneProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;

      const result = await ProductServices.findOneProduct(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async createCodeDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const body: CodeDto = req.body;
      const result = await ProductServices.createCodeDiscount(body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
