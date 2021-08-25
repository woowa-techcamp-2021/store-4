import { SelectWithSelected } from '../types/product';

class OrderDetail {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  selectWithSelecteds?: SelectWithSelected[];

  constructor(orderDetail: OrderDetail) {
    this.id = orderDetail.id;
    this.name = orderDetail.name;
    this.price = orderDetail.price;
    this.thumbnail = orderDetail.thumbnail;
    this.selectWithSelecteds = orderDetail.selectWithSelecteds;
  }
}

export default OrderDetail;
