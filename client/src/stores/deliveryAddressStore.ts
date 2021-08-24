import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import apis from '../api';
import DeliveryAddress from '../models/delivery-address';
import { CreateDeliveryAddressRequest } from '../types/deliveryAddress';
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

  @action
  async createDeliveryAddress(data: CreateDeliveryAddressRequest): Promise<void> {
    const token = localStorage.getItem('token');

    if (isNone(token)) {
      return;
    }

    const { deliveryAddress } = await apis.deliveryAddressAPI.createDeliveryAddress(token, data);

    runInAction(() => {
      this.deliveryAddresses = [...this.deliveryAddresses, deliveryAddress];
    });
  }
}

export default new DeliveryAddressStore();
