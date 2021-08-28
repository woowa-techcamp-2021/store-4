import apis from '../api';
import { WishResponse } from '../types/Wish';

class WishStore {
  async changeWishedTo(productId: number, wished: boolean) {
    const token = localStorage.getItem('token');
    if (token === null) {
      return;
    }

    if (wished) {
      await apis.productAPI.wish(token, productId);
    } else {
      await apis.productAPI.cancelWish(token, productId);
    }
  }

  async getWishList(userId: number): Promise<WishResponse[]> {
    const token = localStorage.getItem('token');
    const { wishList } = await apis.productAPI.fetchWishList(token, +userId);
    return wishList;
  }
}

export default new WishStore();
