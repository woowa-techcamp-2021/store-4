import { SelectWithSelected } from '../types/product';

class OrderDetailProduct {
  uuid: string;
  productId: number;
  name: string;
  price: number;
  count: number;
  thumbnail: string;
  selectWithSelecteds?: SelectWithSelected[];

  constructor(orderDetailProduct: OrderDetailProduct) {
    this.uuid = orderDetailProduct.uuid;
    this.productId = orderDetailProduct.productId;
    this.name = orderDetailProduct.name;
    this.price = orderDetailProduct.price;
    this.thumbnail = orderDetailProduct.thumbnail;
    this.count = orderDetailProduct.count;
    this.selectWithSelecteds = orderDetailProduct.selectWithSelecteds;
  }
}

export default OrderDetailProduct;
