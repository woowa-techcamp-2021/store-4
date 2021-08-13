import { Router } from 'express';
import categoryController from '../../controllers/category-controller';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.findAll);

export default categoryRouter;
