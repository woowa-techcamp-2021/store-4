import { Router } from 'express';
import productController from '../../../controllers/product-controller';
import wishController from '../../../controllers/wish-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';

const productRouter = Router();

productRouter.get('/', authMiddleware('guest'), wrapAsync(productController.getAll));
productRouter.get('/main', authMiddleware('guest'), wrapAsync(productController.findMainProducts));
productRouter.get('/:id', authMiddleware('guest'), wrapAsync(productController.findOne));
productRouter.get('/:id/wishList', authMiddleware('guest'), wrapAsync(wishController.getWishList));
productRouter.post('/:id/wish', authMiddleware('user'), wrapAsync(wishController.insertWish));
productRouter.delete('/:id/wish', authMiddleware('user'), wrapAsync(wishController.deleteWish));

export default productRouter;
