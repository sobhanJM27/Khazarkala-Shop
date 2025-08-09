import { Request, Response, NextFunction } from 'express';
import { CategoryDto } from './dto/category.dto';
import { categoryServices } from './category.service';

class CategoryController {
  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const category: CategoryDto = req.body;
      const result = await categoryServices.createCategory(category);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateCategoty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const category: CategoryDto = req.body;
      const { id } = req.params;
      const result = await categoryServices.updateCategoy(id, category);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await categoryServices.deleteCategory(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllChildern(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { nameParent } = req.body;
      const result = await categoryServices.getChildern(nameParent);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOneCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await categoryServices.getOneCategory(id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  
  async getAllCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      let { type } = req?.params;
      //if('{type}' == type) type = "undefined"
      const result = await categoryServices.getAllCategory(type);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { CategoryController };
