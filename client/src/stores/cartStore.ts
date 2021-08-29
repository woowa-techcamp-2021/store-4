import { action, makeAutoObservable, observable } from 'mobx';
import CartInProduct from '../models/cart-in-product';
import CartItem from '../models/cart-item';
import { isNone } from '../utils/typeGuard';
import NOIMAGE from '../assets/images/no-image.png';
import { SelectWithSelected } from '../types/product';
import OrderDetailProduct from '../models/orderDetailProduct';

const CART_LOCALSTORAGE_KEY = `cart`;

const isDuplicatedSelection = (
  selectsWithSelectedA: SelectWithSelected[],
  selectsWithSelectedB: SelectWithSelected[]
) => {
  const selectedOptionsA = selectsWithSelectedA.map((selects) => selects.selectedOption);
  const selectedOptionsB = selectsWithSelectedB.map((selects) => selects.selectedOption);

  return selectedOptionsA.every((value, index) => value?.id === selectedOptionsB[index]?.id);
};

class CartStore {
  @observable
  cartItemList: CartItem[] = [];
  modalCartItemUuid: string;

  constructor() {
    makeAutoObservable(this);

    const cartItemList = this.getCartItemListFromStorage();
    this.cartItemList = cartItemList.map((cart: CartItem) => new CartItem(cart));
    this.modalCartItemUuid = '';
  }

  @action
  addProductsToCart(cartsInProduct: CartInProduct[]) {
    const nextCartItemList = [...this.cartItemList];

    cartsInProduct.forEach((cartInProduct) => {
      const existedCartItemIndex = this.findDuplicateCartItemIndex(cartInProduct);

      if (existedCartItemIndex !== -1) {
        const existedCartItem = this.cartItemList[existedCartItemIndex];
        const nextCount = existedCartItem.count + cartInProduct.count;

        const updatedCartItem = new CartItem({
          ...existedCartItem,
          count: nextCount,
        });

        nextCartItemList[existedCartItemIndex] = updatedCartItem;
      } else {
        const { uuid, product, count, options } = cartInProduct;
        const newCartItem = new CartItem({
          uuid,
          productId: product.id,
          title: product.name,
          imgSrc: product.thumbnail || NOIMAGE,
          count,
          price: product.price,
          isSelected: true,
          selectWithSelecteds: options,
        });

        nextCartItemList.push(newCartItem);
      }
    });

    this.cartItemList = nextCartItemList;
    this.setCartItemListToStorage();
  }

  private findDuplicateCartItemIndex(cartInProduct: CartInProduct): number {
    return this.cartItemList.findIndex((cartItem) => {
      return (
        cartItem.title === cartInProduct.product.name &&
        isDuplicatedSelection(cartItem.selectWithSelecteds, cartInProduct.options)
      );
    });
  }

  getModalCartItem() {
    return this.cartItemList.find((item) => item.uuid === this.modalCartItemUuid);
  }

  setModalCartItemCount(count: number) {
    if (count <= 0) {
      count = 1;
    }

    const index = this.cartItemList.findIndex(
      (cartItem) => cartItem.uuid === this.modalCartItemUuid
    );
    if (index === -1) {
      return;
    }

    this.cartItemList[index] = { ...this.cartItemList[index], count: count };
    this.setCartItemListToStorage();
  }

  @action
  setCartItemSelection(uuid: string, isSelected: boolean) {
    const index = this.cartItemList.findIndex((cartItem) => cartItem.uuid === uuid);
    if (index === -1) {
      return;
    }
    this.cartItemList[index] = { ...this.cartItemList[index], isSelected: isSelected };
    this.setCartItemListToStorage();
  }

  @action
  setCartItemSelectionAll(isSelected: boolean) {
    const nextCartItemList = [...this.cartItemList];
    for (const cartItem of nextCartItemList) {
      cartItem.isSelected = isSelected;
    }

    this.cartItemList = nextCartItemList;
    this.setCartItemListToStorage();
  }

  @action
  setModalCartItemId(uuid: string) {
    this.modalCartItemUuid = uuid;
  }

  setCartItemListToStorage() {
    localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(this.cartItemList));
  }

  getCartItemListFromStorage() {
    const item = localStorage.getItem('cart');
    if (isNone(item)) {
      return [];
    }
    try {
      const cartItemList = JSON.parse(item);
      if (!CartItem.isCartItemList(cartItemList)) {
        return [];
      }
      return cartItemList;
    } catch {
      return [];
    }
  }

  @action
  removeSelectedItem() {
    this.cartItemList = this.cartItemList.filter((item) => !item.isSelected);
    this.setCartItemListToStorage();
  }

  @action
  removeOrderCompleteItems(orderDetailProductList: OrderDetailProduct[]) {
    this.cartItemList = this.cartItemList.filter((cartItem) => {
      return orderDetailProductList.some((orderDetailProduct) => {
        return orderDetailProduct.uuid !== cartItem.uuid;
      });
    });
    this.setCartItemListToStorage();
  }

  get isNothingSelectedCartItems() {
    return this.cartItemList.every((cartItem) => !cartItem.isSelected);
  }

  get selectedCartItemList() {
    return this.cartItemList.filter((cartItem) => cartItem.isSelected);
  }
}

export default new CartStore();
