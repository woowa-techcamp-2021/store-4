import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import CartInProduct from '../../models/cart-in-product';
import Product from '../../models/product';
import { CartType, SelectWithSelected } from '../../types/product';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import ProductCountController from './ProductCountController';
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
  cartType: CartType;
  cartsInProduct: CartInProduct[];
  product: Product | null;
  selectsWithSelected: SelectWithSelected[];
  getSelectChangeHandler: (selectWithSelected: SelectWithSelected) => ChangeEventHandler;
  getCountChangeHandler: (cartInProduct: CartInProduct) => ChangeEventHandler;
  getCountBlurHandler: (cartInProduct: CartInProduct) => FocusEventHandler;
  getIncreaseCartHandler: (cartInProduct: CartInProduct) => MouseEventHandler;
  getDecreaseCartHandler: (cartInProduct: CartInProduct) => MouseEventHandler;
  getRemoveCartHandler: (cartInProduct: CartInProduct) => MouseEventHandler;
};

const ProductInfoBox = (props: Props): JSX.Element => {
  const {
    selectsWithSelected,
    product,
    getSelectChangeHandler,
    cartType,
    cartsInProduct,
    getIncreaseCartHandler,
    getDecreaseCartHandler,
    getRemoveCartHandler,
    getCountChangeHandler,
    getCountBlurHandler,
  } = props;

  const ProductSelects = selectsWithSelected.map((selectWithSelected) => (
    <InfoRowWrapper key={selectWithSelected.id}>
      <InfoLabel>{selectWithSelected.name}</InfoLabel>
      <ProductSelectBox
        productSelect={selectWithSelected}
        selected={selectWithSelected.selectedOption}
        onChange={getSelectChangeHandler(selectWithSelected)}
      />
    </InfoRowWrapper>
  ));

  const ProductCountControllers = cartsInProduct.map((cartInProduct) => (
    <ProductCountController
      key={cartInProduct.uuid}
      cartType={cartType}
      onBlur={getCountBlurHandler(cartInProduct)}
      onIncreaseClick={getIncreaseCartHandler(cartInProduct)}
      onDecreaseClick={getDecreaseCartHandler(cartInProduct)}
      onRemoveClick={getRemoveCartHandler(cartInProduct)}
      onCountChange={getCountChangeHandler(cartInProduct)}
      cartInProduct={cartInProduct}
    />
  ));

  return (
    <>
      {product !== null ? (
        <Container>
          <ProductTitle>{product.name}</ProductTitle>
          {product.discountRate !== 0 && (
            <InfoRowWrapper>
              <InfoLabel>정가</InfoLabel>
              <CostPrice>{toKoreanMoneyFormat(product.price)}</CostPrice>
            </InfoRowWrapper>
          )}
          <InfoRowWrapper>
            <InfoLabel>판매가</InfoLabel>
            <DiscountedPrice>{toKoreanMoneyFormat(product.discountedPrice)}</DiscountedPrice>
          </InfoRowWrapper>
          {ProductSelects}
          {ProductCountControllers}
        </Container>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default ProductInfoBox;
