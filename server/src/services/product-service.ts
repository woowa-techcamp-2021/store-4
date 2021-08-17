import { getCustomRepository } from 'typeorm';
import Product from '../models/product';
import ProductRepository from '../repositories/product-repository';
import { ProductResponse, FindOption, SortOption } from '../controllers/product-controller';
import ReviewService from './review-service';
import OrderDetailService from './order-detail-service';

class ProductService {
  async findAll({ categoryId, sortOption, pageNum, limit }: FindOption): Promise<ProductResponse> {
    const productRepository = getCustomRepository(ProductRepository);
    if (sortOption === SortOption.Recommend || sortOption === SortOption.Popularity) {
      const where = categoryId === -1 ? {} : { category: categoryId };
      const products = await productRepository.find({ where });

      if (sortOption === SortOption.Recommend)
        return this.findAllAndSortByReviewPoint(products, pageNum, limit);
      else return this.findAllAndSortBySalesCount(products, pageNum, limit);
    }

    const [products, totalCount] = await productRepository.findProducts(
      categoryId,
      sortOption,
      pageNum,
      limit
    );

    const totalPages = Math.ceil(totalCount / limit);

    return { products, totalPages };
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

    return { products: products.slice(skip, skip + limit), totalPages };
  }
}

export default new ProductService();
