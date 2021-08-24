import { Router } from 'express';
import reviewController from '../../../controllers/review-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';
import formMiddleware from '../../../middlewares/form-middleware';

const reviewRouter = Router();

reviewRouter.post('/', authMiddleware('user'), formMiddleware, wrapAsync(reviewController.post));
reviewRouter.delete('/:reviewId', authMiddleware('guest'), wrapAsync(reviewController.delete));

export default reviewRouter;
