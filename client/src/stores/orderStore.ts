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
  replaceList(cartInProducts: CartInProduct[]) {
    this.orderDetailProductList = cartInProducts.map((cartInProduct) => {
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
}

export default new OrderStore();
