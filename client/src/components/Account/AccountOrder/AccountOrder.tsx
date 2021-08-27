import React from 'react';
import styled from 'styled-components';
import Order from '../../../models/order';
import AccountOrderTableHeader from './AccountOrderTable/AccountOrderTableHeader';
import AccountOrderTableItem from './AccountOrderTable/AccountOrderTableItem';

const Container = styled.div`
  flex: 1;
`;

const AccountOrderTable = styled.div`
  width: 100%;
`;

const Item = styled.div`
  display: flex;
`;

type Props = {
  orders: Order[];
};

const AccountOrder = (props: Props): JSX.Element => {
  const { orders } = props;

  const AccountOrderItems = orders.map((order) => (
    <AccountOrderTableItem key={order.id} order={order} />
  ));

  return (
    <Container>
      <AccountOrderTable>
        <AccountOrderTableHeader />
        {AccountOrderItems}
      </AccountOrderTable>
    </Container>
  );
};

export default AccountOrder;
