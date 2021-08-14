import { Request, Response } from 'express';
import Product from '../models/product';
import productService from '../services/product-service';

export type ProductQuery = {
  category?: string;
  sort?: string;
  pageNum?: string;
};

export type ProductResponse = {
  products: Product[];
  totalPages: number;
};

export enum ERROR_TYPE {
  INVALID_CATEGORY,
  INVALID_PAGE,
}

class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const { category, sort, pageNum } = req.query as ProductQuery;

      const productResponse = await productService.findAll({ category, sort, pageNum });

      res.status(200).json(productResponse);
    } catch (err) {
      switch (err) {
        case ERROR_TYPE.INVALID_CATEGORY:
          return res.status(404).json({ message: '카테고리가 존재하지 않습니다' });
        case ERROR_TYPE.INVALID_PAGE:
          return res.status(404).json({ message: '요청한 페이지가 총 페이지 수를 초과했습니다' });
        default:
          throw err;
      }
    }
  }
}

export default new ProductController();
