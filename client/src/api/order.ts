import request from '../lib/request';
import { CreateOrderRequest } from '../types/order';

class OrderAPI {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  createOrder(token: string, data: CreateOrderRequest): Promise<void> {
    return request<void>({
      url: `${this.baseURL}/api/order`,
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    });
  }
}

export default OrderAPI;
