import { IsArray, IsInt, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import BaseValidator from './base-validator';

class OrderDetailCreate extends BaseValidator {
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  productId: number;

  @IsInt({ each: true })
  optionIds: number[];

  constructor(orderDetailCreate: OrderDetailCreate) {
    super();
    this.quantity = orderDetailCreate.quantity;
    this.productId = orderDetailCreate.productId;
    this.optionIds = orderDetailCreate.optionIds;
  }
}

class OrderCreate extends BaseValidator {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  recipientName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailCreate)
  orderDetails: OrderDetailCreate[];

  constructor(data: OrderCreate) {
    super();
    this.address = data.address;
    this.recipientName = data.recipientName;
    this.orderDetails = data.orderDetails.map((orderDetail) => new OrderDetailCreate(orderDetail));
  }
}

export default OrderCreate;
