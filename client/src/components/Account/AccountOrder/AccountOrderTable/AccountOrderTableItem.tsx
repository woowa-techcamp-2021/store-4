import React from 'react';
import styled from 'styled-components';
import Order from '../../../../models/order';
import { getDate } from '../../../../utils/formatDate';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';

export const Container = styled.div`
  display: flex;
`;

const Column = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey2};
`;

export const Date = styled(Column)`
  flex: 1;
`;

export const Address = styled(Column)`
  flex: 3;
`;

export const Recipient = styled(Column)`
  flex: 1;
`;

export const TotalPrice = styled(Column)`
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: 500;
  flex: 1;
`;

export const ItemCount = styled(Column)`
  flex: 1;
`;

type Props = {
  order: Order;
};

const AccountOrderTableItem = (props: Props): JSX.Element => {
  const { order } = props;
  const { recipientName, address, totalPrice, orderDetails, createdAt } = order;
  return (
    <Container>
      <Date>{getDate(createdAt)}</Date>
      <Recipient>{recipientName}</Recipient>
      <Address>{address}</Address>
      <ItemCount>{`${orderDetails.length}개`}</ItemCount>
      <TotalPrice>{toKoreanMoneyFormat(totalPrice)}</TotalPrice>
    </Container>
  );
};

export default AccountOrderTableItem;
