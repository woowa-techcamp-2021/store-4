import { getCustomRepository } from 'typeorm';
import Product from '../models/product';
import ProductRepository from '../repositories/product-repository';
import { ProductQuery, ProductResponse, ERROR_TYPE } from '../controllers/product-controller';
import ReviewService from './review-service';
import OrderDetailService from './order-detail-service';

const SORT_OPTIONS = ['recommend', 'popularity', 'recent', 'priceLow', 'priceHigh'];
const ITEMS_PER_PAGE = 20;

class ProductService {
  async findAll({ category, sort, pageNum }: ProductQuery): Promise<ProductResponse> {
    const productsByCategory = await this.filterProductsByCategory(category);

    const productsSorted = await this.sortProducts(productsByCategory, sort);

    const { products, totalPages } = this.paginateProducts(productsSorted, pageNum);

    return { products, totalPages };
  }

  /**
   *
   * @param categoryId URL query : 주어지지 않은 경우 전체 상품 목록 반환
   * @returns 주어진 카테고리 ID에 해당하는 상품 목록
   *
   * @throws 주어진 카테고리 ID에 해당하는 상품이 없을 경우, 카테고리 ID가 유효하지 않은 것으로 간주하고 에러 발생
   */
  private async filterProductsByCategory(categoryId: string | undefined) {
    const productRepository = getCustomRepository(ProductRepository);

    if (categoryId === undefined) return productRepository.find();

    const productsByCategory = await productRepository.findByCategory(+categoryId);
    if (productsByCategory.length === 0) throw ERROR_TYPE.INVALID_CATEGORY;

    return productsByCategory;
  }

  /**
   *
   * @param products
   * @param sortOption URL query : 주어지지 않은 경우 products 그대로 반환
   * @returns 주어진 정렬 옵션에 따라 정렬된 상태의 상품 목록 반환
   *
   * @throws 주어진 정렬 옵션이 SORT_OPTIONS에 존재하지 않으면 에러 발생
   */
  private async sortProducts(
    products: Product[],
    sortOption: string | undefined
  ): Promise<Product[]> {
    if (sortOption === undefined) return products;
    if (!SORT_OPTIONS.includes(sortOption)) throw ERROR_TYPE.INVALID_SORT;

    switch (sortOption) {
      case 'recommend':
        return this.sortByReviewPoints(products);
      case 'popularity':
        return this.sortBySalesCount(products);
      case 'recent':
        return products;
      case 'priceLow':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }

  /**
   *
   * @param products
   * @param pageNum URL query: 주어지지 않은 경우 기본값은 1
   * @returns 주어진 페이지 번호에 맞는 상품 목록, 총 페이지 수 반환
   *
   * @throws 주어진 페이지 번호 형식이 올바르지 않은 경우 에러 발생
   * @throws 주어진 페이지 번호가 총 페이지 수를 초과하면 에러 발생
   */
  private paginateProducts(products: Product[], pageNum: string | undefined) {
    const page = pageNum === undefined ? 1 : +pageNum;
    if (isNaN(page)) throw ERROR_TYPE.INVALID_PAGE;

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    if (page > totalPages) throw ERROR_TYPE.PAGE_OVERFLOW;

    const productsByPage = products.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page);

    return { products: productsByPage, totalPages };
  }

  private async sortByReviewPoints(products: Product[]): Promise<Product[]> {
    const reviewPoints = await Promise.all(
      products.map(({ id }) => ReviewService.getAveragePointOfProduct(id))
    );

    const reviewPointsByProductId: { [key: string]: number } = {};
    products.forEach(({ id }, index) => (reviewPointsByProductId[id] = reviewPoints[index]));

    return [...products].sort(
      (a, b) => reviewPointsByProductId[b.id] - reviewPointsByProductId[a.id]
    );
  }

  private async sortBySalesCount(products: Product[]): Promise<Product[]> {
    const salesCounts = await Promise.all(
      products.map(({ id }) => OrderDetailService.getTotalOrderCountOfProduct(id))
    );

    const salesCountByProductId: { [key: string]: number } = {};
    products.forEach(({ id }, index) => (salesCountByProductId[id] = salesCounts[index]));

    return [...products].sort((a, b) => salesCountByProductId[b.id] - salesCountByProductId[a.id]);
  }
}

export default new ProductService();
