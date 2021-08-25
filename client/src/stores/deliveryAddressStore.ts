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

  @action
  async modifyDeliveryAddress(id: number, data: CreateDeliveryAddressRequest): Promise<void> {
    const token = localStorage.getItem('token');

    if (isNone(token)) {
      return;
    }

    const { deliveryAddress } = await apis.deliveryAddressAPI.modifyDeliveryAddress(
      token,
      id,
      data
    );

    runInAction(() => {
      const deliveryAddressIndex = this.deliveryAddresses.findIndex(
        (deliveryAddress) => deliveryAddress.id === id
      );

      if (deliveryAddressIndex === -1) {
        return;
      }

      this.deliveryAddresses[deliveryAddressIndex] = {
        ...deliveryAddress,
      };
    });
  }

  @action
  async deleteDeliveryAddress(id: number): Promise<void> {
    const token = localStorage.getItem('token');

    if (isNone(token)) {
      return;
    }

    await apis.deliveryAddressAPI.deleteDeliveryAddress(token, id);

    runInAction(() => {
      const deliveryAddressIndex = this.deliveryAddresses.findIndex(
        (deliveryAddress) => deliveryAddress.id === id
      );

      if (deliveryAddressIndex === -1) {
        return;
      }

      this.deliveryAddresses.splice(deliveryAddressIndex, 1);
    });
  }
}

export default new DeliveryAddressStore();
