import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import apis from '../api';
import DeliveryAddress from '../models/delivery-address';
import { isNone } from '../utils/typeGuard';

class DeliveryAddressStore {
  @observable
  deliveryAddresses: DeliveryAddress[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  async fetchDeliveryAddresses(): Promise<void> {
    const token = localStorage.getItem('token');

    if (isNone(token)) {
      return;
    }

    const { deliveryAddresses } = await apis.deliveryAddressAPI.fetchDeliveryAddresses(token);

    runInAction(() => {
      this.deliveryAddresses = deliveryAddresses;
    });
  }
}

export default new DeliveryAddressStore();
