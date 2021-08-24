import { Router } from 'express';
import authMiddleware from '../../../middlewares/auth-middleware';
import orderController from '../../../controllers/order-controller';

const orderRouter = Router();

orderRouter.get('/', authMiddleware('user'), orderController.findAll);

export default orderRouter;
