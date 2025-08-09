import { Router } from 'express';

import { CategoryController } from './category.controller';

const categoryController = new CategoryController();

export default (router: Router) => {
  router.post('/addCategory', categoryController.createCategory);
  router.patch('/updateCategory/:id', categoryController.updateCategoty);
  router.delete('/deleteCategory/:id', categoryController.deleteCategory);
  router.get('/getOneCategory/:id', categoryController.getOneCategory);
  router.get('/getAllCategory/:type', categoryController.getAllCategory);
  router.get('/getchildern', categoryController.getAllChildern);
};
