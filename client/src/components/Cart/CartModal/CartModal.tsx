import React, { useState } from 'react';
import styled from 'styled-components';

import CountOption from './CountOption/CountOption';
import Option from './OptionContainer/OptionContainer';
import cartStore from '../../../stores/cartStore';
import { useEffect } from 'react';
import CartItem from '../../../models/cart-item';
import { toJS } from 'mobx';
import { RiCloseFill } from 'react-icons/ri';

const Container = styled.div`
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
const OptionModalWrapper = styled.div`
  width: 667px;
  padding: 20px;
  background-color: ${(props) => props.theme.color.white1};
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;
const ModalTitle = styled.h4``;
const ModalCloseButton = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.large};
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  height: 316px;
  padding-bottom: 60px;
  border-top: 1px solid ${(props) => props.theme.color.grey5};
  border-bottom: 1px solid ${(props) => props.theme.color.grey5};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const ModalButton = styled.button`
  cursor: pointer;

  width: 80px;
  height: 38px;
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
`;

const CancelButton = styled(ModalButton)`
  color: ${(props) => props.theme.color.black};
  background-color: ${(props) => props.theme.color.white1};
  border: 1px solid ${(props) => props.theme.color.grey3};
`;

type ConfirmButtonProps = {
  isConfirmed: boolean;
};
const ConfirmButton = styled(ModalButton)<ConfirmButtonProps>`
  color: ${(props) => props.theme.color.white1};
  background-color: ${(props) =>
    props.isConfirmed ? props.theme.color.black : props.theme.color.grey2};
  border: none;
  margin-left: 10px;
`;

type Props = {
  onCloseModalClick: () => void;
};

const CartModal = (props: Props): JSX.Element => {
  const [productCount, setProductCount] = useState<number>(1);
  const { onCloseModalClick } = props;

  useEffect(() => {
    const modalCartItem = cartStore.getModalCartItem();
    const toJSModalCartItem = toJS(modalCartItem);

    if (CartItem.isCartItem(toJSModalCartItem)) {
      setProductCount(toJSModalCartItem.count);
    }
  }, []);

  const onConfirmClick = () => {
    if (productCount > 0) {
      cartStore.setModalCartItemCount(productCount);
      onCloseModalClick();
    }
  };

  return (
    <Container>
      <OptionModalWrapper>
        <ModalHeader>
          <ModalTitle>수량선택</ModalTitle>
          <ModalCloseButton onClick={onCloseModalClick}>
            <RiCloseFill />
          </ModalCloseButton>
        </ModalHeader>
        <ModalMain>
          <Option />
          <CountOption productCount={productCount} setProductCount={setProductCount}></CountOption>
        </ModalMain>
        <ModalButtons>
          <CancelButton onClick={onCloseModalClick}>취소</CancelButton>
          <ConfirmButton isConfirmed={productCount > 0} onClick={onConfirmClick}>
            확인
          </ConfirmButton>
        </ModalButtons>
      </OptionModalWrapper>
    </Container>
  );
};

export default CartModal;
