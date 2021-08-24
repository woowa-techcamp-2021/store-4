import { Router } from 'express';
import deliveryAddressController from '../../../controllers/delivery-address-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';

const deliveryAddressRouter = Router();

deliveryAddressRouter.get(
  '/',
  authMiddleware('user'),
  wrapAsync(deliveryAddressController.findAll)
);
deliveryAddressRouter.post(
  '/',
  authMiddleware('user'),
  wrapAsync(deliveryAddressController.create)
);
deliveryAddressRouter.put(
  '/:id',
  authMiddleware('user'),
  wrapAsync(deliveryAddressController.modify)
);
deliveryAddressRouter.delete(
  '/:id',
  authMiddleware('user'),
  wrapAsync(deliveryAddressController.delete)
);

export default deliveryAddressRouter;
