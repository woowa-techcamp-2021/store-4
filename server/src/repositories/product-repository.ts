import { createQueryBuilder, EntityRepository, getCustomRepository, Repository } from 'typeorm';
import Product from '../models/product';
import { ProductData } from '../dummy-data/product';
import CategoryRepository from './category-repository';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  async createProducts(productData: Array<ProductData>): Promise<Product[]> {
    const categories = await Promise.all(
      productData.map(({ categoryId }) =>
        getCustomRepository(CategoryRepository).findOne(categoryId)
      )
    );

    const products = this.create(
      productData.map(({ name, price, content }, index) => ({
        name,
        price: price + '',
        content,
        category: categories[index],
      }))
    );

    return this.save(products);
  }

  find(): Promise<Product[]> {
    return createQueryBuilder(Product).getMany();
  }

  findByCategory(categoryId: number): Promise<Product[]> {
    return createQueryBuilder(Product).where({ category: categoryId }).getMany();
  }
}

export default ProductRepository;
