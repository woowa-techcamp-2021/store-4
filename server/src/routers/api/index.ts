import { Router } from 'express';
import categoryRouter from './category';

const apiRouter = Router();

apiRouter.use('/category', categoryRouter);

export default apiRouter;
