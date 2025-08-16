import { Router } from 'express';
import { SearchController } from './search.controller';

export default (router: Router) => {
  router.get('/searchAll/:query', SearchController.all);
  router.get("/searchBlog", SearchController.blog)
  router.get("/searchProduct" , SearchController.product)
};
