import { Router } from 'express';
import { PaymentController } from './zarinpal.contoller';
import { verifyToken } from './../../common/functions/globalFunction';

export default (router: Router) => {
  router.post('/basket', PaymentController.basket);
  router.post('/basket/update', PaymentController.updateBasket);
  router.get('/basket/getInformation', PaymentController.getAuthority);
  router.get('/basket/getAllSold', PaymentController.getAllSold);
  router.post('/checkCode', PaymentController.checkCode);
  router.get('/code/getAllCode', PaymentController.getAllCode);
  router.post('/code/add', PaymentController.addCode);
  router.delete('/code/delete/:discountId', PaymentController.deleteCode);
  router.get(
    '/order/detail/:authority',
    verifyToken,
    PaymentController.orderDetail
  );
};
