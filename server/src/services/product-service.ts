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
    const productDataFilteredByCategory = await this.findByCategory(category);
    if (productDataFilteredByCategory.length === 0) throw ERROR_TYPE.INVALID_CATEGORY;

    let productDataSorted;
    if (sort === undefined) {
      productDataSorted = productDataFilteredByCategory;
    }
    // sort option given
    else {
      if (SORT_OPTIONS.includes(sort)) {
        productDataSorted = await this.sortProductData(productDataFilteredByCategory, sort);
      }
      // unknown option
      else throw ERROR_TYPE.INVALID_SORT;
    }

    const page = pageNum === undefined ? 1 : +pageNum;
    const totalPages = this.getTotalPages(productDataSorted);
    if (page > totalPages) throw ERROR_TYPE.INVALID_PAGE;

    const productData = productDataSorted.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page);

    return { products: productData, totalPages };
  }

  private findByCategory(categoryId: string | undefined) {
    const productRepository = getCustomRepository(ProductRepository);

    if (categoryId === undefined) return productRepository.find();

    return productRepository.findByCategory(+categoryId);
  }

  private getTotalPages(products: Product[]): number {
    return Math.ceil(products.length / ITEMS_PER_PAGE);
  }

  private async sortProductData(products: Product[], sort: string): Promise<Product[]> {
    switch (sort) {
      case 'recommend':
        return this.sortByReviewPoints(products);
      case 'popularity':
        return this.sortBySalesCount(products);
      case 'recent':
        return products;
      case 'priceLow':
        return [...products].sort((a, b) => parseInt(a.price) - parseInt(b.price));
      case 'priceHigh':
        return [...products].sort((a, b) => parseInt(b.price) - parseInt(a.price));
      default:
        return products;
    }
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
