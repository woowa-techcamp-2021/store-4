import request from '../lib/request';
import {
  CreateDeliveryAddressRequest,
  CreateDeliveryAddressResponse,
  DeliveryAddressResponse,
  ModifyDeliveryAddressRequest,
  ModifyDeliveryAddressResponse,
} from '../types/deliveryAddress';

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
  ): Promise<CreateDeliveryAddressResponse> {
    return request<CreateDeliveryAddressResponse>({
      url: `${this.baseURL}/api/delivery-address`,
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  modifyDeliveryAddress(
    token: string,
    id: number,
    data: ModifyDeliveryAddressRequest
  ): Promise<ModifyDeliveryAddressResponse> {
    return request<ModifyDeliveryAddressResponse>({
      url: `${this.baseURL}/api/delivery-address/${id}`,
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  deleteDeliveryAddress(token: string, id: number): Promise<void> {
    return request<void>({
      url: `${this.baseURL}/api/delivery-address/${id}`,
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
  }
}

export default DeliveryAddressAPI;
