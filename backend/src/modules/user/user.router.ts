import { Router } from 'express';
import { UserController } from './user.controller';
import { authMiddleware } from '../auth/auth.middleware';

const userController = new UserController();

export default (router: Router) => {
  router.get(
    '/user/getAllComment',
    authMiddleware,
    userController.getAllComment
  );
  router.get('/user/getBought', authMiddleware, userController.getBought);
  router.get('/user/getAllUser', userController.getAllUser);
  router.delete(
    '/user/:userId',
    authMiddleware,
    userController.deleteUser
  );
};
