import request from '../lib/request';
import { CreateDeliveryAddressRequest, DeliveryAddressResponse } from '../types/deliveryAddress';

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

  createDeliveryAddress(
    token: string,
    data: CreateDeliveryAddressRequest
  ): Promise<DeliveryAddressResponse> {
    return request<DeliveryAddressResponse>({
      url: `${this.baseURL}/api/delivery-address`,
      method: 'POST',
      body: data,
      headers: {
        Authorization: token,
      },
    });
  }
}

export default DeliveryAddressAPI;
