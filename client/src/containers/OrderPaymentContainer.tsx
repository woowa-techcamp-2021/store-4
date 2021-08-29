import React, { useRef, useState, useCallback, useEffect } from 'react';
import OrderPayment from '../components/OrderPayment/OrderPayment';
import { useHistory } from '../lib/router';
import User from '../models/user';
import toast from '../lib/toast';
import cartStore from '../stores/cartStore';
import orderStore from '../stores/orderStore';
import userStore from '../stores/userStore';
import { isNone } from '../utils/typeGuard';
import deliveryAddressStore from '../stores/deliveryAddressStore';
import { observer } from 'mobx-react';

export type OrderDeliveryAddressFormRef = {
  readonly recipientName: string;
  readonly address: string;
  readonly approve: boolean;
};

const OrderPaymentContainer = observer((): JSX.Element => {
  const orderFormRef = useRef<OrderDeliveryAddressFormRef & HTMLFormElement>(null);
  const [currentStep, setStep] = useState(2);
  const history = useHistory();
  const { user } = userStore;
  const { orderDetailProductList } = orderStore;
  const { deliveryAddresses } = deliveryAddressStore;

  useEffect(() => {
    scrollTo({ top: 0 });
  }, [currentStep]);

  useEffect(() => {
    deliveryAddressStore.fetchDeliveryAddresses();
  }, []);

  const handleSumbitOrder = useCallback(async () => {
    if (isNone(orderFormRef.current)) {
      return;
    }

    const { recipientName, address, approve } = orderFormRef.current;

    if (!(recipientName && address)) {
      toast.info('배송정보는 빠짐없이 입력해주세요');
      return;
    }

    if (!approve) {
      toast.info('구매진행에 동의 해주세요');
      return;
    }

    try {
      await orderStore.createOrder(address, recipientName);
      const orderDetailProductList = [...orderStore.orderDetailProductList];

      cartStore.removeOrderCompleteItems(orderDetailProductList);

      toast.success('주문 완료');

      setStep(3);
    } catch (error) {
      switch (error.status) {
        case 401:
        case 410:
          userStore.onAuthError(error.status);
          return;

        case 400:
          toast.error('잘못된 데이터입니다');
          history.push('/');
          orderStore.clearOrder();
          return;

        default:
          toast.error('주문 실패 다시 시도해주세요');
          history.push('/error');
          return;
      }
    }
  }, [history]);

  useEffect(() => {
    if (orderDetailProductList.length === 0) {
      toast.info('주문 상품이 없습니다');
      history.push('/');
    }
  }, [history, orderDetailProductList]);

  return (
    <OrderPayment
      currentStep={currentStep}
      ref={orderFormRef}
      onOrderSubmit={handleSumbitOrder}
      user={user as User}
      recipientName={orderFormRef.current?.recipientName}
      address={orderFormRef.current?.address}
      deliveryAddresses={deliveryAddresses}
    />
  );
});

export default OrderPaymentContainer;
