import { action, makeAutoObservable, observable } from 'mobx';
import CartInProduct from '../models/cart-in-product';
import OrderDetailProduct from '../models/orderDetailProduct';
import NOIMAGE from '../assets/images/no-image.png';
import CartItem from '../models/cart-item';

class OrderStore {
  @observable
  orderDetailProductList: OrderDetailProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  set replaceListTocartsInProduct(cartsInProduct: CartInProduct[]) {
    this.orderDetailProductList = cartsInProduct.map((cartInProduct) => {
      const { product, options, count, uuid } = cartInProduct;

      return new OrderDetailProduct({
        uuid,
        productId: product.id,
        name: product.name,
        count,
        thumbnail: product.thumbnail || NOIMAGE,
        price: cartInProduct.totalPrice,
        selectWithSelecteds: options,
      });
    });
  }

  @action
  set replaceListTocartItemList(cartItemList: CartItem[]) {
    this.orderDetailProductList = cartItemList.map((cartItem) => {
      const { uuid, productId, title, selectWithSelecteds, imgSrc, count, price } = cartItem;
      return new OrderDetailProduct({
        uuid,
        productId,
        name: title,
        selectWithSelecteds,
        thumbnail: imgSrc,
        count,
        price,
      });
    });
  }

  get totalPrice() {
    return this.orderDetailProductList.reduce(
      (total, orderDetailProduct) => total + orderDetailProduct.price,
      0
    );
  }
}

export default new OrderStore();
