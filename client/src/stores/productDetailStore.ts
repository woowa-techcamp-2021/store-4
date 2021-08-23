import { action, observable, runInAction } from 'mobx';
import apis from '../api';
import Product from '../models/product';

class ProductDetailStore {
  @observable
  product!: Product | null;

  @action
  async fetchProduct(id: number): Promise<void> {
    const fetchedProduct = await apis.productAPI.fetchProduct(id);

    runInAction(() => {
      this.product = new Product(fetchedProduct);
    });
  }
}

export default ProductDetailStore;
