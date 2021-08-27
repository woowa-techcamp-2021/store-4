import { Router } from 'express';
import authController from '../../controllers/auth-controller';
import wrapAsync from '../../lib/wrap-async';
import authMiddleware from '../../middlewares/auth-middleware';

const authRouter = Router();

authRouter.post('/user', authMiddleware('user'), wrapAsync(authController.getUser));

authRouter.get('/google-login', authController.googleLogin);
authRouter.get('/google-callback', wrapAsync(authController.googleCallback));

authRouter.get('/facebook-login', authController.facebookLogin);
authRouter.get('/facebook-callback', wrapAsync(authController.facebookCallback));

authRouter.get('/demo', authController.demoLogin);

export default authRouter;
