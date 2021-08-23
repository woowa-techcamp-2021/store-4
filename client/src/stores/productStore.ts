import apis from '../api';
import Product from '../models/product';
import { Option } from '../types/option';

class ProductStore {
  async fetchProducts(option: Option) {
    const { products, totalPages, totalProductCount } = await apis.productAPI.fetchProducts(option);
    return {
      products: products.map((product: Product) => new Product(product)),
      totalPages,
      totalProductCount,
    };
  }

  async fetchMainProducts() {
    const { popularProducts, discountingProducts, newProducts } =
      await apis.productAPI.fetchMainProducts();

    const modelingProduct = (product: Product) => new Product(product);

    return {
      popularProducts: popularProducts.map(modelingProduct),
      discountingProducts: discountingProducts.map(modelingProduct),
      newProducts: newProducts.map(modelingProduct),
    };
  }
}

export default new ProductStore();
