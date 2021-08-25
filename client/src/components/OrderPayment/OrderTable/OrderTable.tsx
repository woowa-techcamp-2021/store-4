import React from 'react';
import styled from 'styled-components';
import TableHeader from './TableHeader';
import OrderDetailProductItem from './OrderDetailProductItem';
import { observer } from 'mobx-react';
import orderStore from '../../../stores/orderStore';

const Container = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
  margin-top: 60px;
`;

const TableMain = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
`;

const OrderDetailProductList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const OrderTable = (): JSX.Element => {
  const orderDetailProducts = orderStore.orderDetailProductList;

  const OrderDetailProductItems = orderDetailProducts.map((orderDetailProduct) => (
    <OrderDetailProductItem key={orderDetailProduct.uuid} orderDetailProduct={orderDetailProduct} />
  ));

  return (
    <Container>
      <TableHeader />
      <TableMain>
        <OrderDetailProductList>{OrderDetailProductItems}</OrderDetailProductList>
      </TableMain>
    </Container>
  );
};

export default observer(OrderTable);
