import React from 'react';
import styled from 'styled-components';
import Product from '../../models/product';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import ProductSelectBox from './ProductSelectBox';

const Container = styled.div``;

const ProductTitle = styled.h1`
  margin-bottom: 40px;
`;

const CostPrice = styled.div`
  text-decoration: line-through;
`;

const DiscountedPrice = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
`;

const InfoLabel = styled.div`
  color: ${(props) => props.theme.color.grey5};
  width: 100px;
  font-weight: 500;
`;

const InfoRowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 12px 0;
`;

type Props = {
  product: Product;
};

const ProductInfoBox = (props: Props): JSX.Element => {
  const { product } = props;
  const { name, discountRate, discountedPrice, price, productSelects } = product;

  const ProductSelects = productSelects.map((productSelect) => (
    <InfoRowWrapper key={productSelect.id}>
      <InfoLabel>{productSelect.name}</InfoLabel>
      <ProductSelectBox productSelect={productSelect} />
    </InfoRowWrapper>
  ));

  return (
    <Container>
      <ProductTitle>{name}</ProductTitle>
      {discountRate !== 0 && (
        <InfoRowWrapper>
          <InfoLabel>정가</InfoLabel>
          <CostPrice>{toKoreanMoneyFormat(price)}</CostPrice>
        </InfoRowWrapper>
      )}
      <InfoRowWrapper>
        <InfoLabel>판매가</InfoLabel>
        <DiscountedPrice>{toKoreanMoneyFormat(discountedPrice)}</DiscountedPrice>
      </InfoRowWrapper>
      {ProductSelects}
    </Container>
  );
};

export default ProductInfoBox;
