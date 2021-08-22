import { Request, Response } from 'express';
import Product from '../models/product';
import productService from '../services/product-service';
import ProductFindQuery from '../validations/product-find-query';
import numberParamValidator from '../validations/number-params';

export type ProductResponse = {
  products: Product[];
  totalPages: number;
  totalProductCount: number;
};

class ProductController {
  async getAll(req: Request, res: Response) {
    const query = req.query as unknown as ProductFindQuery;
    const productFindQuery = new ProductFindQuery(query);
    await productFindQuery.validate();

    const productResponse = await productService.findAll(productFindQuery);

    res.status(200).json(productResponse);
  }

  async findOne(req: Request, res: Response) {
    const userId = req.decoded?.id ?? null;
    const productId = numberParamValidator(req.params.productId);

    const product = await productService.findOne(userId, productId);

    res.status(200).json({
      product,
    });
  }
}

export default new ProductController();
