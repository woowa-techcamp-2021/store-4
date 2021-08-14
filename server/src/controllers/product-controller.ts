import { Request, Response } from 'express';
import productService from '../services/product-service';

export type ProductQuery = {
  category?: string;
  sort?: string;
  pageNum?: string;
};

class ProductController {
  async getAll(req: Request, res: Response) {
    const { category, sort, pageNum } = req.query as ProductQuery;

    const products = await productService.findAll({ category, sort, pageNum });

    res.status(200).json({
      products,
    });
  }
}

export default new ProductController();
