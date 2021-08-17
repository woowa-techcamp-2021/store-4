import { Router } from 'express';
import categoryController from '../../../controllers/category-controller';
import authMiddleware from '../../../middlewares/auth-middleware';

const categoryRouter = Router();

categoryRouter.get('/', authMiddleware('guest'), categoryController.findAll);

export default categoryRouter;
