import OrderDetail from './orderDetail';

class Order {
  id: number;
  totalPrice: number;
  address: string;
  recipientName: string;
  orderDetails: OrderDetail[];
  createdAt: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.totalPrice = order.totalPrice;
    this.address = order.address;
    this.recipientName = order.recipientName;
    this.orderDetails = order.orderDetails.map((orderDetail) => new OrderDetail(orderDetail));
    this.createdAt = new Date(order.createdAt);
  }
}

export default Order;
