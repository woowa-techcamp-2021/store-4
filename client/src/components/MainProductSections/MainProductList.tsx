import React from 'react';
import styled from 'styled-components';
import ProductItem from '../ProductList/ProductItem';
import { MockProductItemType } from './mock';

const ProductList = styled.div``;

const ProductListTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: 700;
`;

const ProductItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  &:div {
    flex: 25%;
  }
`;

type MainProductListProps = {
  title: string;
  products: MockProductItemType[];
};

const MainProductList = (props: MainProductListProps): JSX.Element => {
  const { title, products } = props;
  const ProductItems = products.map((product, index) => (
    <ProductItem key={`title${index}`} {...product} />
  ));
  return (
    <ProductList>
      <ProductListTitle>{title}</ProductListTitle>
      <ProductItemWrapper>{ProductItems}</ProductItemWrapper>
    </ProductList>
  );
};

export default MainProductList;