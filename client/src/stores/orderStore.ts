import { action, makeAutoObservable, observable } from 'mobx';
import CartInProduct from '../models/cart-in-product';
import OrderDetailProduct from '../models/orderDetailProduct';
import NOIMAGE from '../assets/images/no-image.png';
import CartItem from '../models/cart-item';
import { CreateOrderRequest } from '../types/order';
import apis from '../api';
import userStore from './userStore';
import Order from '../models/order';

class OrderStore {
  @observable
  orderDetailProductList: OrderDetailProduct[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchOrders() {
    const { token } = userStore;
    const { orders } = await apis.orderAPI.fetchOrders(token);
    return orders.map((order) => new Order(order));
  }

  @action
  set replaceListToCartsInProduct(cartsInProduct: CartInProduct[]) {
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
  set replaceListToCartItemList(cartItemList: CartItem[]) {
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

  @action
  async createOrder(address: string, recipientName: string): Promise<void> {
    const token = userStore.token;

    const data: CreateOrderRequest = {
      address,
      recipientName,
      orderDetails: this.orderDetailProductList.map(
        (orderDetailProduct) => orderDetailProduct.orderDetail
      ),
    };

    await apis.orderAPI.createOrder(token, data);
  }

  @action
  clearOrder(): void {
    this.orderDetailProductList = [];
  }

  get totalPrice() {
    return this.orderDetailProductList.reduce(
      (total, orderDetailProduct) => total + orderDetailProduct.totalPrice,
      0
    );
  }
}

export default new OrderStore();
