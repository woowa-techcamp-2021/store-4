import { action, makeAutoObservable, observable } from 'mobx';
import CartInProduct from '../models/cart-in-product';
import CartItem from '../models/cart-item';
import { isNone, isNotNone } from '../utils/typeGuard';
import NOIMAGE from '../assets/images/no-image.png';
import { SelectWithSelected } from '../types/product';
import OrderDetailProduct from '../models/orderDetailProduct';

const CART_LOCALSTORAGE_KEY = `cart`;

const isDuplicated = (
  selectsWithSelectedA: SelectWithSelected[],
  selectsWithSelectedB: SelectWithSelected[]
) => {
  const selectedOptionsA = selectsWithSelectedA.map((selects) => selects.selectedOption);
  const selectedOptionsB = selectsWithSelectedB.map((selects) => selects.selectedOption);

  return selectedOptionsA.every((value, index) => value?.id === selectedOptionsB[index]?.id);
};

const isDuplicatedCartItem = (cartInProduct: CartInProduct) => (cartItem: CartItem) => {
  return (
    isDuplicated(cartItem.selectWithSelecteds, cartInProduct.options) &&
    cartItem.title === cartInProduct.product.name
  );
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
    const existedCartItems: { [key: number]: CartInProduct } = {};
    const notExistedCartInProducts: CartInProduct[] = [];

    cartsInProduct.forEach((cartInProduct, index) => {
      if (this.cartItemList.some(isDuplicatedCartItem(cartInProduct))) {
        existedCartItems[index] = cartInProduct;
        return;
      }
      notExistedCartInProducts.push(cartInProduct);
    });

    this.cartItemList = this.cartItemList.map((cartItem, index) => {
      if (isNotNone(existedCartItems[index])) {
        const count = cartItem.count + existedCartItems[index].count;
        const updatedCartItem = new CartItem({
          ...cartItem,
          count,
        });

        return updatedCartItem;
      }
      return cartItem;
    });

    const noxExistedCartItemList = notExistedCartInProducts.map((cartInProduct) => {
      const { uuid, product, count, options } = cartInProduct;
      return new CartItem({
        uuid,
        productId: product.id,
        title: product.name,
        imgSrc: product.thumbnail || NOIMAGE,
        count,
        price: product.price,
        isSelected: true,
        selectWithSelecteds: options,
      });
    });

    this.cartItemList.push(...noxExistedCartItemList);
    this.setCartItemListToStorage(this.cartItemList);
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
    this.setCartItemListToStorage(this.cartItemList);
  }

  @action
  setCartItemSelection(uuid: string, isSelected: boolean) {
    const index = this.cartItemList.findIndex((cartItem) => cartItem.uuid === uuid);
    if (index === -1) {
      return;
    }
    this.cartItemList[index] = { ...this.cartItemList[index], isSelected: isSelected };
    this.setCartItemListToStorage(this.cartItemList);
  }

  @action
  setCartItemSelectionAll(isSelected: boolean) {
    const nextCartItemList = [...this.cartItemList];
    for (const cartItem of nextCartItemList) {
      cartItem.isSelected = isSelected;
    }

    this.cartItemList = nextCartItemList;
    this.setCartItemListToStorage(this.cartItemList);
  }

  @action
  setModalCartItemId(uuid: string) {
    this.modalCartItemUuid = uuid;
  }

  setCartItemListToStorage(cartItemList: CartItem[]) {
    localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(cartItemList));
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
    this.setCartItemListToStorage(this.cartItemList);
  }

  @action
  removeOrderCompleteItems(orderDetailProductList: OrderDetailProduct[]) {
    this.cartItemList = this.cartItemList.filter((cartItem) => {
      return orderDetailProductList.some((orderDetailProduct) => {
        return orderDetailProduct.uuid !== cartItem.uuid;
      });
    });
  }

  get isNothingSelectedCartItems() {
    return this.cartItemList.every((cartItem) => !cartItem.isSelected);
  }

  get selectedCartItemList() {
    return this.cartItemList.filter((cartItem) => cartItem.isSelected);
  }
}

export default new CartStore();
