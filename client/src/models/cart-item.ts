import { SelectWithSelected } from '../types/product';
import { hasProperty } from '../utils/hasProperty';
import { isNone } from '../utils/typeGuard';

export const STOCK = 99;

class CartItem {
  uuid: string;
  productId: number;
  title: string;
  imgSrc: string;
  count: number;
  price: number;
  isSelected: boolean;
  selectWithSelecteds: SelectWithSelected[];

  constructor(data: CartItem) {
    this.uuid = data.uuid;
    this.productId = data.productId;
    this.title = data.title;
    this.imgSrc = data.imgSrc;
    this.count = data.count;
    this.price = data.price;
    this.isSelected = data.isSelected;
    this.selectWithSelecteds = data.selectWithSelecteds;
  }

  static isCartItem(value: CartItem | unknown): value is CartItem {
    if (isNone(value)) {
      return false;
    }

    if (value instanceof Object) {
      if (
        hasProperty(value, 'uuid') &&
        hasProperty(value, 'isSelected') &&
        hasProperty(value, 'selectWithSelecteds')
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
