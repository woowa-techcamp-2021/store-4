export type OrderDetail = {
  quantity: number;
  productId: number;
  optionIds: number[];
};

export type CreateOrderRequest = {
  address: string;
  recipientName: string;
  orderDetails: OrderDetail[];
};
