import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Date,
  Recipient,
  Address,
  TotalPrice,
  ItemCount,
} from './AccountOrderTableItem';

const OrderDate = styled(Date)``;

const OrderRecipient = styled(Recipient)``;

const OrderAddress = styled(Address)``;

const OrderTotalPrice = styled(TotalPrice)`
  font-size: ${(props) => props.theme.fontSize.normal};
`;

const OrderItemCount = styled(ItemCount)``;

const AccountOrderTableHeader = (): JSX.Element => {
  return (
    <Container>
      <OrderDate>
        <div>주문 날짜</div>
      </OrderDate>
      <OrderRecipient>
        <div>받으실 분</div>
      </OrderRecipient>
      <OrderAddress>
        <div>받으실 곳</div>
      </OrderAddress>
      <OrderItemCount>
        <div>상품</div>
      </OrderItemCount>
      <OrderTotalPrice>
        <div>최종 결제 가격</div>
      </OrderTotalPrice>
    </Container>
  );
};

export default AccountOrderTableHeader;
