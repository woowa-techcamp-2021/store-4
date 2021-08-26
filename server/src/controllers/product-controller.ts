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

const POPULAR_PRODUCTS_LIMIT = 4;
const DISCOUNTING_PRODUCTS_LIMIT = 4;
const NEW_PRODUCTS_LIMIT = 8;

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
    const productId = numberParamValidator(req.params.id);

    const product = await productService.findOne(userId, productId);

    res.status(200).json({
      product,
    });
  }

  async findMainProducts(req: Request, res: Response) {
    const { decoded } = req;

    const popularProducts = await productService.findPopularProducts(
      decoded?.id,
      POPULAR_PRODUCTS_LIMIT
    );
    const discountingProducts = await productService.findDiscountingProducts(
      decoded?.id,
      DISCOUNTING_PRODUCTS_LIMIT
    );
    const newProducts = await productService.findNewProducts(decoded?.id, NEW_PRODUCTS_LIMIT);

    res.status(200).json({
      popularProducts,
      discountingProducts,
      newProducts,
    });
  }
}

export default new ProductController();
