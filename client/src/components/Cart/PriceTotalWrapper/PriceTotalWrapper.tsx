import React from 'react';
import styled, { css } from 'styled-components';
import { toKoreanMoneyFormatPure } from '../../../utils/moneyFormater';

import EQUAL from '../../../assets/images/equal.png';
import PLUS from '../../../assets/images/plus.png';

const PriceTotalWrapper = styled.div`
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

const Img = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 25px;
`;

const PriceTotal = (): JSX.Element => {
  return (
    <PriceTotalWrapper>
      <Wrapper>
        <Text>
          총 <TextCount>2</TextCount> 개의 상품금액
        </Text>
        <PriceWrapper>
          <Price isTotal={false}>{toKoreanMoneyFormatPure(32400)}</Price>원
        </PriceWrapper>
      </Wrapper>
      <Img src={PLUS} />
      <Wrapper>
        <Text>배송비</Text>
        <PriceWrapper>
          <Price isTotal={false}>{toKoreanMoneyFormatPure(2500)}</Price>원
        </PriceWrapper>
      </Wrapper>
      <Img src={EQUAL} />
      <Wrapper>
        <Text>합계</Text>
        <PriceWrapper>
          <Price isTotal={true}>{toKoreanMoneyFormatPure(34900)}</Price>원
        </PriceWrapper>
      </Wrapper>
    </PriceTotalWrapper>
  );
};

export default PriceTotal;
