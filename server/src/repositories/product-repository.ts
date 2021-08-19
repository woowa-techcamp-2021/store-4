import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import Product from '../models/product';
import { FindOption, SortOption } from '../controllers/product-controller';

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

  async findProducts({
    categoryId,
    sortOption,
    pageNum,
    limit,
  }: FindOption): Promise<[Product[], number]> {
    const query = createQueryBuilder(Product);

    if (categoryId !== null) query.where({ category: categoryId });

    query.leftJoinAndSelect('Product.productImages', 'images');

    switch (sortOption) {
      case SortOption.Recommend:
        query
          .leftJoin('Product.reviews', 'reviews')
          .groupBy('Product.id')
          .orderBy('AVG(reviews.point)', 'DESC');
        break;
      case SortOption.Popularity:
        query
          .leftJoin('Product.orderDetails', 'orderDetails')
          .groupBy('Product.id')
          .orderBy('COUNT(orderDetails.id)', 'DESC');
        break;
      case SortOption.Recent:
        query.orderBy('updated_at', 'DESC');
        break;
      case SortOption.PriceHigh:
        query.orderBy('price', 'DESC');
        break;
      case SortOption.PriceLow:
        query.orderBy('price', 'ASC');
        break;
    }

    query.offset((pageNum - 1) * limit);
    query.limit(limit);

    return query.getManyAndCount();
  }
}

export default ProductRepository;
