import React, { useRef } from 'react';
import OrderPayment from '../components/OrderPayment/OrderPayment';
import { useHistory } from '../lib/router';
import cartStore from '../stores/cartStore';
import orderStore from '../stores/orderStore';
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

  const handleSumbitOrder = async () => {
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

    try {
      await orderStore.createOrder(address, recipientName);
      const orderDetailProductList = [...orderStore.orderDetailProductList];

      cartStore.removeOrderCompleteItems(orderDetailProductList);
      orderStore.orderDetailProductList = [];

      alert('주문완료');
    } catch (err) {
      alert('주문 실패 다시 시도해주세요');
    }
  };

  return <OrderPayment currentStep={2} ref={orderFormRef} onOrderSubmit={handleSumbitOrder} />;
};

export default OrderContainer;
