import { SelectWithSelected } from '../types/product';

class OrderDetailProduct {
  id: number;
  name: string;
  price: number;
  count: number;
  thumbnail: string;
  selectWithSelecteds?: SelectWithSelected[];

  constructor(orderDetailProduct: OrderDetailProduct) {
    this.id = orderDetailProduct.id;
    this.name = orderDetailProduct.name;
    this.price = orderDetailProduct.price;
    this.thumbnail = orderDetailProduct.thumbnail;
    this.count = orderDetailProduct.count;
    this.selectWithSelecteds = orderDetailProduct.selectWithSelecteds;
  }
}

export default OrderDetailProduct;
