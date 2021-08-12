import { Router } from 'express';
// import authController from '../../controllers/auth.controler';

const authRouter = Router();

authRouter.get('/google-login');
authRouter.get('/facebook-login');

export default authRouter;
