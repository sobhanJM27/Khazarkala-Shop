import { NextFunction, Request, Response } from 'express';
import { SearchService } from './search.service';

class SearchController {
  async blog(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      const result = await SearchService.searchBlog(search);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async product(req: Request, res: Response, next: NextFunction) {
    try {
      const { search } = req.query;
      const result = await SearchService.searchProduct(search);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.params;
      const { product, blog } = await SearchService.searchAll(query);
      return res.status(200).json({ product, blog });
    } catch (error) {
      next(error);
    }
  }
}

const searchContoroller = new SearchController();

export { searchContoroller as SearchController };
