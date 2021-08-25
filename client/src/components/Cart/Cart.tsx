import React, { useState } from 'react';
import styled from 'styled-components';
import CartHeader from './CartHeader/CartHeader';
import CartTable from './CartTable/CartTable';
import PriceTotal from './PriceTotalWrapper/PriceTotalWrapper';
import CartButtons from './CartButtons/CartButtons';
import CartModal from './CartModal/CartModal';
import { Link } from '../../lib/router';
import { observer } from 'mobx-react';
import cartStore from '../../stores/cartStore';
import { RiArrowLeftSLine } from 'react-icons/ri';

const Container = styled.div`
  padding-top: 40px;
  width: ${(props) => props.theme.device.desktop};
  margin: 0 auto;
`;

const MoveShopPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 12px;
  padding-bottom: 3px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey5};
  font-size: ${(props) => props.theme.fontSize.tiny};
  cursor: pointer;
`;

type Props = {
  onClickAllProductOrderButton: React.MouseEventHandler;
  onClickSelectedProductOrderButton: React.MouseEventHandler;
};

const Cart = (props: Props): JSX.Element => {
  const [modalCartItem, setModalCartItem] = useState<boolean>(false);

  const onItemOptionClick = (id: number) => {
    cartStore.setModalCartItemId(id);
    setModalCartItem(true);
  };

  const onCloseModalClick = () => {
    setModalCartItem(false);
  };

  return (
    <Container>
      <CartHeader currentStep={1} />
      <CartTable onOptionClick={onItemOptionClick} />
      <Link to="/">
        <MoveShopPage>
          <RiArrowLeftSLine />
          쇼핑 계속하기
        </MoveShopPage>
      </Link>
      <PriceTotal />
      <CartButtons {...props} />
      {modalCartItem && <CartModal onCloseModalClick={onCloseModalClick} />}
    </Container>
  );
};

export default observer(Cart);
