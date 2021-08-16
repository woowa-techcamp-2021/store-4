import { Request, Response } from 'express';
import categoryService from '../services/category-service';

class CategoryController {
  async findAll(req: Request, res: Response) {
    const categories = await categoryService.findCategoriesTree();

    res.status(200).json({
      categories,
    });
  }
}

export default new CategoryController();
