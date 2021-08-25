import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { OrderDeliveryAddressFormRef } from '../../containers/OrderPaymentContainer';
import { Link } from '../../lib/router';
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
  currentStep: number;
  onOrderSubmit: React.MouseEventHandler;
};

const OrderPayment = (props: Props, ref: React.Ref<OrderDeliveryAddressFormRef>): JSX.Element => {
  const { currentStep, onOrderSubmit } = props;
  return (
    <Container>
      <OrderHeader currentStep={currentStep} />
      <OrderTable />
      <Link to="/cart">
        <MoveShopPage>{'< 장바구니 가기'}</MoveShopPage>
      </Link>
      <TotalPrice />
      <OrderForm ref={ref} onOrderSubmit={onOrderSubmit} />
    </Container>
  );
};

export default forwardRef(OrderPayment);
