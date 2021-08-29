import Product from './product';

class OrderDetail {
  id: number;
  discountRate: number;
  price: number;
  quantity: number;
  option: string;
  product: Product;
  constructor(orderDetail: OrderDetail) {
    this.id = orderDetail.id;
    this.discountRate = orderDetail.discountRate;
    this.price = orderDetail.price;
    this.quantity = orderDetail.quantity;
    this.option = orderDetail.option;
    this.product = new Product(orderDetail.product);
  }
}

export default OrderDetail;
