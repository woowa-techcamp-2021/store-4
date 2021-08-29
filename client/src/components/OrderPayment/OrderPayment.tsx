import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { OrderDeliveryAddressFormRef } from '../../containers/OrderPaymentContainer';
import { Link } from '../../lib/router';
import DeliveryAddress from '../../models/delivery-address';
import User from '../../models/user';
import PaymentFinish from '../PaymentFinish/PaymentFinish';
import OrderForm from './OrderForm/OrderForm';
import OrderHeader from './OrderHeader';
import OrderTable from './OrderTable/OrderTable';
import TotalPrice from './TotalPrice';

const Container = styled.div`
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
`;

const MoveShopPage = styled.div`
  display: inline-block;
  margin-top: 12px;
  padding-bottom: 3px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.tiny};
  cursor: pointer;
`;

type Props = {
  user: User;
  currentStep: number;
  onOrderSubmit: React.MouseEventHandler;
  recipientName?: string;
  address?: string;
  deliveryAddresses: DeliveryAddress[];
};

const OrderPayment = (props: Props, ref: React.Ref<OrderDeliveryAddressFormRef>): JSX.Element => {
  const { currentStep, onOrderSubmit, user, recipientName, address, deliveryAddresses } = props;

  return (
    <Container>
      <OrderHeader currentStep={currentStep} />
      <OrderTable />
      {currentStep === 2 ? (
        <>
          <Link to="/cart">
            <MoveShopPage>{'< 장바구니 가기'}</MoveShopPage>
          </Link>
          <TotalPrice />
          <OrderForm
            ref={ref}
            onOrderSubmit={onOrderSubmit}
            deliveryAddresses={deliveryAddresses}
          />
        </>
      ) : (
        <PaymentFinish user={user} recipientName={recipientName ?? ''} address={address ?? ''} />
      )}
    </Container>
  );
};

export default forwardRef(OrderPayment);
