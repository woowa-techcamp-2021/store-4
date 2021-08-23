import React from 'react';
import styled from 'styled-components';

import TableHeader from './TableHeader/TableHeader';
import CartItem from './CartItem/CartItem';
import cartStore from '../../../stores/cartStore';
import { observer } from 'mobx-react-lite';
import { toKoreanMoneyFormat } from '../../../utils/moneyFormater';

const CartTableWrapper = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
  margin-top: 60px;
`;

const TableMain = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.grey3};
`;

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.color.grey3};
`;

const DeliveryFee = styled.div`
  padding: 15px 10px;
  height: 100%;
  text-align: center;
  word-break: keep-all;
  color: ${(props) => props.theme.color.grey4};
  font-weight: 400;
`;

type Props = {
  onOptionClick: (id: number) => void;
};

const CartTable = (props: Props): JSX.Element => {
  const { onOptionClick } = props;

  return (
    <CartTableWrapper>
      <TableHeader />
      <TableMain>
        <CartItemList>
          {cartStore.cartItemList.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              imgSrc={item.imgSrc}
              count={item.count}
              price={item.price * item.count}
              isSelected={item.isSelected}
              onOptionClick={onOptionClick}
            />
          ))}
        </CartItemList>
        <DeliveryFee>기본 배송비 {toKoreanMoneyFormat(2500)} (택배-선결제)</DeliveryFee>
      </TableMain>
    </CartTableWrapper>
  );
};

export default observer(CartTable);
