import apis from '../api';
import { WishResponse } from '../types/Wish';
import userStore from './userStore';

class WishStore {
  async changeWishedTo(productId: number, wished: boolean) {
    const token = userStore.token;

    if (wished) {
      await apis.productAPI.wish(token, productId);
    } else {
      await apis.productAPI.cancelWish(token, productId);
    }
  }

  async fetchWishList(): Promise<WishResponse[]> {
    const token = localStorage.getItem('token');
    const { wishList } = await apis.productAPI.fetchWishList(token);
    return wishList;
  }
}

export default new WishStore();
