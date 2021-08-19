import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';
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
  title: string;
  count: number;
  price: number;
  increase: () => void;
  decrease: () => void;
  remove: () => void;
  hasOption: boolean;
  onCountChange: ChangeEventHandler;
};

const ProductCounterController = (props: Props): JSX.Element => {
  const { title, count, price, increase, decrease, remove, hasOption, onCountChange } = props;

  return (
    <Container>
      <ProductTitle>{title}</ProductTitle>
      <ProductCounterWrapper>
        <ProductCounter
          count={count}
          onCountChange={onCountChange}
          increase={increase}
          decrease={decrease}
        />
      </ProductCounterWrapper>
      <ProductPrice>{price}</ProductPrice>
      {hasOption && (
        <RemoveButton onClick={remove} data-testid="product-count-controller-remove">
          X
        </RemoveButton>
      )}
    </Container>
  );
};

export default ProductCounterController;
