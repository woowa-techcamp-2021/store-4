import { makeAutoObservable, observable } from 'mobx';
import CartItem from '../models/cartItem';
import { isNone, isNotNone } from '../utils/typeGuard';

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
    } as CartItem);
    this.cartItemList.push(newCartItem);
    this.setCartItemList(this.cartItemList);
  }

  getModalCartItem() {
    return this.getCartItemById(this.modalCartItemId);
  }

  setModalCartItemCount(count: number) {
    if (isNone(count) || Number.isNaN(count) || count <= 0) {
      count = 0;
    }
    const modalCartItem = this.getCartItemById(this.modalCartItemId);
    modalCartItem.count = isNotNone(count) ? count : modalCartItem.count;
    this.cartItemList = [...this.cartItemList];
    this.setCartItemList(this.cartItemList);
  }

  setCartItemSelection(id: number, isSelected: boolean) {
    const cartItem = this.getCartItemById(id);
    cartItem.isSelected = isSelected;
    this.cartItemList = [...this.cartItemList];
    this.setCartItemList(this.cartItemList);
  }

  setCartItemSelectionAll(isSelected: boolean) {
    for (const cartItem of this.cartItemList) {
      cartItem.isSelected = isSelected;
    }

    this.cartItemList = [...this.cartItemList];
    this.setCartItemList(this.cartItemList);
  }

  setModalCartItemId(id: number) {
    this.modalCartItemId = id;
  }

  getCartItemById(id: number) {
    return this.cartItemList.filter((item) => item.id === id)[0];
  }

  setCartItemList(cartItemList: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cartItemList));
  }

  getCartItemList() {
    return this.cartItemList;
  }

  removeSelectedItem() {
    this.cartItemList = this.cartItemList.filter((item) => !item.isSelected);
    this.setCartItemList(this.cartItemList);
  }
}

export default new CartStore();
