import React from 'react';
import styled from 'styled-components';
import { Link } from '../../lib/router';
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

const Order = (): JSX.Element => {
  return (
    <Container>
      <OrderHeader currentStep={2} />
      <OrderTable />
      <Link to="/cart">
        <MoveShopPage>{'< 장바구니 가기'}</MoveShopPage>
      </Link>
      <TotalPrice />
    </Container>
  );
};

export default Order;
