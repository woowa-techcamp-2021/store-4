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

class WishService {
  async insertWish(userId: number, productId: number): Promise<Wish> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException('유저가 없습니다.');
    }

    const product = await getCustomRepository(ProductRepository).findOne(productId);
    if (isNone(product)) {
      throw new ProductNotfoundException('상품이 존재하지 않습니다.');
    }

    const existWish = await getCustomRepository(WishRepository).findByUserAndProduct(
      userId,
      productId
    );
    if (isNotNone(existWish)) {
      throw new AlreadyExistWish('이미 찜한 상품입니다');
    }

    return getCustomRepository(WishRepository).save({ user, product });
  }

  async deleteWish(userId: number, productId: number): Promise<void> {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException('유저가 없습니다.');
    }
    const product = await getCustomRepository(ProductRepository).findOne(productId);
    if (isNone(product)) {
      throw new ProductNotfoundException('상품이 존재하지 않습니다.');
    }

    const wish = await getCustomRepository(WishRepository).findByUserAndProduct(userId, productId);
    if (wish === undefined) {
      throw new AlreadyCanceledWish('이미 취소된 찜입니다');
    }

    await getCustomRepository(WishRepository).remove(wish);
  }

  async getWishList(userId: number) {
    const user = await getCustomRepository(UserRepository).findOne(userId);
    if (isNone(user)) {
      throw new UserNotfoundException('유저가 없습니다.');
    }

    const wishs = await getCustomRepository(WishRepository).findByUser(userId);
    return wishs;
  }
}

export default new WishService();
