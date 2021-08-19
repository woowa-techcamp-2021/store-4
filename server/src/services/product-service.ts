import { getCustomRepository } from 'typeorm';
import Product from '../models/product';
import ProductRepository from '../repositories/product-repository';
import { ProductResponse, FindOption, SortOption } from '../controllers/product-controller';
import ReviewService from './review-service';
import OrderDetailService from './order-detail-service';
import PageOverflowException from '../exceptions/page-overflow-exception';
import WishRepository from '../repositories/wish-repository';
import ProductNotfoundException from '../exceptions/product-notfound-exception';

const ERROR_MESSAGES = {
  PAGE_OVERFLOW: '요청한 페이지가 전체 페이지 수를 초과했습니다',
  PRODUCT_NOTFOUND: '요청한 상품이 존재하지 않습니다',
};

class ProductService {
  async findAll({ categoryId, sortOption, pageNum, limit }: FindOption): Promise<ProductResponse> {
    const productRepository = getCustomRepository(ProductRepository);
    if (sortOption === SortOption.Recommend || sortOption === SortOption.Popularity) {
      const where = categoryId === -1 ? {} : { category: categoryId };
      const products = await productRepository.find({ where });

      if (sortOption === SortOption.Recommend) {
        return this.findAllAndSortByReviewPoint(products, pageNum, limit);
      } else {
        return this.findAllAndSortBySalesCount(products, pageNum, limit);
      }
    }

    const [products, totalCount] = await productRepository.findProducts(
      categoryId,
      sortOption,
      pageNum,
      limit
    );

    const totalPages = Math.ceil(totalCount / limit);

    if (pageNum > totalPages) {
      throw new PageOverflowException(ERROR_MESSAGES.PAGE_OVERFLOW);
    }

    return { products, totalPages };
  }

  async findOne(userId: number | null, productId: number) {
    const productRepository = getCustomRepository(ProductRepository);
    const wishRepository = getCustomRepository(WishRepository);

    const product = await productRepository.findProduct(productId);
    if (product === undefined) {
      throw new ProductNotfoundException(ERROR_MESSAGES.PRODUCT_NOTFOUND);
    }

    let isWished = false;
    if (userId !== null) {
      const myWish = await wishRepository.findByUserAndProduct(userId, productId);
      isWished = myWish === undefined ? false : true;
    }

    return {
      ...product,
      isWished,
    };
  }

  private async findAllAndSortByReviewPoint(
    products: Product[],
    pageNum: number,
    limit: number
  ): Promise<ProductResponse> {
    const reviewPoints = await Promise.all(
      products.map(({ id }) => ReviewService.getAveragePointOfProduct(id))
    );

    const reviewPointsByProductId: { [key: string]: number } = {};
    products.forEach(({ id }, index) => (reviewPointsByProductId[id] = reviewPoints[index]));
    products.sort((a, b) => reviewPointsByProductId[b.id] - reviewPointsByProductId[a.id]);

    const skip = (pageNum - 1) * limit;
    const totalPages = Math.ceil(products.length / limit);

    if (pageNum > totalPages) {
      throw new PageOverflowException(ERROR_MESSAGES.PAGE_OVERFLOW);
    }

    return { products: products.slice(skip, skip + limit), totalPages };
  }

  private async findAllAndSortBySalesCount(
    products: Product[],
    pageNum: number,
    limit: number
  ): Promise<ProductResponse> {
    const salesCounts = await Promise.all(
      products.map(({ id }) => OrderDetailService.countTotalSalesOfProduct(id))
    );

    const salesCountByProductId: { [key: string]: number } = {};
    products.forEach(({ id }, index) => (salesCountByProductId[id] = salesCounts[index]));
    products.sort((a, b) => salesCountByProductId[b.id] - salesCountByProductId[a.id]);

    const skip = (pageNum - 1) * limit;
    const totalPages = Math.ceil(products.length / limit);

    if (pageNum > totalPages) {
      throw new PageOverflowException(ERROR_MESSAGES.PAGE_OVERFLOW);
    }

    return { products: products.slice(skip, skip + limit), totalPages };
  }
}

export default new ProductService();
