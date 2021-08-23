import { action, makeAutoObservable, observable } from 'mobx';
import Cart from '../components/Cart/Cart';
import CartItem from '../models/cart-item';
import { isNone, isNotNone } from '../utils/typeGuard';

const CART_LOCALSTORAGE_KEY = `cart`;
class CartStore {
  @observable
  cartItemList: CartItem[] = [];
  modalCartItemId: number;

  constructor() {
    makeAutoObservable(this);

    const cartItemList = JSON.parse(localStorage.getItem('cart') as string);
    this.cartItemList = cartItemList.map((cart: CartItem) => new CartItem(cart));
    this.modalCartItemId = 0;
  }

  @action
  addProductToCart(productId: number, title: string, imgSrc: string, count: number, price: number) {
    const prevItem = this.cartItemList.find((cartItem) => cartItem.id === productId);
    if (isNotNone(prevItem)) {
      // 이미 장바구니에 추가된 상품.
      return;
    }

    const newCartItem = new CartItem({
      id: productId,
      title,
      imgSrc,
      count,
      price,
      isSelected: true,
    });
    this.cartItemList.push(newCartItem);
    this.setCartItemListToStorage(this.cartItemList);
  }

  getModalCartItem() {
    return this.cartItemList.find((item) => item.id === this.modalCartItemId);
  }

  setModalCartItemCount(count: number) {
    if (isNone(count) || Number.isNaN(count) || count <= 0) {
      count = 0;
    }

    const modalCartItem = this.cartItemList.find((item) => item.id === this.modalCartItemId);
    if (isNone(modalCartItem)) {
      return;
    }
    modalCartItem.count = count;
    this.setCartItemListToStorage(this.cartItemList);
  }

  @action
  setCartItemSelection(id: number, isSelected: boolean) {
    const index = this.cartItemList.findIndex((cartItem) => cartItem.id === id);
    if (index === -1) {
      return;
    }
    this.cartItemList[index] = { ...this.cartItemList[index], isSelected: isSelected };
    this.setCartItemListToStorage(this.cartItemList);
  }

  setCartItemSelectionAll(isSelected: boolean) {
    const nextCartItemList = [...this.cartItemList];
    for (const cartItem of nextCartItemList) {
      cartItem.isSelected = isSelected;
    }

    this.cartItemList = nextCartItemList;
    this.setCartItemListToStorage(this.cartItemList);
  }

  setModalCartItemId(id: number) {
    this.modalCartItemId = id;
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

  getCartItemList() {
    return this.cartItemList;
  }

  removeSelectedItem() {
    this.cartItemList = this.cartItemList.filter((item) => !item.isSelected);
    this.setCartItemListToStorage(this.cartItemList);
  }
}

export default new CartStore();
