import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useMemo } from 'react';
import styled, { css } from 'styled-components';
import CartInProduct from '../../models/cart-in-product';
import Product from '../../models/product';
import { CartType, SelectWithSelected } from '../../types/product';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import ProductCartItem from './ProductCart/ProductCartItem';
import ProductSelectBox from './ProductSelectBox';
import { FaHeart } from 'react-icons/fa';

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
  margin-top: 30px;
  height: 100px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CommonButton = styled.button`
  height: 50px;
  cursor: pointer;
`;

type WishButtonProps = {
  isWished: boolean;
};

const WishButton = styled(CommonButton)<WishButtonProps>`
  border: 1px solid ${(props) => props.theme.color.grey1};
  background-color: ${(props) => props.theme.color.white1};
  width: 50px;
  font-size: ${(props) => props.theme.fontSize.large};
  ${(props) =>
    props.isWished
      ? css`
          color: ${(props) => props.theme.color.red};
        `
      : css`
          color: ${(props) => props.theme.color.grey3};
        `};
`;

const ToCartButton = styled(CommonButton)`
  border: 1px solid ${(props) => props.theme.color.grey1};
  background-color: ${(props) => props.theme.color.white1};
  width: 160px;
`;

const PurchaseButton = styled(CommonButton)`
  border: none;
  color: ${(props) => props.theme.color.white1};
  background-color: ${(props) => props.theme.color.black};
  width: 180px;
`;

type Props = {
  cartType: CartType;
  cartsInProduct: CartInProduct[];
  product: Product;
  selectsWithSelected: SelectWithSelected[];
  onWishClick: MouseEventHandler;
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
    onWishClick,
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
      <ButtonWrapper>
        <WishButton onClick={onWishClick} isWished={product.isWished}>
          <FaHeart />
        </WishButton>
        <ToCartButton>장바구니</ToCartButton>
        <PurchaseButton>바로구매</PurchaseButton>
      </ButtonWrapper>
    </Container>
  );
};

export default ProductInfoBox;
