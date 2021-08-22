import React from 'react';
import styled from 'styled-components';
import { toKoreanMoneyFormat } from '../../../utils/moneyFormater';

const DescriptionWrapper = styled.div`
  margin-top: 10px;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
`;

const DiscountRate = styled.div`
  color: ${(props) => props.theme.color.red};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-family: 'Montserrat' 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PriceWrapper = styled.div`
  margin: 8px 0px;
`;

const NormalPrice = styled.div`
  font-size: ${(props) => props.theme.fontSize.tiny};
  font-family: 'Montserrat' 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: ${(props) => props.theme.color.grey5};
  text-decoration: line-through;
`;

const Price = styled.div`
  font-size: ${(props) => props.theme.fontSize.normal};
  font-family: 'Montserrat' 'Nanum Gothic', 'Noto Sans KR', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
`;

type Props = {
  isDiscounting: boolean;
  discountRate: number;
  name: string;
  price: number;
  discountedPrice: number;
};

const ProductItemDescription = (props: Props): JSX.Element => {
  const { isDiscounting, discountRate, name, price, discountedPrice } = props;
  return (
    <DescriptionWrapper>
      {isDiscounting && <DiscountRate>{discountRate}%</DiscountRate>}
      <Name>{name}</Name>
      {isDiscounting ? (
        <PriceWrapper>
          <NormalPrice data-testid="price">{toKoreanMoneyFormat(price)}</NormalPrice>
          <Price data-testid="discountedPrice">{toKoreanMoneyFormat(discountedPrice)}</Price>
        </PriceWrapper>
      ) : (
        <PriceWrapper>
          <Price data-testid="price">{toKoreanMoneyFormat(price)}</Price>
        </PriceWrapper>
      )}
    </DescriptionWrapper>
  );
};

export default ProductItemDescription;
