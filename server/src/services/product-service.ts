import { getCustomRepository } from 'typeorm';
import ProductRepository from '../repositories/product-repository';
import { ProductResponse, FindOption } from '../controllers/product-controller';
import PageOverflowException from '../exceptions/page-overflow-exception';
import WishRepository from '../repositories/wish-repository';
import ProductNotfoundException from '../exceptions/product-notfound-exception';

const ERROR_MESSAGES = {
  PAGE_OVERFLOW: '요청한 페이지가 전체 페이지 수를 초과했습니다',
  PRODUCT_NOTFOUND: '요청한 상품이 존재하지 않습니다',
};

class ProductService {
  async findAll({ categoryId, sortOption, pageNum, limit }: FindOption): Promise<ProductResponse> {
    const [products, totalProductCount] = await getCustomRepository(ProductRepository).findProducts(
      { categoryId, sortOption, pageNum, limit }
    );

    const totalPages = Math.ceil(totalProductCount / limit);

    if (totalProductCount && pageNum > totalPages) {
      throw new PageOverflowException(ERROR_MESSAGES.PAGE_OVERFLOW);
    }

    return { products, totalPages, totalProductCount };
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
}

export default new ProductService();
