import request from '../lib/request';
import { DeliveryAddressResponse } from '../types/deliveryAddress';

class DeliveryAddressAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  fetchDeliveryAddresses(token: string): Promise<DeliveryAddressResponse> {
    return request<DeliveryAddressResponse>({
      url: `${this.baseURL}/api/delivery-address`,
      headers: {
        Authorization: token,
      },
    });
  }
}

export default DeliveryAddressAPI;
