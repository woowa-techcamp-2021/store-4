import { isNone } from '../utils/typeGuard';

class CartItem {
  id: number;
  title: string;
  imgSrc: string;
  count: number;
  price: number;
  isSelected: boolean;

  constructor(data: CartItem) {
    this.id = data.id;
    this.title = data.title;
    this.imgSrc = data.imgSrc;
    this.count = data.count;
    this.price = data.price;
    this.isSelected = data.isSelected;
  }

  static isCartItem(value: CartItem | unknown): value is CartItem {
    if (isNone(value)) {
      return false;
    }

    return value instanceof CartItem;
  }

  static isCartItemList(value: CartItem[] | unknown): value is CartItem[] {
    if (isNone(value) || !Array.isArray(value)) {
      return false;
    }

    return value.every((item) => item instanceof CartItem);
  }
}

export default CartItem;
