import Product from './product';
import { SelectWithSelected } from '../types/product';
import ProductOption from './product-option';

class CartInProductAttrs {
  uuid: string;
  options: SelectWithSelected[];
  count: number;
  product: Product;

  constructor(cartInProduct: CartInProductAttrs) {
    this.uuid = cartInProduct.uuid;
    this.options = cartInProduct.options;
    this.count = cartInProduct.count;
    this.product = cartInProduct.product;
  }
}

class CartInProduct extends CartInProductAttrs {
  get totalPrice(): number {
    const selectedOptions = this.options
      .map((option) => option.selectedOption)
      .filter((selected): selected is ProductOption => selected !== null);

    return this.count * this.product.calcTotalPrice(selectedOptions);
  }

  get titleWithOption(): string {
    const options = this.options
      .map((option) => option.selectedOption)
      .filter((selected): selected is ProductOption => selected !== null)
      .map((selected) => selected.name)
      .join('_');

    return options.length > 0 ? `${this.product.name} (${options})` : this.product.name;
  }
}

export default CartInProduct;
