import { action } from 'mobx';
import apis from '../api';
import Product from '../models/product';
import { Option } from '../types/option';

class ProductStore {
  @action
  async fetchProducts(option: Option) {
    const { products, totalPages, totalProductCount } = await apis.productAPI.fetchProducts(option);
    return {
      products: products.map((product: Product) => new Product(product)),
      totalPages,
      totalProductCount,
    };
  }

  @action
  async fetchMainProducts() {
    const { popularProducts, discountingProducts, newProducts } =
      await apis.productAPI.fetchMainProducts();

    return {
      popularProducts,
      discountingProducts,
      newProducts,
    };
  }
}

export default new ProductStore();
