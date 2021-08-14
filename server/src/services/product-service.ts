import { getCustomRepository } from 'typeorm';
import Product from '../models/product';
import ProductRepository from '../repositories/product-repository';
import { ProductQuery, ProductResponse, ERROR_TYPE } from '../controllers/product-controller';

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
        productDataSorted = this.sortProductData(productDataFilteredByCategory, sort);
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

  private sortProductData(products: Product[], sort: string): Product[] {
    switch (sort) {
      case 'recommend':
        return products;
      case 'popularity':
        return products;
      case 'recent':
        return products;
      case 'priceLow':
        return products;
      case 'priceHigh':
        return products;
      default:
        return products;
    }
  }
}

export default new ProductService();
