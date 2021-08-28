import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import AuthenticationProvider, {
  AuthenticationContext,
} from '../components/Authentication/Authentication';
import OrderPayment from '../components/OrderPayment/OrderPayment';
import { useHistory } from '../lib/router';
import User from '../models/user';
import toast from '../lib/toast';
import cartStore from '../stores/cartStore';
import orderStore from '../stores/orderStore';
import userStore from '../stores/userStore';
import { isNone } from '../utils/typeGuard';

export type OrderDeliveryAddressFormRef = {
  readonly recipientName: string;
  readonly address: string;
  readonly approve: boolean;
};

const OrderPaymentContainer = (): JSX.Element => {
  const orderFormRef = useRef<OrderDeliveryAddressFormRef & HTMLFormElement>(null);
  const [currentStep, setStep] = useState(2);
  const { onErrorOccurred } = useContext(AuthenticationContext);
  const history = useHistory();
  const { user } = userStore;
  const { orderDetailProductList } = orderStore;

  useEffect(() => {
    scrollTo({ top: 0 });
  }, [currentStep]);

  const handleSumbitOrder = useCallback(async () => {
    if (isNone(orderFormRef.current)) {
      return;
    }

    const { recipientName, address, approve } = orderFormRef.current;

    if (!(recipientName && address)) {
      toast.error('배송정보는 빠짐없이 입력해주세요');
      return;
    }

    if (!approve) {
      toast.error('구매진행에 동의 해주세요');
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
          onErrorOccurred();
          return;

        case 400:
          toast.error('잘못된 데이터입니다');
          history.push('/');
          orderStore.orderDetailProductList = [];
          return;

        default:
          toast.error('주문 실패 다시 시도해주세요');
          history.push('/error');
          return;
      }
    }
  }, [history, onErrorOccurred]);

  useEffect(() => {
    if (orderDetailProductList.length === 0) {
      toast.error('주문 상품이 없습니다');
      history.push('/');
    }
  }, [history, orderDetailProductList]);

  if (isNone(user)) {
    toast.error('로그인이 필요합니다');
    history.push('/login');
    return <></>;
  }

  return (
    <OrderPayment
      currentStep={currentStep}
      ref={orderFormRef}
      onOrderSubmit={handleSumbitOrder}
      user={user as User}
      recipientName={orderFormRef.current?.recipientName}
      address={orderFormRef.current?.address}
    />
  );
};

const OrderPaymentAuthentication = (): JSX.Element => {
  return (
    <AuthenticationProvider>
      <OrderPaymentContainer />
    </AuthenticationProvider>
  );
};

export default OrderPaymentAuthentication;
