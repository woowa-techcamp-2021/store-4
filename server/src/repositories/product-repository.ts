import { createQueryBuilder, EntityRepository, getCustomRepository, Repository } from 'typeorm';
import Product from '../models/product';
import { ProductData } from '../dummy-data/product';
import CategoryRepository from './category-repository';
import { SORT_OPTION } from '../controllers/product-controller';

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
        price,
        content,
        category: categories[index],
      }))
    );

    return this.save(products);
  }

  findProducts(
    categoryId: number,
    sortOption: SORT_OPTION,
    pageNum: number,
    limit: number
  ): Promise<[Product[], number]> {
    const where = categoryId === -1 ? {} : { category: categoryId };
    const skip = (pageNum - 1) * limit;
    const take = limit;

    let order: { [key: string]: 'ASC' | 'DESC' };
    switch (sortOption) {
      case SORT_OPTION.RECENT:
        order = { updatedAt: 'DESC' };
        break;
      case SORT_OPTION.PRICE_HIGH:
        order = { price: 'DESC' };
        break;
      case SORT_OPTION.PRICE_LOW:
        order = { price: 'ASC' };
        break;
      default:
        order = { updatedAt: 'DESC' };
    }

    return this.findAndCount({ where, skip, take, order });
  }
}

export default ProductRepository;
