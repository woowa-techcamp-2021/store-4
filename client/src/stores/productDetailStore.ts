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

  resetProduct() {
    this.product = null;
  }
}

export default new ProductDetailStore();
