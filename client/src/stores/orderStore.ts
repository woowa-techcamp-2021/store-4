import { action, makeAutoObservable, observable } from 'mobx';
import CartInProduct from '../models/cart-in-product';
import OrderDetailProduct from '../models/orderDetailProduct';
import NOIMAGE from '../assets/images/no-image.png';

class OrderStore {
  @observable
  orderDetailProductList: OrderDetailProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  replaceList(cartsInProduct: CartInProduct[]) {
    this.orderDetailProductList = cartsInProduct.map((cartInProduct) => {
      const { product, options, count } = cartInProduct;

      return new OrderDetailProduct({
        id: product.id,
        name: product.name,
        count,
        thumbnail: product.thumbnail || NOIMAGE,
        price: cartInProduct.totalPrice,
        selectWithSelecteds: options,
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
