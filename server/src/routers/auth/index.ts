import { Router } from 'express';
import authController from '../../controllers/auth-controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth-middleware';

const authRouter = Router();

authRouter.post('/user', authMiddleware('user'), wrapAsync(authController.getUser));

authRouter.get('/google-login', authController.googleLogin);
authRouter.get('/google-callback', authController.googleCallback);

authRouter.get('/facebook-login', authController.facebookLogin);
authRouter.get('/facebook-callback', authController.facebookCallback);

export default authRouter;
