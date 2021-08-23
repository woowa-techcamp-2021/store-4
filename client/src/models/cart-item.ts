import { SelectWithSelected } from '../types/product';
import { hasProperty } from '../utils/hasProperty';
import { isNone } from '../utils/typeGuard';

class CartItem {
  id: number;
  title: string;
  imgSrc: string;
  count: number;
  price: number;
  isSelected: boolean;
  selectWithSelected?: SelectWithSelected;

  constructor(data: CartItem) {
    this.id = data.id;
    this.title = data.title;
    this.imgSrc = data.imgSrc;
    this.count = data.count;
    this.price = data.price;
    this.isSelected = data.isSelected;
    this.selectWithSelected = data.selectWithSelected;
  }

  static isCartItem(value: CartItem | unknown): value is CartItem {
    if (isNone(value)) {
      return false;
    }

    if (value instanceof Object) {
      if (
        hasProperty(value, 'id') &&
        hasProperty(value, 'isSelected') &&
        hasProperty(value, 'selectWithSelected')
      ) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  static isCartItemList(value: CartItem[] | unknown): value is CartItem[] {
    if (isNone(value) || !Array.isArray(value)) {
      return false;
    }

    return value.every((item) => CartItem.isCartItem(item));
  }
}

export default CartItem;
