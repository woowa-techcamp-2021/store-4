import React from 'react';
import styled, { css } from 'styled-components';

const ResetButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const ButtonListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 30px;
`;

const ZzimButtonList = styled(ResetButton)``;
const ZzimButton = styled(ResetButton)`
  width: 120px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.color.grey3};
  margin-right: 8px;
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

interface Progress {
  isOrderAll: boolean;
}

const OrderButtonList = styled.div``;
const OrderButton = styled(ResetButton)<Progress>`
  width: 190px;
  height: 55px;

  margin-left: 8px;
  border: 1px solid ${(props) => props.theme.color.grey3};

  color: ${(props) => props.theme.color.black};
  background-color: ${(props) => props.theme.color.white1};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 700;

  ${(props) =>
    props.isOrderAll &&
    css`
      color: ${props.theme.color.white1};
      background-color: ${props.theme.color.black};
    `};
`;

const CartButtons = (): JSX.Element => {
  return (
    <ButtonListWrapper>
      <ZzimButtonList>
        <ZzimButton>선택 상품 삭제</ZzimButton>
        <ZzimButton>선택 상품 찜</ZzimButton>
      </ZzimButtonList>
      <OrderButtonList>
        <OrderButton isOrderAll={false}>선택 상품 주문</OrderButton>
        <OrderButton isOrderAll={true}>전체 상품 주문</OrderButton>
      </OrderButtonList>
    </ButtonListWrapper>
  );
};

export default CartButtons;
