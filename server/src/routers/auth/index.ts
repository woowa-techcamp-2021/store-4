import { Router } from 'express';
import authController from '../../controllers/auth-controller';

const authRouter = Router();

authRouter.get('/google-login', authController.googleLogin);
authRouter.get('/google-callback', authController.googleCallback);

authRouter.get('/facebook-login', authController.facebookLogin);
authRouter.get('/facebook-callback', authController.facebookCallback);

export default authRouter;
