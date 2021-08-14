import { ProductQuery } from '../controllers/product-controller';

class ProductService {
  async findAll({ category, sort, pageNum }: ProductQuery): Promise<void> {
    return;
  }
}

export default new ProductService();
