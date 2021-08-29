import React from 'react';
import styled from 'styled-components';

import TEST_IMG from '../../../../assets/images/towel.png';
import cartStore from '../../../../stores/cartStore';
import CartItem from '../../../../models/cart-item';
import { toJS } from 'mobx';
import { getOptionList } from '../../helper';
import { toKoreanMoneyFormat } from '../../../../utils/moneyFormater';

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

const DefaultWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  padding-top: 20px;
  border-top: 1px solid ${(props) => props.theme.color.grey2};
`;

const TextBlackBold = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-weight: 700;
  color: ${(props) => props.theme.color.black};
`;

const TextGreyNormal = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  color: ${(props) => props.theme.color.grey5};
`;

const DefaultPriceText = styled(TextBlackBold)`
  min-width: 70px;
`;

const DefaultPrice = styled(TextGreyNormal)`
  padding-left: 70px;
`;

const OptionList = styled.div`
  margin-top: 20px;
`;

const OptionItem = styled.div`
  display: flex;
  width: 100%;
  padding-top: 10px;
`;

const OptionType = styled(TextBlackBold)`
  min-width: 70px;
`;

const OptionName = styled(TextGreyNormal)`
  padding-left: 70px;
`;

const OptionPrice = styled(TextGreyNormal)`
  padding-left: 7px;
`;

const Option = (): JSX.Element => {
  const modalCartItem = cartStore.getModalCartItem();
  const toJSModalCartItem = toJS(modalCartItem);

  if (!CartItem.isCartItem(toJSModalCartItem)) {
    return <Container></Container>;
  }

  const { title, selectWithSelecteds, price } = toJSModalCartItem;
  const optionList = getOptionList(selectWithSelecteds);
  const OptionItemList = optionList.map((option) => (
    <OptionItem key={option.name}>
      <OptionType>{option.type}</OptionType>
      <OptionName>{option.name}</OptionName>
      <OptionPrice>(+{toKoreanMoneyFormat(option.price)})</OptionPrice>
    </OptionItem>
  ));

  return (
    <Container>
      <ProductImgWrapper>
        <ProductImg src={TEST_IMG} alt="상품 이미지"></ProductImg>
      </ProductImgWrapper>
      <ProductInfoWrapper>
        <ProductTitle>{title}</ProductTitle>
        <DefaultWrapper>
          <DefaultPriceText>기본가격</DefaultPriceText>
          <DefaultPrice>{toKoreanMoneyFormat(price)}</DefaultPrice>
        </DefaultWrapper>
        <OptionList>{OptionItemList}</OptionList>
      </ProductInfoWrapper>
    </Container>
  );
};

export default Option;
