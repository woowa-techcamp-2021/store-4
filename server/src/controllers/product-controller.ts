import { Request, Response } from 'express';
import Product from '../models/product';
import productService from '../services/product-service';
import ProductFindQuery from '../validations/product-find-query';

export type ProductResponse = {
  products: Product[];
  totalPages: number;
  totalProductCount: number;
};

export enum ERROR_TYPE {
  INVALID_CATEGORY,
  INVALID_PAGE,
  INVALID_SORT,
  PAGE_OVERFLOW,
  INVALID_LIMIT,
}

class ProductController {
  getAll = async (req: Request, res: Response) => {
    const query = req.query as unknown as ProductFindQuery;
    const productFindQuery = new ProductFindQuery(query);
    await productFindQuery.validate();

    const productResponse = await productService.findAll(productFindQuery);

    res.status(200).json(productResponse);
  };

  async findOne(req: Request, res: Response) {
    const userId = req.decoded?.id ?? null;
    const productId = Number(req.params.id);

    const product = await productService.findOne(userId, productId);

    res.status(200).json({
      product,
    });
  }
}

export default new ProductController();
