import React, { useRef } from 'react';
import OrderPayment from '../components/OrderPayment/OrderPayment';

export type OrderDeliveryAddressFormRef = {
  readonly recipientName: string;
  readonly address: string;
};

const OrderContainer = (): JSX.Element => {
  const modifyFormRef = useRef<OrderDeliveryAddressFormRef & HTMLFormElement>(null);

  return <OrderPayment currentStep={2} ref={modifyFormRef} />;
};

export default OrderContainer;
