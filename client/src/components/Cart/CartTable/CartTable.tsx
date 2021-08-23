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
      </TableMain>
    </CartTableWrapper>
  );
};

export default observer(CartTable);
