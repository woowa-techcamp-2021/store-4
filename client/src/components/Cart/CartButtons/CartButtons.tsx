import React from 'react';
import styled from 'styled-components';

import cartStore from '../../../stores/cartStore';

const ResetButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 30px;
`;

const ProductButtonList = styled.div``;
const RemoveButton = styled(ResetButton)`
  width: 120px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.color.grey3};
  margin-right: 8px;
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

const OrderButtonList = styled.div``;
const OrderButton = styled(ResetButton)`
  width: 190px;
  height: 55px;

  margin-left: 8px;
  border: 1px solid ${(props) => props.theme.color.grey3};

  color: ${(props) => props.theme.color.black};
  background-color: ${(props) => props.theme.color.white1};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 700;
`;

const OrderAllButton = styled(OrderButton)`
  color: ${(props) => props.theme.color.white1};
  background-color: ${(props) => props.theme.color.black};
`;

type Props = {
  onClickAllProductOrderButton: React.MouseEventHandler;
  onClickSelectedProductOrderButton: React.MouseEventHandler;
};

const CartButtons = (props: Props): JSX.Element => {
  const { onClickAllProductOrderButton, onClickSelectedProductOrderButton } = props;

  const onClickRemoveSeleted = () => {
    cartStore.removeSelectedItem();
  };

  return (
    <Container>
      <ProductButtonList>
        <RemoveButton onClick={onClickRemoveSeleted}>선택 상품 삭제</RemoveButton>
      </ProductButtonList>
      <OrderButtonList>
        <OrderButton onClick={onClickSelectedProductOrderButton}>선택 상품 주문</OrderButton>
        <OrderAllButton onClick={onClickAllProductOrderButton}>전체 상품 주문</OrderAllButton>
      </OrderButtonList>
    </Container>
  );
};

export default CartButtons;
