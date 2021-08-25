import { SelectWithSelected } from '../types/product';

class OrderDetailProductAttributes {
  uuid: string;
  productId: number;
  name: string;
  price: number;
  count: number;
  thumbnail: string;
  selectWithSelecteds?: SelectWithSelected[];

  constructor(orderDetailProduct: OrderDetailProductAttributes) {
    this.uuid = orderDetailProduct.uuid;
    this.productId = orderDetailProduct.productId;
    this.name = orderDetailProduct.name;
    this.price = orderDetailProduct.price;
    this.thumbnail = orderDetailProduct.thumbnail;
    this.count = orderDetailProduct.count;
    this.selectWithSelecteds = orderDetailProduct.selectWithSelecteds;
  }
}

class OrderDetailProduct extends OrderDetailProductAttributes {
  get totalPrice(): number {
    return this.price * this.count;
  }
}

export default OrderDetailProduct;
