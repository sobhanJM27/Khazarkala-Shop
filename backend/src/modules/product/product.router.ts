import { Router } from 'express';
import { ProductController } from './product.controller';

const productController = new ProductController();

export default (router: Router) => {
  router.post('/createProduct', productController.create);
  router.patch('/updateProduct/:id', productController.update);
  router.delete('/deleteProduct/:id', productController.delete);
  router.get('/getOneProduct/:id', productController.findOneProduct);
  router.get(
    '/getAllProducts/:categoryId/:limit/:sort',
    productController.findAllProducts
  );
};
