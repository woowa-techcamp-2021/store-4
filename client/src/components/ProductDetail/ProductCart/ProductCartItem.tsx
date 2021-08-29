import React, { ChangeEventHandler, FocusEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import CartInProduct from '../../../models/cart-in-product';
import { CartType } from '../../../types/product';
import { toKoreanMoneyFormat } from '../../../utils/moneyFormater';
import ProductCounter from './ProductCounter';
import { RiCloseFill } from 'react-icons/ri';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.white2};
  padding: 6px 12px;
`;

const ProductTitle = styled.div`
  flex: 4;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const ProductPrice = styled.div`
  flex: 2;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: right;
`;

const ProductCounterWrapper = styled.div`
  flex: 1;
`;

const RemoveButton = styled.div`
  margin-left: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.normal};
  color: ${(props) => props.theme.color.grey5};
  background-color: transparent;
`;

type Props = {
  cartType: CartType;
  cartInProduct: CartInProduct;
  onBlur: FocusEventHandler;
  onIncreaseClick: MouseEventHandler;
  onDecreaseClick: MouseEventHandler;
  onRemoveClick?: MouseEventHandler;
  onCountChange: ChangeEventHandler;
};

const ProductCartItem = (props: Props): JSX.Element => {
  const {
    cartType,
    cartInProduct,
    onBlur,
    onIncreaseClick,
    onDecreaseClick,
    onRemoveClick,
    onCountChange,
  } = props;
  const { count, totalPrice, titleWithOption } = cartInProduct;

  return (
    <Container data-testid="product-cart">
      <ProductTitle>{titleWithOption}</ProductTitle>
      <ProductCounterWrapper>
        <ProductCounter
          onBlur={onBlur}
          count={count}
          onCountChange={onCountChange}
          onIncreaseClick={onIncreaseClick}
          onDecreaseClick={onDecreaseClick}
        />
      </ProductCounterWrapper>
      <ProductPrice>{toKoreanMoneyFormat(totalPrice)}</ProductPrice>
      {cartType === 'multi' && (
        <RemoveButton onClick={onRemoveClick} data-testid="product-cart-remove">
          <RiCloseFill />
        </RemoveButton>
      )}
    </Container>
  );
};

export default ProductCartItem;
