import React from 'react';
import styled from 'styled-components';
import Product from '../../models/product';
import ProductItem from '../ProductList/ProductItem';

const ProductList = styled.div``;

const ProductListTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: ${(props) => props.theme.fontSize.large};
  font-weight: 700;
  margin: 32px 0px;
`;

const ProductItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
`;

type MainProductListProps = {
  title: string;
  products: Product[];
};

const MainProductList = (props: MainProductListProps): JSX.Element => {
  const { title, products } = props;
  const ProductItems = products.map((product, index) => (
    <ProductItem key={`title${index}`} product={product} />
  ));
  return (
    <ProductList>
      <ProductListTitle>{title}</ProductListTitle>
      <ProductItemWrapper>{ProductItems}</ProductItemWrapper>
    </ProductList>
  );
};

export default MainProductList;
