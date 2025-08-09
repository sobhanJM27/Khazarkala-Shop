import { Router } from 'express';
import { BlogController } from './blog.controller';

const blogController = new BlogController();

export default (router: Router) => {
  router.post('/createBlog', blogController.create);
  router.put('/updateBlog/:id', blogController.update);
  router.delete('/deleteBlog/:id', blogController.delete);
  router.get('/getOneBlog/:id', blogController.findOneBlog);
  router.get(
    '/getAllBlog/:categoryId/:limit/:filter',
    blogController.findAllBlog
  );
};
