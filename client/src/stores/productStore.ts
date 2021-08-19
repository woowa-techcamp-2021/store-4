import { action } from 'mobx';
import apis from '../api';
import Product from '../models/product';
import { Option } from '../types/option';

class ProductStore {
  @action
  async fetchProducts(option: Option) {
    const { products, totalPages } = await apis.productAPI.fetchProducts(option);
    return {
      products: products.map((product: Product) => new Product(product)),
      totalPages,
    };
  }
}

export default new ProductStore();
