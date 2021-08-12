import { Router } from 'express';
import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.get('/google-login', authController.googleLogin);
authRouter.get('/facebook-login', authController.facebookLogin);

export default authRouter;
