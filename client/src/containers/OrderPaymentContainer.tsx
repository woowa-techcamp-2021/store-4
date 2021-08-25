import React, { useRef } from 'react';
import OrderPayment from '../components/OrderPayment/OrderPayment';
import { useHistory } from '../lib/router';
import userStore from '../stores/userStore';
import { isNone } from '../utils/typeGuard';

export type OrderDeliveryAddressFormRef = {
  readonly recipientName: string;
  readonly address: string;
  readonly approve: boolean;
};

const OrderContainer = (): JSX.Element => {
  const orderFormRef = useRef<OrderDeliveryAddressFormRef & HTMLFormElement>(null);
  const history = useHistory();
  const user = userStore.user;

  const handleSumbitOrder = () => {
    if (isNone(orderFormRef.current)) {
      return;
    }

    const { recipientName, address, approve } = orderFormRef.current;

    if (!user) {
      alert('로그인이 필요합니다!');
      history.push('/login');
      return;
    }

    if (!(recipientName && address)) {
      alert('배송정보는 빠짐없이 입력해주세요!');
      return;
    }

    if (!approve) {
      alert('구매진행에 동의 해주세요!');
      return;
    }
  };

  return <OrderPayment currentStep={2} ref={orderFormRef} onOrderSubmit={handleSumbitOrder} />;
};

export default OrderContainer;
