import { getCustomRepository } from 'typeorm';
import ProductNotfoundException from '../exceptions/product-notfound-exception';
import UserNotfoundException from '../exceptions/user-notfound-exception';
import Wish from '../models/wish';
import ProductRepository from '../repositories/product-repository';
import UserRepository from '../repositories/user-repository';
import WishRepository from '../repositories/wish-repository';
import { isNone } from '../util/type-guard';

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

    return getCustomRepository(WishRepository).save({ user, product });
  }
}

export default new WishService();
