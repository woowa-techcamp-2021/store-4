import { makeAutoObservable, observable } from 'mobx';
import OrderDetail from '../models/orderDetail';

class OrderStore {
  @observable
  orderDetailLists: OrderDetail[] = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new OrderStore();
