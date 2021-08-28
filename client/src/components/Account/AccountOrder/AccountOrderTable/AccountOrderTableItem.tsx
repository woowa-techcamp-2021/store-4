import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Order from '../../../../models/order';
import { getDate } from '../../../../utils/formatDate';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';
import AccountOrderTableItemDetail from './AccountOrderTableItemDetail';
import { RiArrowDownSLine } from 'react-icons/ri';

export const Container = styled.div``;

const AccountOrderTableItemSummary = styled.div`
  flex: 1;
  display: flex;
  :hover {
    cursor: pointer;
  }
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

const ArrowDownWrapper = styled(Column)`
  flex: 1;
`;

type SeemoreProps = {
  isCloseIcon: boolean;
};

const Seemore = styled.div<SeemoreProps>`
  transform: rotate(${(props) => (props.isCloseIcon ? '-180' : '0')}deg);
  transition: transform 0.3s ease-in-out;
`;

type Props = {
  order: Order;
};

const AccountOrderTableItem = (props: Props): JSX.Element => {
  const { order } = props;
  const { recipientName, address, totalPrice, orderDetails, createdAt } = order;
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);

  const handleReviewSummaryClick = useCallback(
    () => setOrderDetailOpen((orderDetailOpen) => !orderDetailOpen),
    []
  );

  return (
    <Container>
      <AccountOrderTableItemSummary onClick={handleReviewSummaryClick}>
        <Date>{getDate(createdAt)}</Date>
        <Recipient>{recipientName}</Recipient>
        <Address>{address}</Address>
        <ItemCount>{`${orderDetails.length}개`}</ItemCount>
        <TotalPrice>{toKoreanMoneyFormat(totalPrice)}</TotalPrice>
        <ArrowDownWrapper>
          <Seemore isCloseIcon={orderDetailOpen}>
            <RiArrowDownSLine />
          </Seemore>
        </ArrowDownWrapper>
      </AccountOrderTableItemSummary>
      {orderDetailOpen && <AccountOrderTableItemDetail orderDetails={orderDetails} />}
    </Container>
  );
};

export default AccountOrderTableItem;
