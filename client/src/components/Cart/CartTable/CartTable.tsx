import React from 'react';
import styled from 'styled-components';

import TableHeader from './TableHeader/TableHeader';
import CartItem from './CartItem/CartItem';
import cartStore from '../../../stores/cartStore';
import { observer } from 'mobx-react';

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

const CartItemList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const EmptyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: 400;
  height: 100px;
`;

type Props = {
  onOptionClick: (uuid: string) => void;
};

const CartTable = (props: Props): JSX.Element => {
  const { onOptionClick } = props;

  const CartItems = cartStore.cartItemList.map((item) => (
    <CartItem
      key={item.uuid}
      uuid={item.uuid}
      productId={item.productId}
      title={item.title}
      imgSrc={item.imgSrc}
      count={item.count}
      productPrice={item.price}
      isSelected={item.isSelected}
      selectWithSelecteds={item.selectWithSelecteds}
      onOptionClick={onOptionClick}
    />
  ));

  return (
    <Container>
      <TableHeader />
      <TableMain>
        <CartItemList>
          {CartItems.length === 0 ? (
            <EmptyBox>
              <span>장바구니에 담겨있는 상품이 없습니다.</span>
            </EmptyBox>
          ) : (
            CartItems
          )}
        </CartItemList>
      </TableMain>
    </Container>
  );
};

export default observer(CartTable);
