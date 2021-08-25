import { getCustomRepository } from 'typeorm';
import ProductRepository from '../repositories/product-repository';
import { ProductResponse } from '../controllers/product-controller';
import PageOverflowException from '../exceptions/page-overflow-exception';
import WishRepository from '../repositories/wish-repository';
import ProductNotfoundException from '../exceptions/product-notfound-exception';
import ProductFindQuery from '../validations/product-find-query';
import Product from '../models/product';
import UserRepository from '../repositories/user-repository';

const ERROR_MESSAGES = {
  PAGE_OVERFLOW: '요청한 페이지가 전체 페이지 수를 초과했습니다',
  PRODUCT_NOTFOUND: '요청한 상품이 존재하지 않습니다',
};

type ProductWithIsWished = Product & {
  isWished: boolean;
};

class ProductService {
  async findAll(productFindQuery: ProductFindQuery): Promise<ProductResponse> {
    const { pageNum, limit } = productFindQuery;
    const [products, totalProductCount] = await getCustomRepository(ProductRepository).findProducts(
      productFindQuery
    );

    const totalPages = Math.ceil(totalProductCount / limit);

    if (totalProductCount > 0 && pageNum > totalPages) {
      throw new PageOverflowException(ERROR_MESSAGES.PAGE_OVERFLOW);
    }

    return { products, totalPages, totalProductCount };
  }

  async findOne(userId: number | null, productId: number) {
    const productRepository = getCustomRepository(ProductRepository);
    const wishRepository = getCustomRepository(WishRepository);
    const userRepository = getCustomRepository(UserRepository);

    const product = await productRepository.findProduct(productId);
    if (product === undefined) {
      throw new ProductNotfoundException(ERROR_MESSAGES.PRODUCT_NOTFOUND);
    }

    let isWished = false;
    if (userId !== null) {
      const myWish = await wishRepository.findByUserAndProduct(userId, productId);
      isWished = myWish === undefined ? false : true;
    }

    let isOrdered = false;
    if (userId !== null) {
      const user = await userRepository.findWithProduct(userId, productId);
      isOrdered = user === undefined ? false : true;
    }

    return {
      ...product,
      isWished,
      isOrdered,
    };
  }

  async findPopularProducts(
    userId: number | undefined,
    limit: number
  ): Promise<ProductWithIsWished[]> {
    const products = await getCustomRepository(ProductRepository).findPopularProducts(limit);

    return this.withIsWished(userId, products);
  }

  async findDiscountingProducts(
    userId: number | undefined,
    limit: number
  ): Promise<ProductWithIsWished[]> {
    const products = await getCustomRepository(ProductRepository).findOrderByDiscountRate(limit);

    return this.withIsWished(userId, products);
  }

  async findNewProducts(userId: number | undefined, limit: number): Promise<ProductWithIsWished[]> {
    const products = await getCustomRepository(ProductRepository).findOrderByCreatedAt(limit);

    return this.withIsWished(userId, products);
  }

  private async withIsWished(
    userId: number | undefined,
    products: Product[]
  ): Promise<(Product & { isWished: boolean })[]> {
    const wishes = await (userId !== undefined
      ? getCustomRepository(WishRepository).findByUser(userId)
      : Promise.resolve([]));

    console.log(wishes);

    return products.map((product) => ({
      ...product,
      isWished: wishes.find((wish) => wish.product.id === product.id) !== undefined,
    }));
  }
}

export default new ProductService();
