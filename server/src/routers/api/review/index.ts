import { Router } from 'express';
import reviewController from '../../../controllers/review-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';

const reviewRouter = Router();

reviewRouter.post('/', authMiddleware('user'), wrapAsync(reviewController.post));
reviewRouter.delete('/:reviewId', authMiddleware('user'), wrapAsync(reviewController.delete));

export default reviewRouter;
