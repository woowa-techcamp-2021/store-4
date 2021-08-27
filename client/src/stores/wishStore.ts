import apis from '../api';

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
}

export default new WishStore();
