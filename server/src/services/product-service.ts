import { getCustomRepository } from 'typeorm';
import Product from '../models/product';
import ProductRepository from '../repositories/product-repository';
import { ProductQuery } from '../controllers/product-controller';

class ProductService {
  async findAll({ category, sort, pageNum }: ProductQuery): Promise<Product[]> {
    const productDataFilteredByCategory = await this.findByCategory(category);
    return productDataFilteredByCategory;
  }

  private findByCategory(categoryId: string | undefined) {
    const productRepository = getCustomRepository(ProductRepository);

    if (categoryId === undefined) return productRepository.find();

    return productRepository.findByCategory(+categoryId);
  }
}

export default new ProductService();
