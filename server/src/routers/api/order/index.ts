import { Router } from 'express';
import authMiddleware from '../../../middlewares/auth-middleware';
import orderController from '../../../controllers/order-controller';
import wrapAsync from '../../../lib/wrap-async';

const orderRouter = Router();

orderRouter.get('/', authMiddleware('user'), wrapAsync(orderController.findAll));
orderRouter.post('/', authMiddleware('user'), wrapAsync(orderController.create));

export default orderRouter;
