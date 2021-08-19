import { Router } from 'express';
import productController from '../../../controllers/product-controller';
import wishController from '../../../controllers/wish-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';

const productRouter = Router();

productRouter.get('/', wrapAsync(productController.getAll));
productRouter.get('/:id', wrapAsync(productController.findOne));
productRouter.post('/:id/wish', authMiddleware('user'), wrapAsync(wishController.insertWish));
productRouter.delete('/:id/wish', authMiddleware('user'), wrapAsync(wishController.deleteWish));

export default productRouter;
