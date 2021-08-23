import React from 'react';
import styled from 'styled-components';

import TEST_IMG from '../../../../assets/images/towel.png';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';
import cartStore from '../../../../stores/cartStore';
import CartItem from '../../../../models/cart-item';

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
`;
const ProductImgWrapper = styled.div`
  padding: 20px;
`;
const ProductImg = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
`;
const ProductInfoWrapper = styled.div`
  padding-left: 30px;
`;
const ProductTitle = styled.strong`
  font-size: ${(props) => props.theme.fontSize.small};
`;
const DeliveryOptionWrapper = styled.div`
  display: flex;
  padding-top: 20px;
`;
const DeliveryText = styled.div`
  padding: 20px 70px 0 20px;
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

const OptionMain = styled.div``;
const DeliveryFee = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const DeliveryOptionButton = styled(Button)`
  font-size: ${(props) => props.theme.fontSize.tiny};
  padding: 5px 10px;
  margin-top: 8px;
  border: 1px solid ${(props) => props.theme.color.grey2};

  &:hover {
    background-color: ${(props) => props.theme.color.grey1};
  }
`;
const DeliveryOption = styled.div`
  margin-top: 8px;
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

const Option = (): JSX.Element => {
  const modalCartItem = cartStore.getModalCartItem();
  if (!CartItem.isCartItem(modalCartItem)) {
    return <OptionContainer></OptionContainer>;
  }

  const title = modalCartItem.title;
  const price = modalCartItem.price;

  return (
    <OptionContainer>
      <ProductImgWrapper>
        <ProductImg src={TEST_IMG}></ProductImg>
      </ProductImgWrapper>
      <ProductInfoWrapper>
        <ProductTitle>{title}</ProductTitle>
        <DeliveryOptionWrapper>
          <DeliveryText>배송비</DeliveryText>
          <OptionMain>
            <DeliveryFee>{toKoreanMoneyFormat(price)}</DeliveryFee>
            <DeliveryOptionButton>조건별배송</DeliveryOptionButton>
            <DeliveryOption>택배</DeliveryOption>
          </OptionMain>
        </DeliveryOptionWrapper>
      </ProductInfoWrapper>
    </OptionContainer>
  );
};

export default Option;
