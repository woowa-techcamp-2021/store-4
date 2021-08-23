import React from 'react';
import styled, { css } from 'styled-components';
import { toKoreanMoneyFormatPure } from '../../../utils/moneyFormater';
import { observer } from 'mobx-react';
import cartStore from '../../../stores/cartStore';
import { getSelectedOptionPrice } from '../helper';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px 40px 30px 40px;
  margin-top: 30px;
  border: 2px solid ${(props) => props.theme.color.grey2};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Text = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
`;

const TextCount = styled.span`
  font-weight: 600;
`;

const PriceWrapper = styled.div`
  margin-top: 7px;
`;

type PriceProps = {
  isTotal: boolean;
};
const Price = styled.span<PriceProps>`
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: 700;

  ${(props) =>
    props.isTotal &&
    css`
      color: ${props.theme.color.mint2};
    `};
`;

const PriceTotal = (): JSX.Element => {
  const cartItemList = cartStore.getCartItemList();

  let selectedItemCount = 0;
  let totalPrice = 0;
  for (const item of cartItemList) {
    if (item.isSelected) {
      selectedItemCount++;
      const optionPrice = item.selectWithSelected
        ? getSelectedOptionPrice(item.selectWithSelected)
        : 0;
      totalPrice += item.price * item.count + optionPrice;
    }
  }

  return (
    <Container>
      <Wrapper>
        <Text>
          총 <TextCount>{selectedItemCount}</TextCount> 개의 상품금액
        </Text>
        <PriceWrapper>
          <Price isTotal={false}>{toKoreanMoneyFormatPure(totalPrice)}</Price>원
        </PriceWrapper>
      </Wrapper>
    </Container>
  );
};

export default observer(PriceTotal);
