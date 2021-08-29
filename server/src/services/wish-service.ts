import { getCustomRepository } from 'typeorm';
import AlreadyCanceledWish from '../exceptions/already-canceled-wish';
import AlreadyExistWish from '../exceptions/already-exist-wish';
import ProductNotfoundException from '../exceptions/product-notfound-exception';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import Wish from '../models/wish';
import ProductRepository from '../repositories/product-repository';
import UserRepository from '../repositories/user-repository';
import WishRepository from '../repositories/wish-repository';
import { isNone, isNotNone } from '../util/type-guard';

const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: '해당 상품이 존재하지 않습니다',
  USER_NOT_FOUND: '유저가 존재하지 않습니다',
  ALREADY_WISHED_PRODUCT: '이미 찜한 상품입니다',
  ALREADY_UNWISHED_PRODUCT: '이미 취소된 찜입니다',
};

class WishService {
  async insertWish(userId: number, productId: number): Promise<Wish> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES['USER_NOT_FOUND']);
    }

    const product = await getCustomRepository(ProductRepository).findOne(productId);
    if (isNone(product)) {
      throw new ProductNotfoundException(ERROR_MESSAGES['PRODUCT_NOT_FOUND']);
    }

    const existWish = await getCustomRepository(WishRepository).findByUserAndProduct(
      userId,
      productId
    );
    if (isNotNone(existWish)) {
      throw new AlreadyExistWish(ERROR_MESSAGES['ALREADY_WISHED_PRODUCT']);
    }

    return getCustomRepository(WishRepository).save({ user, product });
  }

  async deleteWish(userId: number, productId: number): Promise<void> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES['USER_NOT_FOUND']);
    }
    const product = await getCustomRepository(ProductRepository).findOne(productId);
    if (isNone(product)) {
      throw new ProductNotfoundException(ERROR_MESSAGES['PRODUCT_NOT_FOUND']);
    }

    const wish = await getCustomRepository(WishRepository).findByUserAndProduct(userId, productId);
    if (wish === undefined) {
      throw new AlreadyCanceledWish(ERROR_MESSAGES['ALREADY_UNWISHED_PRODUCT']);
    }

    await getCustomRepository(WishRepository).remove(wish);
  }

  async getWishList(userId: number) {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException(ERROR_MESSAGES['USER_NOT_FOUND']);
    }

    const wishs = await getCustomRepository(WishRepository).findByUser(userId);
    return wishs;
  }
}

export default new WishService();
