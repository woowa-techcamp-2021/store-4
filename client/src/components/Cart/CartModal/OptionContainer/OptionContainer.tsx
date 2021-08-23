import React from 'react';
import styled from 'styled-components';

import TEST_IMG from '../../../../assets/images/towel.png';
import cartStore from '../../../../stores/cartStore';
import CartItem from '../../../../models/cart-item';
import { toJS } from 'mobx';
import { getSelectedOptionName } from '../../helper';

const Container = styled.div`
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
  width: 100%;
  padding-left: 30px;
  padding-right: 10px;
`;
const ProductTitle = styled.strong`
  font-size: ${(props) => props.theme.fontSize.small};
`;

const OptionWrapper = styled.div`
  display: flex;

  width: 100%;

  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.color.grey2};
`;

const OptionType = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
`;

const OptionName = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.grey5};
  padding-left: 70px;
`;

const Option = (): JSX.Element => {
  const modalCartItem = cartStore.getModalCartItem();
  const toJSModalCartItem = toJS(modalCartItem);
  if (!CartItem.isCartItem(toJSModalCartItem)) {
    return <Container></Container>;
  }

  const { title, selectWithSelected } = toJSModalCartItem;
  const optionTypeName = selectWithSelected ? selectWithSelected.name : '';
  const optionName = selectWithSelected ? getSelectedOptionName(selectWithSelected) : '';

  return (
    <Container>
      <ProductImgWrapper>
        <ProductImg src={TEST_IMG}></ProductImg>
      </ProductImgWrapper>
      <ProductInfoWrapper>
        <ProductTitle>{title}</ProductTitle>
        <OptionWrapper>
          <OptionType>{optionTypeName}</OptionType>
          <OptionName>{optionName}</OptionName>
        </OptionWrapper>
      </ProductInfoWrapper>
    </Container>
  );
};

export default Option;
