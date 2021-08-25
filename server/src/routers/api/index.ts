import { Router } from 'express';
import productRouter from './product';
import categoryRouter from './category';
import reviewRouter from './review';
import deliveryAddressRouter from './delivery-address';
import orderRouter from './order';

const apiRouter = Router();

apiRouter.use('/product', productRouter);
apiRouter.use('/category', categoryRouter);
apiRouter.use('/review', reviewRouter);
apiRouter.use('/delivery-address', deliveryAddressRouter);
apiRouter.use('/order', orderRouter);

export default apiRouter;
