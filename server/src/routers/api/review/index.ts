import { Router } from 'express';
import reviewController from '../../../controllers/review-controller';
import wrapAsync from '../../../lib/wrap-async';
import authMiddleware from '../../../middlewares/auth-middleware';
import formMiddleware from '../../../middlewares/form-middleware';

const reviewRouter = Router();

reviewRouter.get('/user/:userId', wrapAsync(reviewController.getByUser));
reviewRouter.post('/', authMiddleware('user'), formMiddleware, wrapAsync(reviewController.post));
reviewRouter.delete('/:reviewId', authMiddleware('user'), wrapAsync(reviewController.delete));

export default reviewRouter;
