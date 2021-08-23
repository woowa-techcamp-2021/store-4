import React from 'react';
import styled from 'styled-components';
import CartHeader from './CartHeader/CartHeader';
import CartTable from './CartTable/CartTable';
import PriceTotal from './PriceTotalWrapper/PriceTotalWrapper';
import CartButtons from './CartButtons/CartButtons';
import Modal from './Modal/Modal';
import { Link } from '../../lib/router';
import { useState } from 'react';

import cartStore from '../../stores/cartStore';
import { observer } from 'mobx-react-lite';

const CartContainer = styled.div`
  padding-top: 40px;
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

const Cart = (): JSX.Element => {
  const [modalCartItem, setModalCartItem] = useState<boolean>(false);

  const onItemOptionClick = (id: number) => {
    cartStore.setModalCartItemId(id);
    setModalCartItem(true);
  };

  const onCloseModalClick = () => {
    setModalCartItem(false);
  };

  return (
    <CartContainer>
      <CartHeader />
      <CartTable onOptionClick={onItemOptionClick} />
      <Link to="/">
        <MoveShopPage>{`<`} 쇼핑 계속하기</MoveShopPage>
      </Link>
      <PriceTotal />
      <CartButtons />
      {modalCartItem ? <Modal onCloseModalClick={onCloseModalClick} /> : null}
    </CartContainer>
  );
};

export default observer(Cart);
