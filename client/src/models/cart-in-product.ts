import Product from './product';
import { SelectWithSelected } from '../types/product';
import ProductOption from './product-option';

export const STOCK = 99;

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
  private get selectedOptions(): ProductOption[] {
    const isNotNullSelect = (selected: ProductOption | null): selected is ProductOption =>
      selected !== null;

    const selectedOptions = this.options
      .map((option) => option.selectedOption)
      .filter(isNotNullSelect);

    return selectedOptions;
  }

  get totalPrice(): number {
    return this.count * this.product.calcTotalPrice(this.selectedOptions);
  }

  get titleWithOption(): string {
    const options = this.selectedOptions.map((selected) => selected.name).join('_');

    return options.length > 0 ? `${this.product.name} (${options})` : this.product.name;
  }
}

export default CartInProduct;
