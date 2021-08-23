import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import apis from '../api';
import Product from '../models/product';

class ProductDetailStore {
  @observable
  product: Product | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchProduct(id: number): Promise<void> {
    const { product } = await apis.productAPI.fetchProduct(id);

    runInAction(() => {
      this.product = new Product(product);
    });
  }

  @action
  async toggleWish(): Promise<void> {
    if (this.product === null) {
      return;
    }

    const { id, isWished } = this.product;
    if (isWished) {
      await apis.productAPI.cancelWish(id);
    } else {
      await apis.productAPI.wish(id);
    }

    runInAction(() => {
      if (this.product !== null) {
        this.product = new Product({
          ...this.product,
          isWished: !isWished,
        });
      }
    });
  }

  resetProduct() {
    this.product = null;
  }
}

export default new ProductDetailStore();
