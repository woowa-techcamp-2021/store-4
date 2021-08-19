import { Router } from 'express';
import productController from '../../../controllers/product-controller';
import wrapAsync from '../../../lib/wrap-async';

const productRouter = Router();

productRouter.get('/', wrapAsync(productController.getAll));
productRouter.get('/:id', wrapAsync(productController.findOne));

export default productRouter;
