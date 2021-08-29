import apis from '../api';
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
}

export default new WishStore();
