import { IsNotEmpty, Length, Matches } from 'class-validator';
import BaseValidator from './base-validator';

class DeliveryAddressModify extends BaseValidator {
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsNotEmpty()
  @Length(1, 50)
  recipientName: string;

  @IsNotEmpty()
  @Length(1, 200)
  address: string;

  @IsNotEmpty()
  @Matches(/^[0-1]{3}-[0-9]{4}-[0-9]{4}$/)
  recipientPhoneNumber: string;

  constructor(data: DeliveryAddressModify) {
    super();
    this.name = data.name;
    this.recipientName = data.recipientName;
    this.address = data.address;
    this.recipientPhoneNumber = data.recipientPhoneNumber;
  }
}

export default DeliveryAddressModify;
