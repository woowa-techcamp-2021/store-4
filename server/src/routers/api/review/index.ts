import { Router } from 'express';
import reviewController from '../../../controllers/review-controller';
import authMiddleware from '../../../middlewares/auth-middleware';

const reviewRouter = Router();

reviewRouter.post('/', authMiddleware('user'), reviewController.post);

export default reviewRouter;
