import { Router } from 'express';
import productController from '../../../controllers/product-controller';
import wishController from '../../../controllers/wish-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';

const productRouter = Router();

productRouter.get('/', wrapAsync(productController.getAll));
productRouter.get('/:id', wrapAsync(productController.findOne));
productRouter.get('/:id/wish', authMiddleware('user'), wrapAsync(wishController.insertWish));

export default productRouter;
