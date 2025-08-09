import { Router } from 'express';
import { AuthController } from './auth.controller';

const authController = new AuthController();

export default (router: Router) => {
  router.post('/auth/registerStepOne', authController.registerStepOne);
  router.post('/auth/registerStepTwo', authController.registerStepTwo);
  router.post('/auth/login', authController.loginOtp);
  router.post('/auth/checkOtp', authController.checkOtp);
  router.post('/auth/resetCode', authController.resetCode);
  router.post('/auth/refreshToken', authController.refreshToken);
};
