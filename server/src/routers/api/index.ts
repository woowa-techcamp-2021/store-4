import { Router } from 'express';
import productRouter from './product';
import categoryRouter from './category';
import reviewRouter from './review';

const apiRouter = Router();

apiRouter.use('/product', productRouter);
apiRouter.use('/category', categoryRouter);
apiRouter.use('/review', reviewRouter);

export default apiRouter;
