import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { SortOption } from '../enum/product';
import Product from '../models/product';
import { isNotNone } from '../util/type-guard';
import ProductFindQuery from '../validations/product-find-query';

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
    category,
    sort,
    pageNum,
    limit,
  }: ProductFindQuery): Promise<[Product[], number]> {
    const query = createQueryBuilder(Product);

    if (isNotNone(category)) {
      query.where({ category });
    }

    query.leftJoinAndSelect('Product.productImages', 'images');

    switch (sort) {
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

  async findPopularProducts(limit: number): Promise<Product[]> {
    return createQueryBuilder(Product)
      .leftJoinAndSelect('Product.productImages', 'productImages')
      .leftJoin('Product.orderDetails', 'orderDetails')
      .groupBy('Product.id')
      .orderBy('COUNT(orderDetails.id)', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findOrderByDiscountRate(limit: number): Promise<Product[]> {
    return createQueryBuilder(Product)
      .leftJoinAndSelect('Product.productImages', 'productImages')
      .orderBy('discount_rate', 'DESC')
      .limit(limit)
      .getMany();
  }

  async findOrderByCreatedAt(limit: number): Promise<Product[]> {
    return createQueryBuilder(Product)
      .leftJoinAndSelect('Product.productImages', 'productImages')
      .orderBy('created_at', 'DESC')
      .limit(limit)
      .getMany();
  }
}

export default ProductRepository;
