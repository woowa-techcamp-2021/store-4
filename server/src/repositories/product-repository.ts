import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Product from '../models/product';
import { SortOption } from '../controllers/product-controller';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  async findProduct(id: number): Promise<Product | undefined> {
    return createQueryBuilder(Product)
      .leftJoinAndSelect('Product.productImages', 'productImages')
      .leftJoinAndSelect('Product.reviews', 'reviews')
      .leftJoinAndSelect('reviews.user', 'user')
      .leftJoinAndSelect('reviews.reviewImages', 'reviewImages')
      .leftJoinAndSelect('Product.productSelects', 'productSelects')
      .leftJoinAndSelect('productSelects.productOptions', 'productOptions')
      .where({ id })
      .getOne();
  }

  findProducts(
    categoryId: number,
    sortOption: SortOption,
    pageNum: number,
    limit: number
  ): Promise<[Product[], number]> {
    const where = categoryId === -1 ? {} : { category: categoryId };
    const skip = (pageNum - 1) * limit;
    const take = limit;

    let order: { [key: string]: 'ASC' | 'DESC' };
    switch (sortOption) {
      case SortOption.Recent:
        order = { updatedAt: 'DESC' };
        break;
      case SortOption.PriceHigh:
        order = { price: 'DESC' };
        break;
      case SortOption.PriceLow:
        order = { price: 'ASC' };
        break;
      default:
        order = { updatedAt: 'DESC' };
    }

    return this.findAndCount({ where, skip, take, order });
  }
}

export default ProductRepository;
