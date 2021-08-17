import { Router } from 'express';
import productRouter from './product';
import categoryRouter from './category';

const apiRouter = Router();

apiRouter.use('/product', productRouter);
apiRouter.use('/category', categoryRouter);

export default apiRouter;
