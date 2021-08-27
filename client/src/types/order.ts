export type OrderDetailSummary = {
  quantity: number;
  productId: number;
  optionIds: number[];
};

export type CreateOrderRequest = {
  address: string;
  recipientName: string;
  orderDetails: OrderDetailSummary[];
};
