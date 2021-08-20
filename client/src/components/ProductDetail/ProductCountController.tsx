import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import CartInProduct from '../../models/cart-in-product';
import { CartType } from '../../types/product';
import { toKoreanMoneyFormat } from '../../utils/moneyFormater';
import ProductCounter from './ProductCounter';

const Container = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.grey1};
  padding: 18px;
`;

const ProductTitle = styled.strong`
  flex: 4;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
`;

const ProductPrice = styled.strong`
  flex: 1;
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: bold;
  text-align: right;
`;

const ProductCounterWrapper = styled.div`
  flex: 1;
`;

const RemoveButton = styled.button`
  margin-left: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: ${(props) => props.theme.color.grey3};
  font-size: ${(props) => props.theme.fontSize.tiny};
`;

type Props = {
  cartType: CartType;
  cartInProduct: CartInProduct;
  onIncreaseClick: MouseEventHandler;
  onDecreaseClick: MouseEventHandler;
  onRemoveClick?: MouseEventHandler;
  onCountChange: ChangeEventHandler;
};

const ProductCounterController = (props: Props): JSX.Element => {
  const {
    cartType,
    cartInProduct,
    onIncreaseClick,
    onDecreaseClick,
    onRemoveClick,
    onCountChange,
  } = props;
  const { count, totalPrice, titleWithOption } = cartInProduct;

  return (
    <Container>
      <ProductTitle>{titleWithOption}</ProductTitle>
      <ProductCounterWrapper>
        <ProductCounter
          count={count}
          onCountChange={onCountChange}
          onIncreaseClick={onIncreaseClick}
          onDecreaseClick={onDecreaseClick}
        />
      </ProductCounterWrapper>
      <ProductPrice>{toKoreanMoneyFormat(totalPrice)}</ProductPrice>
      {cartType === 'multi' && (
        <RemoveButton onClick={onRemoveClick} data-testid="product-count-controller-remove">
          X
        </RemoveButton>
      )}
    </Container>
  );
};

export default ProductCounterController;
