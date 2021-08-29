import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import apis from '../api';
import Product from '../models/product';
import userStore from './userStore';
import wishStore from './wishStore';

class ProductDetailStore {
  @observable
  product: Product | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchProduct(id: number): Promise<void> {
    const token = userStore.token;

    const { product } = await apis.productAPI.fetchProduct(token, id);

    runInAction(() => {
      this.product = new Product(product);
    });
  }

  @action
  async toggleWish(): Promise<void> {
    if (this.product === null) {
      return;
    }

    const originWished = this.product.isWished;
    runInAction(() => {
      if (this.product !== null) {
        this.product = new Product({
          ...this.product,
          isWished: !originWished,
        });
      }
    });

    const { id } = this.product;
    try {
      await wishStore.changeWishedTo(id, !originWished);
    } catch (error) {
      runInAction(() => {
        if (this.product !== null) {
          this.product = new Product({
            ...this.product,
            isWished: originWished,
          });
        }
      });
      throw error;
    }
  }

  resetProduct() {
    this.product = null;
  }
}

export default new ProductDetailStore();
