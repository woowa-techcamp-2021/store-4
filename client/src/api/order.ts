import request from '../lib/request';
import Order from '../models/order';
import { CreateOrderRequest, OrdersReponse } from '../types/order';

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
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  }

  fetchOrders(token: string): Promise<OrdersReponse> {
    return request<OrdersReponse>({
      url: `${this.baseURL}/api/order`,
      method: 'GET',

      headers: {
        Authorization: token,
      },
    });
  }
}

export default OrderAPI;
