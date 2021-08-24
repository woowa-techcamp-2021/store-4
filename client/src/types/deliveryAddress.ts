import DeliveryAddress from '../models/delivery-address';

export type DeliveryAddressResponse = {
  deliveryAddresses: DeliveryAddress[];
};

export type CreateDeliveryAddressRequest = {
  name: string;
  recipientName: string;
  recipientPhoneNumber: string;
  address: string;
};

export type ModifyDeliveryAddressRequest = {
  name: string;
  recipientName: string;
  recipientPhoneNumber: string;
  address: string;
};

export type CreateDeliveryAddressResponse = {
  deliveryAddress: DeliveryAddress;
};

export type ModifyDeliveryAddressResponse = {
  deliveryAddress: DeliveryAddress;
};
