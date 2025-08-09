import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BlogDto } from './dto/blog.dto';
import { BlogServices } from './blog.service';
import { BadRequest } from 'http-errors';
import { GlobalMessageError } from './../../common/enums/message.enum';

class BlogController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const blog: BlogDto = req.body;
      const result = await BlogServices.createBlog(blog);
      return res.status(201).json(result);
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
      const blog: BlogDto = req.body;
      const result = await BlogServices.updateBlog(id, blog);
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
      const result = await BlogServices.deleteBlog(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findAllBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let { categoryId, limit, filter } = req.params;
      const result = await BlogServices.findAllBlog(categoryId, +limit, filter);
      return res.status(200).json({
        statusCode: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  async findOneBlog(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await BlogServices.findOneBlog(id);
      return res.status(200).json({
        statusCode: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { BlogController };
