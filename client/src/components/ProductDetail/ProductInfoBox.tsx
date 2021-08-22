import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useMemo } from 'react';
import styled from 'styled-components';
import CartInProduct from '../../models/cart-in-product';
import Product from '../../models/product';
import { CartType, SelectWithSelected } from '../../types/product';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import ProductCartItem from './ProductCartItem';
import ProductSelectBox from './ProductSelectBox';

const Container = styled.div`
  width: 550px;
`;

const ProductTitle = styled.h1`
  margin: 0;
  margin-bottom: 40px;
`;

const OriginPrice = styled.div`
  text-decoration: line-through;
`;

const DiscountedPrice = styled.div`
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: bold;
  font-family: ${(props) => props.theme.fontFamily.number};
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

const ProductCartListWrapper = styled.div`
  margin-top: 50px;
  height: 120px;
  overflow: scroll;
`;

const TotalPriceWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${(props) => props.theme.color.grey1};
  padding: 20px 0px;
`;

const TotalPrice = styled.div`
  font-family: ${(props) => props.theme.fontFamily.number};
  font-size: ${(props) => props.theme.fontSize.xLarge};
  font-weight: bold;
  color: ${(props) => props.theme.color.mint2};
`;

type Props = {
  cartType: CartType;
  cartsInProduct: CartInProduct[];
  product: Product;
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

  const ProductCartItems = cartsInProduct.map((cartInProduct) => (
    <ProductCartItem
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

  const totalPrice = useMemo(
    () => cartsInProduct.reduce((sum, cartInProduct) => sum + cartInProduct.totalPrice, 0),
    [cartsInProduct]
  );

  return (
    <>
      <Container>
        <ProductTitle>{product.name}</ProductTitle>
        {product.discountRate !== 0 && (
          <InfoRowWrapper>
            <InfoLabel>정가</InfoLabel>
            <OriginPrice>{toKoreanMoneyFormat(product.price)}</OriginPrice>
          </InfoRowWrapper>
        )}
        <InfoRowWrapper>
          <InfoLabel>판매가</InfoLabel>
          <DiscountedPrice>{toKoreanMoneyFormat(product.discountedPrice)}</DiscountedPrice>
        </InfoRowWrapper>
        {ProductSelects}

        <ProductCartListWrapper>{ProductCartItems}</ProductCartListWrapper>
        <TotalPriceWrapper>
          <InfoLabel>총 합계 금액</InfoLabel>
          <TotalPrice>{toKoreanMoneyFormat(totalPrice)}</TotalPrice>
        </TotalPriceWrapper>
      </Container>
    </>
  );
};

export default ProductInfoBox;
